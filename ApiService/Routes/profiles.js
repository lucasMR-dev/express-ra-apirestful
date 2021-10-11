const express = require("express");
const Profile = require("../Models/Profile");
const multer = require("multer");
const fs = require("fs");

// Multer Middleware Config
const storageMiddleware = multer.diskStorage({
  destination: async function (req, file, callback) {
    var path = "./Public/profiles";
    var dirChk = fs.existsSync(path);
    if (!dirChk) {
      await fs.mkdirSync(path);
    }
    callback(null, path);
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  },
});

// File Type Config
const fileExtensionFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

// Init Multer
const upload = multer({
  storage: storageMiddleware,
  limits: {
    fileSize: 1024 * 1024 * 7,
  },
  fileFilter: fileExtensionFilter,
});

// Router Export
const router = express.Router();

/**
 * PROFILE ROUTES
 */

// Get User Profile
router.get("/:id", async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id });
    res.json(profile);
    res.end();
    next();
  } catch (err) {
    return next(err.message);
  }
});

// Profile
router.patch("", upload.single("imageprofile"), async (req, res, next) => {
  const body = req.body;
  const uploading = req.file;
  const id = body.user;
  // Check FormData image is provided if not update parameters passed only
  if (uploading) {
    const path = uploading.filename;
    const data = { body, path };
    try {
      const updateProfile = await Profile.findOneAndUpdate({ user: id }, data, {
        new: true,
      });
      res.status(201);
      res.send(updateProfile);
      res.end();
      next();
    } catch (err) {
      return next(err.message);
    }
  } else {
    try {
      const updateProfile = await Profile.findOneAndUpdate({ user: id }, body, {
        new: true,
      });
      res.send(updateProfile);
      res.end();
      next();
    } catch (err) {
      return next(err.message);
    }
  }
});

module.exports = router;
