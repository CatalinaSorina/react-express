import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestTaskCreation } from '../store/mutations';

const CreateTask = ({ groups, groupID, friends, userID, username, createNewTask }) => {
  const [task, setTask] = useState({
    name: 'New task',
    group: groupID,
    access: [username],
    owners: [userID],
  });
  const friendsWithGroupAccess = friends.filter(friend =>{
    const selectedGroup = groups.find(group => group.id === task.group);
    return selectedGroup.owners.includes(friend.id)
  });
  const friendsHaveAccess = friendsWithGroupAccess.length > 0;

  const setTaskName = ({ target }) => setTask({ ...task, name: target.value });
  const setTaskGroup = ({ target }) => setTask({ ...task, group: target.value });
  const setTaskAccess = ({ target }) => {
    const friend = target.nextSibling.innerHTML;
    const friendID = friendsWithGroupAccess.find(user => user.name === friend).id;
    if (target.checked) {
      setTask({
        ...task,
        access: [...task.access, friend],
        owners: [...task.owners, friendID],
      });
    } else {
      const updateAccess = task.access.filter(user => user !== friend);
      const updateOwners = task.owners.filter(user => user !== friendID);
      setTask({ ...task, access: updateAccess, owners: updateOwners });
    }
  };

  return (
    <div className='card p-3 col-6'>
      <div>
        <input
          onChange={setTaskName}
          placeholder='new task'
          className='form-control form-control-lg'
        />
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
      <div className='btn-group my-2 align-items-center'>
        Friends access:
        {friendsHaveAccess ? friendsWithGroupAccess.map((friend, id) => (
          <span key={id}>
            <input
              type='checkbox'
              style={{ display: 'none' }}
              onClick={setTaskAccess}
              className='btn-check'
              id={`check${id}`}
              autoComplete='off'
            />
            <label
              className={`btn btn-outline-secondary ${
                task.access.includes(friend.name) && 'active'
              } m-1`}
              htmlFor={`check${id}`}>
              {friend.name}
            </label>
          </span>
        )) : ' No friend has access to this group.'}
      </div>
      <div className='align-self-center' onClick={() => createNewTask(task)}>
        <Link to='/dashboard'>
          <button className='btn btn-dark mt-2'>Done</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const task = state.tasks.find(task => task.id === id);
  const groupID = ownProps.match.params.id;
  const groups = state.groups;

  return {
    id,
    task,
    groups: groups,
    userID: state.session.id,
    username: state.session.name,
    friends: state.session.friends,
    groupID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createNewTask(task) {
      dispatch(requestTaskCreation(task));
    },
  };
};

export const ConnectedCreateTask = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask);
