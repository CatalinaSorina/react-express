import { MongoClient } from 'mongodb';
const url = `mongodb://localhost:27017/myorganizer`;
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.log('Got DB', db);
  return db;
}

connectDB();
