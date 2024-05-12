const Brand = require('./../models/brandModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getBrand = factory.getOne(Brand);
exports.getAllBrands = factory.getAll(Brand);
exports.createBrand = factory.createOne(Brand);
exports.updateBrand = factory.updateOne(Brand);
exports.deleteBrand = factory.deleteOne(Brand);

exports.getAllBrands = catchAsync(async (req, res, next) => {
  const brands = new APIFeatures(Brand.find())
  
    // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      brands
    }
  });
});

exports.getBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      brand: brand
    }
  });
});

exports.createBrand = catchAsync(async (req, res, next) => {
  const newBrand = await Brand.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      brand: newBrand
    }
  });
});

exports.updateBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!brand) {
    return next(new AppError('No brand found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
        brand
    }
  });
});

exports.deleteBrand = catchAsync(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id);

  if (!brand) {
    return next(new AppError('No brand found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
  
