import { take, put, select, all } from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';

const url = 'http://localhost:4040';

export function* taskCreationSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = 'U1';
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const { res } = yield axios.post(url + '/task/new', {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: 'New task',
      },
    });

    console.log('Got response', res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_COMPLETE,
      mutations.SET_TASK_NAME,
    ]);
    axios.post(url + '/task/update', {
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
      const { data } = axios.post(url + '/authenticate', {
        username,
        password,
      });
      if (!data) {
        throw new Error();
      }
    } catch (e) {
      console.log("can't authenticate");
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
