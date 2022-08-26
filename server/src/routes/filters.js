const { Router } = require("express");
const { filtro } = require("../utils/controllers/filters.js");
const verifyToken = require("../utils/middlewares/validateToken.js");

const router = Router();

router.get("/filters", verifyToken, async (req, res, next) => {
  let {
    age,
    creation_date,
    vaccinated,
    castrated,
    location,
    pet_type,
    pet_size,
    gender,
  } = req.query;
  try {
    const filter = await filtro(
      age,
      creation_date,
      vaccinated,
      castrated,
      location,
      pet_type,
      pet_size,
      gender
    );
    res.status(200).send(filter);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
