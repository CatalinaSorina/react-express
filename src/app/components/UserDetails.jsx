import React from 'react';
import { connect } from 'react-redux';
import { AUTHENTICATED } from '../store/mutations';

export const UserDetails = ({ authenticated, userID, user, friends }) => {
  return (
    authenticated === AUTHENTICATED && (
      <div className='nav nav-tabs'>
        <li class='nav-item nav-link active mt-2'>{`${userID}:${user}`}</li>
        <li class='nav-item d-inline-flex p-2 justify-content-evenly align-items-center'>
          {`Your friends:`}
          {friends.map(friend => (
            <span className='card text-white bg-secondary p-1 mx-1'>
              {friend}
            </span>
          ))}
        </li>
      </div>
    )
  );
};

function mapStateToProps({ session }) {
  console.log(session.friends);
  return {
    authenticated: session.authenticated,
    userID: session.id,
    user: session.name,
    friends: session.friends,
  };
}

export const ConnectedUserDetails = connect(mapStateToProps)(UserDetails);
