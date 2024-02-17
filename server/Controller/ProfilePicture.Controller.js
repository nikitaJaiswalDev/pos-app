const createError = require("http-errors");
const ProfilePictureService = require("../Services/ProfilePicture");

exports.createProPic = async (req, res, next) => {
  try {
    const picture = await ProfilePictureService.createProPic({
        name: req.file.originalname,
        image: req.file.buffer,
    });
    res.json({ message: "Image uploaded successfully!", status: "success" });
  } catch (err) {
    next(err)
  }
};

exports.getProPicById = async (req, res, next) => {
  try {
    const picture = await ProfilePictureService.getProPicById(req.params.id);
    if(!picture) throw createError.NotFound()
    res.json({ data: picture, status: "success" });
  } catch (err) {
    next(err)
  }
};
