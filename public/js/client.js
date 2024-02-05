window.onload=function(){

    console.log("client js loaded again");

    // get the myFavs element and add an event listener (click) to it:
  //  document.getElementById("myFavs").addEventListener("click",  function(){
  document.getElementById("myFavs").addEventListener("click", async function(){
    // get the values of the two input fields
    let favFruit =   document.getElementById("fruit").value;
    let favVeg =   document.getElementById("veg").value;
    console.log(favVeg);
    console.log(favFruit);
    let jsonVals = {fruits : favFruit, vegs : favVeg}
 
    let  response = await fetch('/varsArePassing/?' + new URLSearchParams(jsonVals));
     console.log("the response::: ")
     //console.log(await response.text());
     let jsonResp = await response.json();
     console.log(jsonResp.message);

     let responseHTML = document.querySelector("#responseFromServer");
     //using the preformatted tag
     responseHTML.innerHTML = 
     `
     <p><span class = "pre-tab">Selected Fruit:</span>  ${jsonResp.fruit} </p>
     <p><span class = "pre-tab">Selected Veg:</span>    ${jsonResp.veg}</p>
     `



  })//click function
}


