import { MongoClient } from 'mongodb';
const url = process.env.MONGODB_URI || `mongodb://localhost:27017`;
const DB_NAME = 'react-express-tutorial';
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(DB_NAME);
  console.log('MONGO', process.env.MONGODB_URI);
  console.log('Got DB', db);
  return db;
}

// connectDB();
