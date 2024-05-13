const Order = require('./../models/orderModel');
const apiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res, next) => {
    const newOrder = new Order(req.body);

    const savedOrder = await newOrder.save();
    res.status(200).json({
        status: 'success',
        data: {
            savedOrder
        }
    });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
    const orders = Order.find();

    res.status(200).json({
        status: 'success',
        data: {
            orders
        }
    });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
    const updatedOrder = Order.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});

    res.status(200).json({
        status: 'success',
        data: {
            updatedOrder
        }
    });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            msg: 'Order deleted successfully!'
        }
    });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
    const userOrders = Order.findById({userId: req.params.userId});

    res.status(200).json({
        status: 'success',
        data: {
            userOrders
        }
    });
});

exports.getTopSellingProducts = catchAsync(async (req, res, next) => {
    const products = await Order.aggregate([
        {
            "$unwind": "$items"
        },
        {
            "$group": {
                "_id": "$items.itemId",
                "sum": {
                    "$sum": "$items.qty"
                }
            }
        },
        {
            "$sort": {
                sum: -1
            }
        },
        {
            "$group": {
                "_id": null,
                "top_selling_products": {
                    $push: "$$ROOT"
                }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            products
        }
    });
});

exports.getMonthlyIncome = catchAsync(async (req, res, next) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth) - 1);
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    const income = Order.aggregate([
        {$match: {createdAt: {$gte: previousMonth}}},
        {
            $project: {
                month: {$month: '$createdAt'},
                sales: '$amount',
            }
        },
        {
            $group: {
                _id: '$month',
                total: {$sum: '$sales'}
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            income
        }
    });
});
