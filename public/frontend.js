function ajaxGet(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    }
    ajaxRequest.send();
}

var addButton = document.querySelector(".addButton");
var brandInput = document.querySelector(".brandInput").value;
var colorInput = document.querySelector(".colorInput").value;
var sizeInput = document.querySelector(".sizeInput").value;


function ajaxPost(url,data, cb) {

    var ajaxRequest =  new XMLHttpRequest();
    ajaxRequest.open('POST', url);
    ajaxRequest.onload = function() {
        var datap = JSON.parse(data);
        console.log(data);
        cb(datap);
    }

    ajaxRequest.send();
}


// get handlebars template from the script tag
//compile it
var myTemplate = document.querySelector(".myTemplate");
var template = Handlebars.compile(myTemplate.innerHTML);

var showButton = document.querySelector('.showButton')
var display = document.querySelector('.displayStock');



// showButton.addEventListener("click", function(){
ajaxGet("/api/shoes", function(database) {
    //console.log(database)
    //get hold of element where data to be displayed
    //console.log(database);
    display.innerHTML = template({
        shoesList: database
    })

});
 // })
addButton.addEventListener('click', function(){
  // console.log("helo")
ajaxPost("api/shoes", function() {

var brandB = brandInput.value;
var colorB = colorInput.value;
var sizeB = Number(sizeInput.value);

document.querySelector(".brandInput").value="";
document.querySelector(".colorInput").value="";
document.querySelector(".sizeInput").value="";

console.log(brandB);
var newStock = {
  brand: brandB,
  color: colorB,
  size: sizeB
};


display.innerHTML = template({shoesList:newStock})
})
})






//merge data into the template
//put the resulting HTML into the target element

// console.log(results);

//display.addEventListener("click")









//jquiry code
// $(function(){
// $ajax({
//   type: 'GET',
//   url: '/api/shoes',
//   data: shoedata,
//   success: function(data){
//     console.log(data);
//   }
// })
// })
