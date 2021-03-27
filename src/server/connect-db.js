import { MongoClient } from 'mongodb';
const url = 'mongodb+srv://React:Express@cluster0.mlkg7.mongodb.net/react-express-tutorial?retryWrites=true&w=majority';
const DB_NAME = 'react-express-tutorial';
let db = null;

export async function connectDB() {
  let client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(DB_NAME);
  // console.log('Got DB', db);
  return db;
}

// connectDB();
