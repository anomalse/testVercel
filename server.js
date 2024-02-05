let express = require('express');
const portNumber =4200;
const app = express();

app.use(express.static(__dirname + '/public'));
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploaded_images/');
  },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage });
  



app.listen(portNumber, function () {
    console.log("Server is running on port "+portNumber);
  });




  //note how the route NEED not be the same as the page that will be served! 
app.get('/start',requestHandlerStart);

function requestHandlerStart(request,response){
    response.sendFile(__dirname + '/public/index_test.html');
}
  //note how the route NEED not be the same as the page that will be served! 
  app.get('/',requestRootHandler);

  function requestRootHandler(request,response){
      response.sendFile(__dirname + '/public/start.html');
  }


	

app.get('/varsArePassing',requestGet);

// function requestGet(request,response){
//     console.log(request.url);
//     console.log(request.query);
//     response.end(); //write back empty response
//   }

function requestGet(request,response){
    console.log(request.url);
    console.log(request.query);
  //  response.end(); //write back empty response
  //response.send("<h1> result </h1>"+"Name:: "+request.query.name + "<br />" +"color:: "+request.query.color);
  response.send({message:"success:)",fruit:request.query.fruits,veg:request.query.vegs });
  }
  
  app.use('/fruitVegForm',testFormRoute);

  function testFormRoute(req, res){
    res.sendFile(__dirname + '/public/test_Form.html');
 }

 app.use('/postEx',handlePostEx);
  
function handlePostEx(request,response){
console.log(request.url);
console.log(request.query);
response.sendFile(__dirname + '/public/testFormPost.html');
}

app.use("/upload_file_post", upload.single("uploaded_file"), postUploadHandler);
 
 
function postUploadHandler(req,res){
 console.log(req.body.veg);
 console.log(req.file);
 res.send("success posting");

}

// Export the Express API
module.exports = app;

