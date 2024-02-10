const ImageDataURI = require('image-data-uri');
import { put } from '@vercel/blob';
require('dotenv').config();
//import 'dotenv/config'
const url = process.env.BLOB_READ_WRITE_TOKEN;
const fs = require('fs');


export default async function handler(req, res) {


    // const { searchParams } = new URL(req.url);
     //const filename = searchParams.get('filename');
    // console.log(filename)

    // console.log(req.url);
    // console.log(req.body);

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