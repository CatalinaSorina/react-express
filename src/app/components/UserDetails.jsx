import React from 'react';
import { connect } from 'react-redux';
import { AUTHENTICATED } from '../store/mutations';

export const UserDetails = ({ authenticated, userID, user, friends }) => {
  return (
    authenticated === AUTHENTICATED && (
      <div className='nav nav-tabs'>
        <li className='nav-item nav-link active mt-2'>{`${userID}:${user}`}</li>
        <li className='nav-item d-inline-flex p-2 justify-content-evenly align-items-center'>
          {`Your friends:`}
          {friends.map((friend, id) => (
            <span key={id} className='card text-white bg-secondary p-1 mx-1'>
              {friend.name}
            </span>
          ))}
        </li>
      </div>
    )
  );
};

function mapStateToProps({ session }) {
  return {
    authenticated: session.authenticated,
    userID: session.id,
    user: session.name,
    friends: session.friends,
  };
}

export const ConnectedUserDetails = connect(mapStateToProps)(UserDetails);
