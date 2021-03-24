import { connectDB } from './connect-db';
import { defaultState } from './defaultState';

(async function () {
  let db = await connectDB();
  let user = await db.collection('users').findOne({ id: 'U1' });
  if (!user) {
    for (let collectionName in defaultState) {
      let collection = db.collection(collectionName);
      await collection.insert(defaultState[collectionName]);
    }
  }
})();
