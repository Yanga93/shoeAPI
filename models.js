const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function(err, results) {
    if(err){
      console.log(err);
    }
    else{
      console.log("connected to database hureey")
    }
    });


    var Shoes = mongoose.model('Shoes', {
        color: String,
        size: Number,
        brand: String,
        in_stock: Number
    });


    return {
      Shoes
    }
}
