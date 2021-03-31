import express from 'express';
import uuid from 'uuid';
import md5 from 'md5';
import { connectDB } from './connect-db';
import { AUTHENTICATED } from '../app/store/mutations';

const authenticateRoute = express.Router();
const authenticateTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();

  let tasks = await db.collection('tasks').find({ owners: user.id }).toArray();
  let groups = await db
    .collection('groups')
    .find({ owners: user.id })
    .toArray();

  return {
    tasks,
    groups,
    session: {
      authenticated: AUTHENTICATED,
      id: user.id,
      name: user.name,
      friends: user.friends,
    },
  };
}

authenticateRoute.post(`/authenticate`, async (req, res) => {
  let { username, password } = req.body;
  let db = await connectDB();
  let collection = db.collection('users');
  let user = await collection.findOne({ name: username });

  if (!user) {
    return res.status(500).send('User not found');
  }

  let hash = md5(password);
  let passwordCorrect = hash === user.passwordHash;
  if (!passwordCorrect) {
    return res.status(500).send('Password incorrect!');
  }

  let token = uuid();
  authenticateTokens.push({
    token,
    userID: user.id,
  });

  let state = await assembleUserState(user);
  res.send({ token, state });
});

export default authenticateRoute;
