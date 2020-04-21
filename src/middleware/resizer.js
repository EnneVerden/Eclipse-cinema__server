const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const toJSON = require("../methods/toJSON");
const InternalServerError = require("../errors/internal-server");

module.exports = (folder) => async (req, res, next) => {
  try {
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      const folderPath = `./uploads/${folder}`;
      const filePath = path.resolve(folderPath, fileName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      await sharp(req.file.buffer)
        .resize(270, 400)
        .jpeg({ quality: 70 })
        .toFile(filePath);

      res.status(201).send(toJSON({ pathToImage: filePath }));
    } else {
      next();
    }
  } catch (error) {
    next(new InternalServerError(error));
  }
};
