const { read, write, queryFilter } = require("../utils/model");

module.exports = {
  GET: (req, res) => {
    const subCategories = read("subCategories");
    const products = read("products");

    subCategories.map((subCategory) => {
      subCategory.products = products.filter(
        (product) => product.sub_category_id === subCategory.sub_category_id
      );
      subCategory.products.map((item) => delete item.sub_category_id);
    });

    const data = queryFilter(req.query, subCategories);

    res.json(200, data);
  },

  POST: async (req, res) => {
    const subCategories = read("subcategories");
    const { sub_category_name, category_id } = await req.body;
    const findedSubCategory = subCategories.find(
      (subCategory) =>
        subCategory.sub_category_name === sub_category_name &&
        subCategory.category_id === category_id
    );
    const sub_category_id = subCategories.at(-1).sub_category_id + 1 || 1;

    try {
      if (findedSubCategory) {
        throw new Error("This subcategory already exists");
      }

      write("subcategories", [
        ...subCategories,
        { category_id, sub_category_id, sub_category_name },
      ]);

      res.json(201, { status: 201, message: "Subcategory succesfully added" });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },

  PUT: async (req, res) => {
    const subCategories = read("subcategories");
    const { sub_category_name, sub_category_id } = await req.body;
    const findedSubCategory = subCategories.find(
      (subCategory) => subCategory.sub_category_id === sub_category_id
    );

    try {
      if (!findedSubCategory) {
        throw new Error("No such subcategory exists");
      }

      if (findedSubCategory.sub_category_name === sub_category_name) {
        throw new Error("Same as the previous subcategory name");
      }

      findedSubCategory.sub_category_name = sub_category_name;

      write("subcategories", subCategories);

      res.json(200, {
        status: 200,
        message: "Subcategory succesfully changed",
      });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },

  DELETE: async (req, res) => {
    const subCategories = read("subcategories");
    const { sub_category_id } = await req.body;
    const findedSubCategoryIndex = subCategories.findIndex(
      (subCategory) => subCategory.sub_category_id === sub_category_id
    );

    try {
      if (findedSubCategoryIndex == -1) {
        throw new Error("Category not found");
      }

      const [deletedSubCategory] = subCategories.splice(
        findedSubCategoryIndex,
        1
      );

      write("subcategories", subCategories);

      res.json(200, {
        status: 200,
        message: "Subcategory succesfully deleted",
        data: deletedSubCategory,
      });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },
};
