/*https://vercel.com/guides/using-express-with-vercel*/
/** to try::
 * https://jonathans199.medium.com/deploy-node-js-express-api-to-vercel-dbf4461795a5
 */
const app = require('express')();
const handleUpload  = require('@vercel/blob/client');

//const fileUpload = require('express-fileupload');
//app.use(fileUpload());
// for the client...



// Note that this option available for versions 1.0.0 and newer. 
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));
// app.use((req, res, next) => {
//     //res.header('Access-Control-Allow-Origin', '*');
//     //next();
//     console.log(req);
//   });

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  console.log(req.query);
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

// export async function POST(request) {
//     const body = await request.json();
//     console.log(body);
// }  

app.post('/api/item/:slug',async(req, res) => {
      const { slug } = req.params;
   console.log(slug);
   switch(slug){
          case 'upload':
           // console.log(req.body);
           let body = req.body;
           //const body = await req.json();
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
         
            return res.send('success');
          } catch (error) {
            return res.send('error');
          }
   }
})
// app.post('/api/item/:slug',(req, res) => {
//     const { slug } = req.params;
//     console.log(slug);
//     console.log("newweww");
//     switch(slug){
//       case 'upload_file_post':
//         console.log(req.query.filename)
//         //console.log(req.body);
//         //console.log(req.files);
//         //const { searchParams } = new URL(req.url);
//        // const filename = searchParams.get('filename');
//         res.end(`success`);
//         //await runMiddleware(req, res, uploadMiddleware);
//         //console.log(req.file.buffer);
//         //console.log(req);
//     }
// })
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
module.exports = app;
// export const config = {
//     api: {
//         bodyParser: false,
//         externalResolver: true,
//     },
// };