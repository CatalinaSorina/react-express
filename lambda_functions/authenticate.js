import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
const DB_NAME = 'react-express-tutorial';
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(DB_NAME);
  return db;
}

const authentication = async (db, data) => {
  const { username, password } = data;
  const collection = db.collection('users');
  const user = await collection.findOne({ name: username });

  if (!user) {
    return res.status(500).send('User not found');
  }

  const hash = md5(password);
  const passwordCorrect = hash === user.passwordHash;
  if (!passwordCorrect) {
    return res.status(500).send('Password incorrect!');
  }

  const tasks = await db.collection('tasks').find({ owners: user.id }).toArray();
  const groups = await db.collection('groups').find({ owners: user.id }).toArray();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tasks,
      groups,
      session: {
        authenticated: AUTHENTICATED,
        id: user.id,
        name: user.name,
        friends: user.friends,
      },
    }),
  };
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectDB(url);

  if (event.httpMethod === 'POST') {
    return authentication(db, JSON.parse(event.body));
  }
  return { statusCode: 400 };
};
