const Product = require('./../models/productModel');
const catchAsync = require('./../utils/catchAsync');

exports.getSlider = catchAsync(async (req, res, next) => {
    const images = await Product.aggregate.sample(req.params.count).select('+img');

    res.status(200).json({
        status: 'success',
        data: {
            images
        }
    });
});
