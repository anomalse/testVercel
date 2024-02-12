require('dotenv').config();
import {MongoClient} from 'mongodb';

//const db_find_some = function(){}
//const db_update_one = function(){}
//more tests

const db_insert_one = function(in_fruit,in_veg) {
  return new Promise (async(resolve, reject) => {
  let client;
  let record = {fruit: in_fruit,veg:in_veg}
  
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log(client);

    const insert = await client
      .db('vercel')
      .collection('favorites')
      .insertOne(record);

    if (insert.acknowledged) {
     resolve('Successfully inserted a record');
    }
  } catch (error) {
    //reject ('Database is not ready yet');
    console.warn('Database is not ready yet. bbb...');
  } finally {
    if (client) {
      await client.close();
      //resolve('done');
    }
  }
})
}

const db_insert_default = function() {
  return new Promise (async (resolve, reject) => {
  let client;
  const testRecords = [
    {fruit: "watermelon",veg:"carrots"},
    {fruit: "apple",veg:"celery"}
  ]
  try {
    console.log("we are here");
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const insert = await client
      .db('vercel')
      .collection('favorites')
      .insertMany(testRecords);

    if (insert.acknowledged) {
     resolve('Successfully inserted records');
    }
  } catch (error) {
   // reject ('Database is not ready yet');
   console.warn('Database is not ready yet. Skipping .a.a.a...');
  } finally {
    if (client) {
      await client.close();
    }
  }
})
}

const setup = async () => {
    let client;
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  
    const hasData = await client
        .db('vercel')
        .collection('favorites')
        .countDocuments();
  
      if (hasData) {
        console.log('Database already exists with data');
        client.close();
        return;
      }
  
  }
  catch {
    console.warn('Database is not ready yet. Skipping seeding...');
  }
  

  }
  
  export { setup, db_insert_default,db_insert_one };
  
  