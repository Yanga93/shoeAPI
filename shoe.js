module.exports = function(models) {

    var shoesFun = function(req, res, next) {
        var brandName = req.body
        var colorName = req.body
        models.Shoes.create({
                color: colorName,
                size: Number(sizeNumber),
                brand: brandName,
                in_stock: Number(stock)
            },
            function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    res.json(results);
                }
            })

    }

    var findAllbrand = function(req, res, next){
      var brandName = req.body
       models.Shoes.find({brand: brandName}, function(err, results){
        if(err){
          console.log(err);
        }
        else{
          res.json(results);
        }
      })
    }
 var sizeFun = function(req, res, next){
   var sizeName = req.body
   models.Shoes.find({size: sizeName}, function(err, results){
     if(err){
       console.log(err);
     }
     else{
       res.json(results)
     }
   })
 }

var  brandAndSize = function(req, res, next){
  var sizeName = req.body
  var brandName = req.body
  models.Shoes.find({size : sizeName},{brand:brandName}, function(err, results){
  if(err){
    console.log(err)
  }
  else {
    res.json(results)
  }
  })
}
    return {
        shoesFun,
        findAllbrand,
        sizeFun,
        brandAndSize

        }
}
