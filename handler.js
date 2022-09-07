const connectToDatabase = require("./db");
const Product = require("./models/products")
const Category = require("./models/category");

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    error: message || "An Error occurred.",
  }),
});
const returnError = (error) => {
  console.log(error);
  if (error.name) {
    const message = `Invalid ${error.path}: ${error.value}`;
    callback(null, createErrorResponse(400, `Error:: ${message}`));
  } else {
    callback(
      null,
      createErrorResponse(error.statusCode || 500, `Error:: ${error.name}`)
    );
  }
};

module.exports.getProducts = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const products = await Product.find();
    if (!products) {
      callback(null, createErrorResponse(404, "No product Found."));
    }
    return {
      statusCode: 200,
      headers: {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Allow" : "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers" : "*"
    },
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error)
    return(error);
  }
};

module.exports.getAllCategories = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectToDatabase();
    const category = await category.find();
    if (!category) {
      callback(null, createErrorResponse(404, "No category Found."));
    }
    callback(null, {
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        },
      statusCode: 200,
      body: JSON.stringify(category),
    });
  } catch (error) {
    returnError(error);
  }
};


module.exports.postProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { name, cmimi } = JSON.parse(event.body);

  const product = new Product({
    name,
    cmimi
  });

  try {
    await connectToDatabase();
    console.log(product);
    const newProduct = await Product.create(product);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.updateProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);

  const { name, cmimi } = data;

  try {
    await connectToDatabase();

    const product = await Product.findById(event.pathParameters.id);

    if (product) {
      product.name = name || product.name;
      product.cmimi = cmimi || product.cmimi;
    }

    const newProduct = await product.save();

    callback(null, {
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        },
      statusCode: 204,
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.updateCategory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);

  const { name } = data;

  try {
    await connectToDatabase();

    const category = await Category.findById(event.pathParameters.id);

    if (category) {
      category.name = name || category.name;
    }

    const newCategory = await book.save();

    callback(null, {
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        },
      statusCode: 204,
      body: JSON.stringify(newCategory),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.deleteProduct = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;

  try {
    await connectToDatabase();
    const product = await Product.findByIdAndRemove(id);
    callback(null, {
        headers: {
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        },
      statusCode: 200,
      body: JSON.stringify({
        message: `Removed product with id: ${product._id}`,
        product,
      }),
    });
  } catch (error) {
    returnError(error);
  }
};

module.exports.deleteCategory = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event.pathParameters.id;

  try {
    await connectToDatabase();
    const category = await Category.findByIdAndRemove(id);
    callback(null, {
      statusCode: 200,
      headers: {
        "Content-Type" : "application/json",
        "Access-Control-Allow-Origin" : "*",
        "Allow" : "GET, OPTIONS, POST",
        "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
        "Access-Control-Allow-Headers" : "*"
    },
      body: JSON.stringify({
        message: `Removed category with id: ${category._id}`,
        category,
      }),
    });
  } catch (error) {
    returnError(error);
  }
};