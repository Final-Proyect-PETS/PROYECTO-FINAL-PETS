const { Router } = require("express");
const { postPet } = require("../utils/controllers/posts");
const verifyToken = require("../utils/middlewares/validateToken");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const router = Router();

router.post("/pets/:id", verifyToken, async (req, res, next) => {
  const _id = req.params.id;
  const {
    name,
    image,
    imagePool,
    type,
    description,
    size,
    age,
    vaccination,
    castrated,
    place,
    gender,
  } = req.body;
  try {
    const newPet = postPet(
      _id,
      name,
      image,
      imagePool,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
      gender,
    );
    res.status(201).send(newPet);
  } catch (error) {
    console.error(error);
  }
});

router.post("/images", upload.single("file"), async (req, res, next) => {
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.status(201).json(result.secure_url);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
