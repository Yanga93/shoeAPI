var addButton = document.querySelector(".addButton");
var brandInput = document.querySelector(".brandInput");
var colorInput = document.querySelector(".colorInput");
var sizeInput = document.querySelector(".sizeInput");
var instockInput = document.querySelector(".instockInput")

//ajax get request to display all stock
function ajaxGet(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    };
    ajaxRequest.send();
};

//ajax post request to send new stock to the database
function ajaxPost(url, data, cb) {
    qwest
        .post(url, data)
        .then(cb);
};

function brandFilterGet(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    };
    ajaxRequest.send();
}


function sizeFilterGet(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    };
    ajaxRequest.send();
}

var displayDropdowns = document.querySelector('.displayDropdowns')
var researchButton = document.querySelector('.researchButton')
var display2 = document.querySelector('.displayStock2');

var filterTemplate = document.querySelector(".filterTemplate");
var filTemplate = Handlebars.compile(filterTemplate.innerHTML);

var SizeTemplate = document.querySelector(".SizeTemplate");
var sizeTemp = Handlebars.compile(SizeTemplate.innerHTML);

researchButton.addEventListener("click", function() {
    var brandClass = document.querySelector(".brandClass");
    var brandname = brandClass.value;


    brandFilterGet("/api/shoes/brand/" + brandname, function(input) {
        display.innerHTML = template({
            shoesList: input
        })
    });
});

//search button to search for given  size
researchButton.addEventListener("click", function() {
    var sizeClass = document.querySelector(".sizeClass");
    var size = sizeClass.value;

    sizeFilterGet("/api/shoes/size/" + size, function(input) {
        display.innerHTML = template({
            shoesList: input
        })
    });
});


//ajax call for given brands to display on the dropdown
function brandAjaxCall(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    };
    ajaxRequest.send();
}

brandAjaxCall("/api/shoes/allBrands", function(data) {
    displayDropdowns.innerHTML = filTemplate({
        Brand: data.brands
    })
})

//ajax call for given sizes to display on the dropdown
function sizeAjaxCall(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse(ajaxRequest.responseText);
        cb(data);
    };
    ajaxRequest.send();
}

sizeAjaxCall("/api/shoes/allSize", function(data) {
    display2.innerHTML = sizeTemp({
        Size: data.sizes
    })
})

// get handlebars template from the script tag
//compile it
var myTemplate = document.querySelector(".myTemplate");
var template = Handlebars.compile(myTemplate.innerHTML);


var display = document.querySelector('.displayStock');


ajaxGet("/api/shoes", function(database) {

    display.innerHTML = template({
        shoesList: database
    })
})

//Buying a shoe ajax call function
function buyAjaxCall(url, cb) {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('POST', url);
    ajaxRequest.onload = function() {
        var data = JSON.parse('ajaxRequest.responseText');
        console.log(data);
        cb(data);
    };
    ajaxRequest.send();
}

function buyButton(id) {
    buyAjaxCall("/api/shoes/sold/" + id, function(dataId) {
        display.innerHTML = template({
            shoeslist: dataId
        })
    })
    window.location.reload()
}


// adding stock to the database via textboxes
addButton.addEventListener("click", function() {
    var brandB = brandInput.value;
    var colorB = colorInput.value;
    var sizeB = Number(sizeInput.value);
    var in_stock = Number(instockInput.value);
    var newData = {
        brand: brandB,
        color: colorB,
        size: sizeB,
        in_stock: in_stock
    };

    var errMessage = document.querySelector(".errMessage");
    ajaxPost("api/shoes", newData, function() {
        document.querySelector(".brandInput").value = "";
        document.querySelector(".colorInput").value = "";
        document.querySelector(".sizeInput").value = "";
        document.querySelector(".instockInput").value = "";

        if (brandB.length == 0 || colorB.length == 0 || sizeB.length == 0 || in_stock.length == 0) {
            errMessage.innerHTML = "Please fill in the textboxes";
        }

        display.innerHTML = template({
            shoesList: newData
        })
    })
    window.location.reload()
})
