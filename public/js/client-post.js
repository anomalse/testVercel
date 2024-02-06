window.onload=function(){

    console.log("client js loaded");

    const form = document.getElementById("form");
    form.addEventListener("submit",  async function(e){
        e.preventDefault();
        const name = document.getElementById("veg");
        console.log(name.value);
        const files = document.getElementById("uploaded_file");
        const formData = new FormData();
        formData.append("veg", name.value);
        formData.append("uploaded_file", files.files[0]);
        let response = await fetch("/upload_file_post", {
        method: 'POST',
        body: formData
    })
  console.log(await response.json());
})

}