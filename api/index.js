/*https://vercel.com/guides/using-express-with-vercel*/
const app = require('express')();
const { v4 } = require('uuid');

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
       // res.end(`query: ${req.query.fruits} and ${req.query.vegs} `)
        res.send({"fruit": req.query.fruits,"veg":req.query.vegs});
        break;
    default:
        res.end(`no case `);

  }
 
});

//  app.get('/start', requestRootHandler);

// function requestRootHandler(request,response){
//     console.log("running");
//     response.end('test 123');
//  }
  





module.exports = app;