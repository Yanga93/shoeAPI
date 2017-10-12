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
        color: {
        type: String,
        required :"color is required"
      },
        size:{
         type: Number,
         required: "size is required"
       },
        brand: {
          type: String,
          required: "brand is required"
        },
        in_stock:
        {
           type: Number
         }
    });


    return {
      Shoes
    }
}
