const Brand = require("../../Models/Brand");
const Category = require("../../Models/Category");
const Family = require("../../Models/Family");
const Product = require("../../Models/Product");
const User = require("../../Models/User");

/**
 * @class Brands
 * @params { Filter: JSON, Sort: Array, Range: Array }
 */
exports.brandsFiltersAndSort = (filter, sort, range) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check Empty filters and sort lenght
      let filterLenght = Object.keys(filter).length;
      let sortLenght = Object.keys(sort).length;
      // String to JSON
      let fieldFilter = JSON.parse(filter);
      let sortFilter = JSON.parse(sort);
      // Init State
      let brands;
      let filteredQuery;
      let status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      let sortJson = {};
      let key = sortFilter[0];
      let val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      let pagination = JSON.parse(range);
      let page = pagination[0];
      let limit = pagination[1];
      // Only Sort
      if (sortLenght > 2 && filterLenght <= 2) {
        // Add Sort Query
        filteredQuery = await Brand.find()
          .sort(sortJson)
          .skip(page)
          .limit(limit + 1);
        brands = filteredQuery;
      }
      // Field filter and Order
      else if (filterLenght > 2 && sortLenght > 2) {
        // Filter by field value, MongoDB equivalent to condition '%like'
        let qName = fieldFilter.name;
        let qCat = fieldFilter.categories;
        let allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }
        if (qCat) {
          let catQuery = await Category.find({
            name: { $regex: qCat, $options: "i" },
          });
          let catId = catQuery[0]._id;
          allQuery["categories"] = catId;
        }
        /**
         * @var filteredQuery
         * Query with letiables
         */
        filteredQuery = await Brand.find({
          $and: [
            {
              $or: [allQuery],
            },
          ],
        })
          .sort(sortJson)
          .skip(page)
          .limit(limit + 1);

        brands = filteredQuery;
        status = "filtered";
      }
      // Default ALL_LIST
      else {
        const brandsQuery = await Brand.find().populate("categories", "name");
        brands = brandsQuery;
      }
      resolve({brands, status});
    } catch (err) {
      reject("Query Failed " + err);
    }
  });
};

/**
 * @class Categories
 * @params { Filter: JSON, Sort: Array, Range: Array }
 */
exports.categoriesFiltersAndSort = (filter, sort, range) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check Empty filters and sort lenght
      let filterLenght = Object.keys(filter).length;
      let sortLenght = Object.keys(sort).length;
      // String to JSON
      let fieldFilter = JSON.parse(filter);
      let sortFilter = JSON.parse(sort);
      // Init State
      let categories;
      let filteredQuery;
      let sortQuery;
      let status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      let sortJson = {};
      let key = sortFilter[0];
      let val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      let pagination = JSON.parse(range);
      let page = pagination[0];
      let limit = pagination[1];
      // Only Sort
      if (sortLenght > 2 && filterLenght <= 2) {
        // Add Sort Query
        sortQuery = await Category.find({})
          .sort(sortJson)
          .populate("family", "name")
          .skip(page)
          .limit(limit + 1);
        categories = sortQuery;
      }
      // Field filter and Order
      else if (filterLenght > 2 && sortLenght > 2) {
        // Filter by field value, MongoDB equivalent to condition '%like'
        let qName = fieldFilter.name;
        let qFamily = fieldFilter.family;
        let allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }
        if (qFamily) {
          let famQuery = await Family.find({
            name: { $regex: qFamily, $options: "i" },
          });
          let famId = famQuery[0]._id;
          allQuery["family"] = famId;
        }
        /**
         * @var filteredQuery
         * Query with letiables
         */
        filteredQuery = await Category.find({
          $and: [
            {
              $or: [allQuery],
            },
          ],
        })
          .sort(sortJson)
          .populate("family", "name")
          .skip(page)
          .limit(limit + 1);

        categories = filteredQuery;
        status = "filtered";
      }
      // Default ALL_LIST
      else {
        const categoriesQuery = await Category.find({}).populate(
          "family",
          "name"
        );
        categories = categoriesQuery;
      }
      resolve({categories, status});
    } catch (err) {
      reject("Query Failed" + err);
    }
  });
};

/**
 * @class Products
 * @params { Filter: JSON, Sort: Array, Range: Array }
 */
