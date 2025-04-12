// Update the global type definition and fix the client initialization

import { MongoClient } from 'mongodb';

// Update the type definition to include _mongoClientPromise
declare global {
  var mongo: {
    conn: MongoClient | null;
    promise: Promise<MongoClient> | null;
    _mongoClientPromise?: Promise<MongoClient>;
  };
}

// Connection URI
const uri = process.env.MONGODB_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global.mongo) {
    global.mongo = {
      conn: null,
      promise: null,
    };
  }

  if (!global.mongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global.mongo._mongoClientPromise = client.connect();
  }
  clientPromise = global.mongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get the database instance
export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'viralniche');
}

// Helper function to get a collection
export async function getCollection(collectionName: string) {
  const db = await getDb();
  return db.collection(collectionName);
}

// Example usage:
// const collection = await getCollection('users');
// const users = await collection.find({}).toArray();