import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestTaskCreation } from '../store/mutations';
import { taskColor } from './utils';

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div className='col card p-2 m-2'>
    <h3>{name}</h3>
    {tasks.map(task => (
      <Link to={`/task/${task.id}`} key={task.id} className='badge badge-light'>
        <div className='card p-2'>{task.name}</div>
      </Link>
    ))}
    <button
      onClick={() => createNewTask(id)}
      className={`btn ${taskColor(name)} btn-block mt-2`}>
      Add new
    </button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: ownProps.id,
    tasks: state.tasks.filter(task => task.group === groupID),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTask(id) {
      // console.log('Creating new task...', id);
      dispatch(requestTaskCreation(id));
    },
  };
};
export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
