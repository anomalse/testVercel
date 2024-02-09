
import {upload} from 'https://cdn.jsdelivr.net/npm/@vercel/blob@0.21.0/client/+esm'
//window.onload=function(){
 
  console.log(upload);
    console.log("client js loaded");

    const form = document.getElementById("form");
//     form.addEventListener("submit",  async function(e){
//         e.preventDefault();
//         const name = document.getElementById("veg");
//         console.log(name.value);
//         const files = document.getElementById("uploaded_file");
//        const data = {veg:name.value}
//        // formData.append("uploaded_file", files.files[0]);
//         let response = await fetch("api/item/upload_file_post", {
//         method: 'POST',
//         body: JSON.stringify(data)
//     })
//   console.log(await response.text());
// })

form.addEventListener("submit",  async function(e){
  e.preventDefault();
  const name = document.getElementById("veg");
  console.log(name.value);
  const files = document.getElementById("uploaded_file");
const file = files.files[0];
 const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/item/upload',
          });
  console.log(newBlob);
  document.querySelector("#response").innerHTML = `<p><img src = ${newBlob.url} /></p>`;
})

