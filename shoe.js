module.exports = function(models) {

    var shoesFun = function(req, res, next) {
        var brandName = req.body.brand
        console.log(req.body);
        var colorName = req.body.color
        var sizeName = req.body.size
        var in_stock = req.body.in_stock
        models.Shoes.create({
                color: colorName,
                size: sizeName,
                brand: brandName,
                in_stock: in_stock
            },

            function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    res.json(results);
                }
            })
    }

    var findAllshoes = function(req, res, next) {
        models.Shoes.find({}, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results)
                res.json(results);
            }
        })
    }

    var findBrand = function(req, res, next) {
        var brandName = req.params.brandname
        models.Shoes.find({
            brand: brandName
        }, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                console.log(results)
                res.json(results);
            }
        })
    }

    var sizeFun = function(req, res, next) {
        var sizeName = req.params.size
        models.Shoes.find({
            size: sizeName
        }, function(err, results) {
            if (err) {
                console.log(err);
            } else {
                res.json(results)
            }
        })
    }

    var brandAndSize = function(req, res, next) {
        var sizeName = req.params.size
        var brandName = req.params.brandname
        models.Shoes.find({
            size: sizeName
        }, {
            brand: brandName
        }, function(err, results) {
            if (err) {
                console.log(err)
            } else {
                res.json(results)
            }
        })
    }

    var soldShoes = function(req, res, next) {
        var soldId = req.params.id;
        models.Shoes.findOneAndUpdate({
            _id: soldId
        }, {
            $inc: {
                in_stock: -1
            }
        }, {
            upsert: false
        }, function(err, results) {
            if (err) {
                console.log(err)
            } else {
                res.json(results)
            }
        })
    }

    return {
        shoesFun,
        findAllshoes,
        findBrand,
        sizeFun,
        brandAndSize,
        soldShoes
    }
}
