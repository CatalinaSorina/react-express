import { take, put, all } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';
import { history } from './history';

const url = process.env.NODE_ENV == 'production' ? '' : 'http://localhost:4040';

export function* taskCreationSaga() {
  while (true) {
    const { task } = yield take(mutations.REQUEST_TASK_CREATION);
    const taskID = uuid();
    const newTask = { id: taskID, isComplete: false, ...task };
    yield put(mutations.createTask(newTask));
    const { res } = yield axios.post(url + '/.netlify/functions/task/new', {
      task: newTask,
    });
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_COMPLETE,
      mutations.SET_TASK_NAME,
    ]);
    axios.post(url + '/.netlify/functions/task/update', {
      task: {
        id: task.taskID,
        group: task.groupID,
        isComplete: task.isComplete,
        name: task.name,
      },
    });
  }
}

export function* userAuthenticateSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + '/.netlify/functions/authenticate', {
        username,
        password,
      });
      if (!data) {
        throw new Error();
      }

      yield put(mutations.setState(data.state));
      yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));

      history.push('/dashboard');
    } catch (e) {
      yield put(mutations.processAuthenticateUser(mutations.NOT_AUTHENTICATED));
    }
  }
}

export default function* rootSaga() {
  yield all([
    taskCreationSaga(),
    taskModificationSaga(),
    userAuthenticateSaga(),
  ]);
}
