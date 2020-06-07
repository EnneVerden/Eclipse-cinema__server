const cloudinary = require("cloudinary").v2;
const DataUri = require("datauri/parser");
const InternalServerError = require("../errors/internal-server");

const dataUri = new DataUri();

module.exports = (folder) => async (req, res, next) => {
  try {
    if (req.file) {
      const image = dataUri.format(".png", req.file.buffer).content;

      const result = await cloudinary.uploader.upload(image, {
        overwrite: true,
        folder,
        public_id: req.user._id,
      });

      req.file.path = result.url;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(new InternalServerError(error));
  }
};
