import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestTaskCreation } from '../store/mutations';

export const TaskList = ({ tasks, name, id, createNewTask }) => (
  <div>
    <h3>{name}</h3>
    {tasks.map(task => (
      <Link to={`/task/${task.id}`} key={task.id}>
        <div>{task.name}</div>
      </Link>
    ))}
    <button onClick={() => createNewTask(id)}>Add new</button>
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
      console.log('Creating new task...', id);
      dispatch(requestTaskCreation(id));
    },
  };
};
export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