exports.productsFiltersAndSort = (filter, sort, range) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check Empty filters and sort lenght
      let filterLenght = Object.keys(filter).length;
      let sortLenght = Object.keys(sort).length;
      // String to JSON
      let fieldFilter = JSON.parse(filter);
      let sortFilter = JSON.parse(sort);
      // Init State
      let products;
      let filteredQuery;
      let status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      let sortJson = {};
      let key = sortFilter[0];
      let val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      let pagination = JSON.parse(range);
      let page = pagination[0];
      let limit = pagination[1];
      // Only Sort
      if (sortLenght > 2 && filterLenght <= 2) {
        // Add Sort Query
        filteredQuery = await Product.find()
          .sort(sortJson)
          .populate("brand", "name")
          .populate("categories", "name");
        products = filteredQuery;
      }
      // Field filter and Order
      else if (filterLenght > 2 && sortLenght > 2) {
        // Filter by field value, MongoDB equivalent to condition '%like'
        let qName = fieldFilter.name;
        let qSku = parseInt(fieldFilter.sku);
        let qBrand = fieldFilter.brand;
        let qCat = fieldFilter.categories;
        let qTag = fieldFilter.tags;
        // Json QueryWW
        let allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }
        if (qTag) {
          allQuery["tags"] = { $regex: qTag, $options: "i" };
        }
        if (qSku) {
          allQuery["sku"] = { $in: [qSku, qSku] };
        }
        if (qBrand) {
          let brandQuery = await Brand.find({
            name: { $regex: qBrand, $options: "i" },
          });
          let brandId = brandQuery[0]._id;
          allQuery["brand"] = brandId;
        }
        if (qCat) {
          let catQuery = await Category.find({
            name: { $regex: qCat, $options: "i" },
          });
          let catId = catQuery[0]._id;
          allQuery["categories"] = catId;
        }
        /**
         * @var filteredQuery
         * Query with letiables
         */
        filteredQuery = await Product.find({
          $and: [
            {
              $or: [allQuery],
            },
          ],
        })
          .sort(sortJson)
          .populate("brand", "name")
          .populate("categories", "name")
          .skip(page)
          .limit(limit + 1);

        products = filteredQuery;
        status = "filtered";
      }
      // Default ALL_LIST
      else {
        const productsQuery = await Product.find({})
          .populate("brand", "name")
          .populate("categories", "name");
        products = productsQuery;
      }
      resolve({products, status});
    } catch (err) {
      reject("Query Failed" + err);
    }
  });
};

/**
 * @class Family
 * @params { Filter: JSON, Sort: Array, Range: Array }
 */
exports.familyFiltersAndSort = (filter, sort, range) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check Empty filters and sort lenght
      let filterLenght = Object.keys(filter).length;
      let sortLenght = Object.keys(sort).length;
      // String to JSON
      let nameQuery = JSON.parse(filter);
      let sortFilter = JSON.parse(sort);
      let families;
      let filteredQuery;
      let status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      let sortJson = {};
      let key = sortFilter[0];
      let val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      let pagination = JSON.parse(range);
      let page = pagination[0];
      let limit = pagination[1];
      // Only Sort
      if (sortLenght > 2 && filterLenght <= 2) {
        // Add Sort Query
        filteredQuery = await Family.find({})
          .sort(sortJson)
          .skip(page)
          .limit(limit + 1);
        families = filteredQuery;
      }
      // Field filter and Order
      else if (filterLenght > 2 && sortLenght > 2) {
        // Filter by field value, MongoDB equivalent to condition '%like'
        let qName = nameQuery.name;
        let allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }

        /**
         * @var filteredQuery
         * Query with letiables
         */
        filteredQuery = await Family.find({
          $and: [
            {
              $or: [allQuery],
            },
          ],
        })
          .sort(sortJson)
          .skip(page)
          .limit(limit + 1);
        families = filteredQuery;
        status = "filtered";
      }
      // Default ALL_LIST
      else {
        const familiesQuery = await Family.find({});
        families = familiesQuery;
      }
      resolve({families, status});
    } catch (err) {
      reject("Query Failed" + err);
    }
  });
};

/**
 * @class Users
 * @params { Filter: JSON, Sort: Array, Range: Array }
 */
exports.usersFiltersAndSort = (filter, sort, range) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filterLenght = Object.keys(filter).length;
      let sortLenght = Object.keys(sort).length;
      // String to JSON;
      let sortFilter = JSON.parse(sort);
      let users;
      let filteredQuery;
      let status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      let sortJson = {};
      let key = sortFilter[0];
      let val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      let pagination = JSON.parse(range);
      let page = pagination[0];
      let limit = pagination[1];
      if (sortLenght > 2 && filterLenght <= 2) {
        // Add Sort Query
        filteredQuery = await User.find({})
          .sort(sortJson)
          .select({ password: 0, createdAt: 0, updatedAt: 0})
          .skip(page)
          .limit(limit + 1);
        users = filteredQuery;
      } else {
        const usersQuery = await User.find({});
        users = usersQuery;
      }
      resolve({users, status});
    } catch (err) {
      reject("Query Failed" + err);
    }
  });
};
