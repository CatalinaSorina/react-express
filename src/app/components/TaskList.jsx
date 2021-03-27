import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { taskColor } from './utils';

export const TaskList = ({ tasks, name, groupID }) => (
  <div className='col card p-2 m-2'>
    <h3>{name}</h3>
    {tasks.map(task => (
      <Link to={`/task/${task.id}`} key={task.id} className='badge badge-light'>
        <div className='card p-2 flex-row justify-content-between'>
          {task.name}
          {task.isComplete && <span className=''>✓</span>}
        </div>
      </Link>
    ))}
    <Link
      to={`/create-task/${groupID}`}
      className={`btn ${taskColor(name)} btn-block text-white mt-2`}>
      Create new task
    </Link>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: ownProps.id,
    tasks: state.tasks.filter(task => task.group === groupID),
    groupID,
  };
};

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
