// Add Express
const express = require("express");

// Initialize Express
const app = express();

app.use(express.static(__dirname + '/public'));

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

  //note how the route NEED not be the same as the page that will be served! 
  app.get('/start',requestHandlerStart);

  function requestHandlerStart(request,response){
    response.sendFile(__dirname + '/public/start.html');
}

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;