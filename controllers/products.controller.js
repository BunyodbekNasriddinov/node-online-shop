const { read, queryFilter, write } = require("../utils/model");

module.exports = {
  GET: (req, res) => {
    const products = read("products");
    const subCategories = read("subcategories");

    // products array category_id key value add
    products.map((product) => {
      product.category_id = subCategories.find(
        (subCategory) => product.sub_category_id == subCategory.sub_category_id
      ).category_id;
    });

    console.log(products);

    /*query filter add function*/
    const data = queryFilter(req.query, products);

    res.json(200, data);
  },

  POST: async (req, res) => {
    const products = read("products");
    const { sub_category_id, product_name, price, color, model } =
      await req.body;
    const findedProduct = products.find(
      (product) => product.product_name === product_name
    );

    try {
      if (findedProduct) {
        throw new Error("This product already exists");
      }

      if (
        !products.find((product) => product.sub_category_id == sub_category_id)
      ) {
        throw new Error("No such subcategory exists");
      }

      const product_id = products.at(-1).product_id + 1 || 1;

      write("products", [
        ...products,
        { product_id, sub_category_id, product_name, price, color, model },
      ]);

      res.json(201, { status: 201, message: "Product succesfully added" });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },

  PUT: async (req, res) => {
    // productId productName price
    const products = read("products");
    const { product_id, product_name, price } = await req.body;
    const findedProduct = products.find(
      (product) => product.product_id === product_id
    );

    try {
      if (!findedProduct) {
        throw new Error("Not found product");
      }

      findedProduct.product_name = product_name || findedProduct.product_name;
      findedProduct.price = price || findedProduct.price;

      write("products", products);

      res.json(202, { status: 202, message: "Product succesfully changed" });
    } catch (error) {
      res.json(404, { status: 404, message: error.message });
    }
  },

  DELETE: async (req, res) => {
    const products = read("products");
    const { product_id } = await req.body;
    const findedProductIndex = products.findIndex(
      (product) => product.product_id === product_id
    );

    try {
      if (findedProductIndex == -1) {
        throw new Error("Product not found");
      }

      const [deletedProduct] = products.splice(findedProductIndex, 1);

      write("products", products);

      res.json(200, {
        status: 200,
        message: "Product succesfully deleted",
        data: deletedProduct,
      });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
};
