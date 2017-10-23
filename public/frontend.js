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
  var brandInput = document.querySelector(".brandInput");
  var colorInput = document.querySelector(".colorInput");
  var sizeInput = document.querySelector(".sizeInput");


function ajaxPost(url, data, cb) {

  qwest
    .post(url, data)
    .then(cb);
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

addButton.addEventListener("click", function(){
  var brandB = brandInput.value;
  var colorB = colorInput.value;
  var sizeB = Number(sizeInput.value);

    var newData = {
      brand: brandB,
      color: colorB,
      size: sizeB
    };

    ajaxPost("api/shoes", newData, function() {
      document.querySelector(".brandInput").value = "";
      document.querySelector(".colorInput").value = "";
      document.querySelector(".sizeInput").value = "";


        display.innerHTML = template({
          shoesList: datay.newData
        })
    })
})
