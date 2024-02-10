/*https://vercel.com/guides/using-express-with-vercel*/
/** to try::
 * https://jonathans199.medium.com/deploy-node-js-express-api-to-vercel-dbf4461795a5
 */
const app = require('express')();

require('dotenv').config();
const url = process.env.BLOB_READ_WRITE_TOKEN;

const ImageDataURI = require('image-data-uri');
import { put } from '@vercel/blob';
const fs = require('fs');




// app.get('/api', (req, res) => {
//   const path = `/api/item/${v4()}`;
//   res.setHeader('Content-Type', 'text/html');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
//   res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
// });

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;

  switch(slug){
    case 'varsArePassing':
        /* GET REQUEST EX */
       // res.end(`query: ${req.query.fruits} and ${req.query.vegs} `)
        res.send({"fruit": req.query.fruits,"veg":req.query.vegs});
        break;
    
    default:
        res.end(`no case `);

  }
 
});

app.post('/api/item/:slug',async(req, res) => {
    const { slug } = req.params;
   console.log(slug);
   switch(slug){
          case 'upload':
          console.log("new")
         // console.log(req.body);
          let body = req.body;
          // declare a regexp to match the non base64 first characters
          let dataUrlRegExp = /^data:image\/\w+;base64,/;
          // remove the "header" of the data URL via the regexp
          let base64Data = req.body.file1.replace(dataUrlRegExp, "");
          let imageBuffer = new Buffer(base64Data, "base64");
          const blob = await put(req.body.fileName, imageBuffer, {
            access: 'public',
        });
    console.log(blob);
    // //fs.writeFileSync(req.body.fileName, imageBuffer);
    res.send(`Hello , you just parsed the request body and saved a blob!!`);
   } 

  })

module.exports = app;
//export default app;
