import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutation from '../store/mutations';

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskGroup,
  setTaskName,
  username,
}) => (
  <div className='card p-3 col-6'>
    <div>
      <input
        onChange={setTaskName}
        value={task.name}
        className='form-control form-control-lg'
      />
    </div>
    <div>
      <button
        onClick={() => setTaskCompletion(id, !isComplete)}
        className='btn btn-dark mt-2'>
        {isComplete ? 'Complete' : 'Reopen task'}
      </button>
    </div>
    <div className='mt-3'>
      <select
        onChange={setTaskGroup}
        value={task.group}
        className='form-control'>
        {groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>
    <div className='mt-3'>
      Users access:
      {task.access.length === 1
        ? ' only you'
        : task.access.map(
            (user, id) =>
              user != username && (
                <span
                  key={id}
                  className='card d-inline-flex text-white bg-secondary p-1 mx-1'
                  style={{ width: 'fit-content' }}>
                  {user}
                </span>
              )
          )}
    </div>
    <div>
      <Link to='/dashboard'>
        <button className='btn btn-dark mt-2'>Done</button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find(task => task.id === id);

  return {
    id,
    task,
    groups: state.groups,
    isComplete: task.isComplete,
    username: state.session.name,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutation.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutation.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutation.setTaskName(id, e.target.value));
    },
  };
};
export const ConnectedTaskDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetail);
