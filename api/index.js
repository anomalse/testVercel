/*https://vercel.com/guides/using-express-with-vercel*/
/** to try::
 * https://jonathans199.medium.com/deploy-node-js-express-api-to-vercel-dbf4461795a5
 */
//const app = require('express')();
import express from 'express';
const app = express();
import { handleUpload } from '@vercel/blob/client';
//console.log(vercelClient.handleUpload)

//require('dotenv').config();
import 'dotenv/config'
const url = process.env.BLOB_READ_WRITE_TOKEN;



app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  //console.log(req.query);

  switch(slug){
    case 'varsArePassing':
        /* GET REQUEST EX */
       // res.end(`query: ${req.query.fruits} and ${req.query.vegs} `)
        res.send({"fruit": req.query.fruits,"veg":req.query.vegs});
        break;
    
    // case 'upload_file_post':
    //      /* POST REQUEST EX */
    //        res.end(`testing post 123`)
    //     break;
    default:
        res.end(`no case `);

  }
 
});

app.post('/api/item/:slug',async(req, res) => {
      const { slug } = req.params;
  //  console.log(slug);
   switch(slug){
          case 'upload':
           let body = req.body;
          //  console.log(req.body.type)
          try {
            
          const jsonResponse = await handleUpload({
             body,
             req,
              onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
                // Generate a client token for the browser to upload the file
                // ⚠️ Authenticate and authorize users before generating the token.
                // Otherwise, you're allowing anonymous uploads.
                return {
              
                  allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
                  tokenPayload: JSON.stringify({
                    // optional, sent to your server on upload completion
                    // you could pass a user id from auth, or a value from clientPayload
                  }),
                };
              },
              onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                // ⚠️ This will not work on `localhost` websites,
                // Use ngrok or similar to get the full upload flow
         
                console.log('blob upload completed', blob, tokenPayload);
         
                try {
                  // Run any logic after the file upload completed
                  // const { userId } = JSON.parse(tokenPayload);
                  // await db.update({ avatar: blob.url, userId });
                } catch (error) {
                  throw new Error('Could not update user');
                }
              },
            });
         
            //console.log(jsonResponse);
            return res.send(jsonResponse);
          } catch (error) {
            console.log(error);
            return res.send('error');
          }
   }
})

module.exports = app;
