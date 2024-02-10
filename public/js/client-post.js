
//import {upload} from 'https://cdn.jsdelivr.net/npm/@vercel/blob@0.21.0/client/+esm'
// import {readFile} from 'https://cdn.jsdelivr.net/npm/fs@0.0.1-security/+esm'
//window.onload=function(){
 
  //console.log(upload);
    console.log("client js loaded");

    const form = document.getElementById("form");

    form.addEventListener("submit",  async function(e){
        e.preventDefault();
        const name = document.getElementById("veg");
        console.log(name.value);
      const files = document.getElementById("uploaded_file");

      // const response = await fetch(
      //   `/api/?filename=${files.files[0].name}`,
      //   {
      //     method: 'POST',
      //     body:files.files[0],
      //   },
      // );
      

       

       let fr = new FileReader();
       fr.onload = async function(){
        //console.log(fr.result);

        const bodyF = new FormData();
        let t = {file1: fr.result, fileName:files.files[0].name};

        //let response = await fetch("api/item/upload", {
        let response = await fetch("api/", {
        method: 'POST',
        headers: {
           "Content-Type": "application/json",
          //'Content-Type': 'application/x-www-form-urlencoded',
          //'Content-Type':'multipart/form-data'
          //  'Content-type':'application/octet-stream'
        },
        body:JSON.stringify(t)
     })
   console.log(await response.text());



       };
       fr.readAsDataURL(files.files[0]);

       //const blob = new Blob([await fs.readFile(body.set("file1", blob, fileName))]);



    
})

// form.addEventListener("submit",  async function(e){
//   e.preventDefault();
//   const name = document.getElementById("veg");
//   console.log(name.value);
//   const files = document.getElementById("uploaded_file");
// const file = files.files[0];
//  const newBlob = await upload(file.name, file, {
//             access: 'public',
//             handleUploadUrl: '/api/item/upload',
//           });
//   console.log(newBlob);
//   document.querySelector("#response").innerHTML = `<p><img src = ${newBlob.url} /></p>`;
// })

