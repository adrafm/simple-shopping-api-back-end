const Comment = require('./../models/commentModel');
const apiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getComments = catchAsync(async (req, res, next) => {
    const comments = Comment.find({'$id': req.params.prodcutId});

    res.status(200).json({
        status: 'success',
        data: {
            comments
        }
    });
});
