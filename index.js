// Add Express
const express = require("express");

// Initialize Express
const app = express();

app.use(express.static(__dirname + '/public'));
app.use('/fruitVegForm',testFormRoute);

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

  //note how the route NEED not be the same as the page that will be served! 
  app.get('/start',requestHandlerStart);
  //coming from a GET request with vars from a form
  app.get('/varsArePassing',requestGet);

  function requestHandlerStart(req,res){
    res.sendFile(__dirname + '/public/start.html');
}


function testFormRoute(req, res){
  res.sendFile(__dirname + '/public/test_Form.html');
}





function requestGet(request,response){
    // console.log(request.url);
    // console.log(request.query);
  response.send({message:"success:)",fruit:request.query.fruits,veg:request.query.vegs });
  }



// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;