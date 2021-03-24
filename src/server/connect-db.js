import { MongoClient } from 'mongodb';
const url = `mongodb://localhost:27017/react-express-tutorial`;
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db();
  console.log('Got DB', db);
  return db;
}

// connectDB();
