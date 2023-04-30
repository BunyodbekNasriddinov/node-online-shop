const { read, write, queryFilter } = require("../utils/model");

module.exports = {
  GET: (req, res) => {
    const categories = read("categories");
    const subCategories = read("subCategories");

    categories.map((category) => {
      category.subCategories = subCategories.filter(
        (subCategory) => subCategory.category_id === category.category_id
      );
    });

    const data = queryFilter(req.query, subCategories);

    res.json(200, data);
  },

  POST: async (req, res) => {
    const categories = read("categories");
    const { category_name } = await req.body;
    const findedCategory = categories.find(
      (category) => category.category_name === category_name
    );
    const category_id = categories.at(-1).category_id + 1 || 1;

    try {
      if (findedCategory) {
        throw new Error("This category already exists");
      }

      write("categories", [...categories, { category_id, category_name }]);

      res.json(201, { status: 201, message: "Category succesfully added" });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },

  PUT: async (req, res) => {
    const categories = read("categories");
    const { category_id, category_name } = await req.body;
    const findedCategory = categories.find(
      (category) => category.category_id === category_id
    );

    try {
      if (!findedCategory) {
        throw new Error("No such category exists");
      }

      if (findedCategory.category_name === category_name) {
        throw new Error("Same as the previous category name");
      }

      findedCategory.category_name = category_name;

      write("categories", categories);

      res.json(200, { status: 200, message: "Category succesfully changed" });
    } catch (error) {
      res.json(400, { status: 400, message: error.message });
    }
  },

  DELETE: async (req, res) => {
    const categories = read("categories");
    const { category_id } = await req.body;
    const findedCategoryIndex = categories.findIndex(
      (category) => category.category_id === category_id
    );

    try {
      if (findedCategoryIndex == -1) {
        throw new Error("Category not found");
      }

      const [deletedCategory] = categories.splice(findedCategoryIndex, 1);

      write("categories", categories);

      res.json(200, {
        status: 200,
        message: "Category succesfully deleted",
        data: deletedCategory,
      });
    } catch (error) {
      res.json(404, { status: 404, message: error.message });
    }
  },
};
