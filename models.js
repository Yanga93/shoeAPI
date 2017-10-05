const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function(err, results) {
    if(err){
      console.log(err);
    }
    else{
      console.log("connected to database")
    }
    });


    var shoeModel = mongoose.model('shoeModel', {
        name: String,
        days: Object


    });


    return {
      shoeModel
    }
}
