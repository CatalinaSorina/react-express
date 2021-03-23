import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { defaultState } from '../../server/defaultState';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas.mock';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  combineReducers({
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          // console.log(action);
          return [
            ...tasks,
            {
              id: action.taskID,
              name: 'New task',
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false,
            },
          ];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map(task =>
            task.id === action.taskID
              ? { ...task, isComplete: action.isCompleted }
              : task
          );
        case mutations.SET_TASK_GROUP:
          return tasks.map(task =>
            task.id === action.taskID
              ? { ...task, group: action.groupID }
              : task
          );
        case mutations.SET_TASK_NAME:
          return tasks.map(task =>
            task.id === action.taskID ? { ...task, name: action.name } : task
          );
      }
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    },
  }),
  applyMiddleware(sagaMiddleware, createLogger())
);
sagaMiddleware.run(sagas);
