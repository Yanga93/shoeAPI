
function ajaxGet(url, cb){
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.open('GET', url);
  ajaxRequest.onload = function(){
    //var shoeData = JSON.parse(ajaxRequest.responseText);
     //console.log(;

     cb(ajaxRequest.responseText);
  }
  ajaxRequest.send();
}

function ajaxPost(url, data, cb){
  // ???
}


// get handlebars template from the script tag
//compile it
var myTemplate = document.querySelector(".myTemplate");
var template = Handlebars.compile(myTemplate.innerHTML);

var display = getElementsByClassName('displayStock');

ajaxGet("/api/shoes", function(results){
var shoeData = results[i];

  //get hold of element where data to be displayed
  //merge data into the template
  //put the resulting HTML into the target element

  console.log(results);
});































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

//   var shoedata = {
//   color: $colorName.val(),
//   size: $sizeName.val(),
//   brand: $brandName.val(),
//   in_stock: $in_stock.val()
// }
