const Cart = require('./../models/cartModel');
const apiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.addToCart = catchAsync(async (req, res, next) => {
    
});

exports.createCart = catchAsync(async (req, res, next) => {
    const newCart = new Cart(req.body);
  
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
});

exports.updatedCart = catchAsync(async (req, res, next) => {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

    res.status(200).json({
        status: 'success',
        data: {
            updatedCart
        }
    });
});

exports.deleteFromCart = catchAsync(async (req, res, next) => {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            msg: 'successfully deleted item from cart'
        }
    });
});

exports.getUserCart = catchAsync(async (req, res, next) => {
    const cart = await Cart.findOne({userId: req.params.userId});

    res.status(200).json({
        status: 'success',
        data: {
            cart
        }
    });
});
