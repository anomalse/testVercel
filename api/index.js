const ImageDataURI = require('image-data-uri');
import { put } from '@vercel/blob';
require('dotenv').config();
//import 'dotenv/config'
const url = process.env.BLOB_READ_WRITE_TOKEN;
const fs = require('fs');
import {setup,db_insert_default,db_insert_one } from "./setup_mongo.js";
//let connectionISSet = false;


// try {
//   console.log("test123");
//   setup();
// } catch {
//   console.warn('Database is not ready yet. Skipping seeding...');
// }

export default async function handler(req, res) {
console.log("here");  
//if(connectionISSet===false){
  console.log('tests');
  const message = await setup();

  if (message) {
    res.status(500).json({
      error: { message }
    });
  } else {
   // connectionISSet=true;
   // await res.revalidate(`/`);
    //res.status(200).send('ok.'); //don't do that otherwise will not continue
    console.log("had a connection");

  }
//}

//}


console.log(req.query)

if(Object.keys(req.query).length !== 0){
  console.log("get");
  
  if(req.query.type ==="start"){
    // let result = await db_insert_one(req.query.fruits,req.query.vegs);
    // //let result = await db_insert_default();
    // console.log(result);
    res.send({"fruit": req.query.fruits,"veg":req.query.vegs});

  }

}
else{
  console.log("hererere");
  // declare a regexp to match the non base64 first characters
let dataUrlRegExp = /^data:image\/\w+;base64,/;
// remove the "header" of the data URL via the regexp
let base64Data = req.body.file1.replace(dataUrlRegExp, "");
// declare a binary buffer to hold decoded base64 data
let imageBuffer = new Buffer(base64Data, "base64");


const blob = await put(req.body.fileName, imageBuffer, {
    access: 'public',
  });
  console.log(blob);
  
//save to BLOB :)
// write the buffer to the local file system synchronously
//fs.writeFileSync(req.body.fileName, imageBuffer);


return res.send(`Hello , you just parsed the request body!`);

}
}