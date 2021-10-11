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
      var filterLenght = Object.keys(filter).length;
      var sortLenght = Object.keys(sort).length;
      // String to JSON
      var fieldFilter = JSON.parse(filter);
      var sortFilter = JSON.parse(sort);
      // Init State
      var brands;
      var filteredQuery;
      var status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      var sortJson = {};
      var key = sortFilter[0];
      var val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      var pagination = JSON.parse(range);
      var page = pagination[0];
      var limit = pagination[1];
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
        var qName = fieldFilter.name;
        var qCat = fieldFilter.categories;
        var allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }
        if (qCat) {
          var catQuery = await Category.find({
            name: { $regex: qCat, $options: "i" },
          });
          var catId = catQuery[0]._id;
          allQuery["categories"] = catId;
        }
        /**
         * @var filteredQuery
         * Query with variables
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
      var filterLenght = Object.keys(filter).length;
      var sortLenght = Object.keys(sort).length;
      // String to JSON
      var fieldFilter = JSON.parse(filter);
      var sortFilter = JSON.parse(sort);
      // Init State
      var categories;
      var filteredQuery;
      var sortQuery;
      var status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      var sortJson = {};
      var key = sortFilter[0];
      var val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      var pagination = JSON.parse(range);
      var page = pagination[0];
      var limit = pagination[1];
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
        var qName = fieldFilter.name;
        var qFamily = fieldFilter.family;
        var allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }
        if (qFamily) {
          var famQuery = await Family.find({
            name: { $regex: qFamily, $options: "i" },
          });
          var famId = famQuery[0]._id;
          allQuery["family"] = famId;
        }
        /**
         * @var filteredQuery
         * Query with variables
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
      var filterLenght = Object.keys(filter).length;
      var sortLenght = Object.keys(sort).length;
      // String to JSON
      var fieldFilter = JSON.parse(filter);
      var sortFilter = JSON.parse(sort);
      // Init State
      var products;
      var filteredQuery;
      var status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      var sortJson = {};
      var key = sortFilter[0];
      var val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      var pagination = JSON.parse(range);
      var page = pagination[0];
      var limit = pagination[1];
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
        var qName = fieldFilter.name;
        var qSku = parseInt(fieldFilter.sku);
        var qBrand = fieldFilter.brand;
        var qCat = fieldFilter.categories;
        var qTag = fieldFilter.tags;
        // Json QueryWW
        var allQuery = {};
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
          var brandQuery = await Brand.find({
            name: { $regex: qBrand, $options: "i" },
          });
          var brandId = brandQuery[0]._id;
          allQuery["brand"] = brandId;
        }
        if (qCat) {
          var catQuery = await Category.find({
            name: { $regex: qCat, $options: "i" },
          });
          var catId = catQuery[0]._id;
          allQuery["categories"] = catId;
        }
        /**
         * @var filteredQuery
         * Query with variables
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
      var filterLenght = Object.keys(filter).length;
      var sortLenght = Object.keys(sort).length;
      // String to JSON
      var nameQuery = JSON.parse(filter);
      var sortFilter = JSON.parse(sort);
      var families;
      var filteredQuery;
      var status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      var sortJson = {};
      var key = sortFilter[0];
      var val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      var pagination = JSON.parse(range);
      var page = pagination[0];
      var limit = pagination[1];
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
        var qName = nameQuery.name;
        var allQuery = {};
        if (qName) {
          allQuery["name"] = { $regex: qName, $options: "i" };
        }

        /**
         * @var filteredQuery
         * Query with variables
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
      var filterLenght = Object.keys(filter).length;
      var sortLenght = Object.keys(sort).length;
      // String to JSON;
      var sortFilter = JSON.parse(sort);
      var users;
      var filteredQuery;
      var status = "sorted";
      // Parse Sort Query to MongoDB sort ex: sort({key: value})
      var sortJson = {};
      var key = sortFilter[0];
      var val = sortFilter[1];
      sortJson[key] = val;
      // Pagination
      var pagination = JSON.parse(range);
      var page = pagination[0];
      var limit = pagination[1];
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
