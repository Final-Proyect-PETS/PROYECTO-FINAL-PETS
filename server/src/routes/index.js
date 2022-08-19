const connection = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require("express");
const Pets = require("../models/pets");
const User = require("../models/users");
const router = Router();

router.get("/pets", async (req, res, next) => {
  const name = req.query.name;
  try {
    connection();
    console.log("conectado");
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayPets = await Pets.find().populate("user");
    ///CAMBIE LOGICA,EN VEZ DE === USE .INCLUDES y || para mas placer
    if (name) {
      let petFound = arrayPets.filter(
        (p) =>
          p.name.toLowerCase().includes(name.toLowerCase()) ||
          p.place.toLowerCase().includes(name.toLowerCase()) ||
          p.type.toLowerCase().includes(name.toLowerCase()) ||
          p.age.toString().includes(name)
      );
      if (petFound.length) res.send(petFound);
      else res.send(arrayPets);
    } else {
      res.send(arrayPets);
    }
  } catch (error) {
    next(error);
  }
});
router.get("/users", async (req, res, next) => {
  const name = req.query.name;
  try {
    connection();
    console.log("conectado a users");
  } catch (err) {
    console.error(err);
  }
  try {
    const arrayUsers = await User.find().populate("pets");
    if (name) {
      //LOGICA CAMBIADO CON .INCLUDES Y || PARA MAS PLACERR
      let userFound = arrayUsers.filter(
        (u) =>
          u.username.toLowerCase().includes(name.toLowerCase()) ||
          u.first_name.toLowerCase().includes(name.toLowerCase()) ||
          u.last_name.toLowerCase().includes(name.toLowerCase())
      );
      if (userFound.length) res.send(userFound);
      else {
        userFound = arrayUsers.filter((u) => u.email === name);
        if (userFound.length) res.send(userFound);
        else {
          userFound = arrayUsers.filter(
            (u) => u.first_name.toLowerCase() === name.toLowerCase()
          );
          if (userFound.length) res.send(userFound);
          else {
            userFound = arrayUsers.filter(
              (u) => u.last_name.toLowerCase() === name.toLowerCase()
            );
            if (userFound.length) res.send(userFound);
            else res.send(["User not found"]);
          }
        }
      }
    } else {
      res.send(arrayUsers);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/users", (req, res, next) => {
  try {
    const post = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
      telephone: req.body.telephone,
      about: req.body.about,

      pets: req.body.pets,
    });

    post.save().then((per) => res.json(per));
  } catch (error) {
    next(error);
  }
});
router.get("/users/:id", async (req, res, next) => {
  try {
    connection();
    console.log("conectado a users id");
  } catch (err) {
    next(err);
  }
  try {
    const arrayUsers = await User.findById(req.params.id).populate("pets");
    res.send(arrayUsers);
  } catch (error) {
    next(error);
  }
});
router.get("/pets/:id", async (req, res, next) => {
  try {
    connection();
    next("conectado a pets id");
  } catch (err) {
    next(err);
  }
  try {
    const arrayPets = await Pets.findById(req.params.id).populate("user");
    res.send(arrayPets);
  } catch (error) {
    next(error);
  }
});

router.post("/pets/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const {
    name,
    image,
    type,
    description,
    size,
    age,
    vaccination,
    castrated,
    place,
  } = req.body;

  try {
    connection();
    console.log("conectado a users");
  } catch (error) {
    next(error);
  }

  try {
    const foundUser = await User.findById(id);

    const newPet = new Pets({
      name,
      image,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
      user: foundUser._id,
    });
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
});

router.get("/filterBySize", async (req, res, next) => {
  try {
    let { size } = req.query;
    if (size === "big") {
      connection();
      const pet = await Pets.find({ size: "big" });
      res.send(pet);
    }
    if (size === "medium") {
      connection();
      const pet2 = await Pets.find({ size: "medium" });
      res.send(pet2);
    }
    if (size === "small") {
      connection();
      const pet3 = await Pets.find({ size: "small" });
      res.send(pet3);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/filterByType", async (req, res, next) => {
  try {
    let { type } = req.query;
    if (type === "dog") {
      connection();
      const dog = await Pets.find({ type: "dog" });
      res.send(dog);
    }

    if (type === "cat") {
      connection();
      const cat = await Pets.find({ type: "cat" });
      res.send(cat);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/bySortAge", async (req, res, next) => {
  try {
    connection();
    const asc = await Pets.find().sort({ age: 1 });
    res.send(asc);
  } catch (error) {
    next(error);
  }
});

router.get("/bySortAge2", async (req, res, next) => {
  try {
    connection();
    const desc = await Pets.find().sort({ age: -1 });
    res.send(desc);
  } catch (error) {
    console.error(error);
  }
}),
  router.post("/pets/:id", async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const {
      name,
      image,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
    } = req.body;

    try {
      connection();
      console.log("conectado a users");
    } catch (err) {
      console.error(err);
    }

    try {
      const foundUser = await User.findById(id); //valido que el id que me pasan del front por params exista en mi db

      const newPet = new Pets({
        name,
        image,
        type,
        description,
        size,
        age,
        vaccination,
        castrated,
        place,
        user: foundUser._id,
      });
      const savedPet = await newPet.save();
      foundUser.pets = foundUser.pets.concat(savedPet._id);
      await foundUser.save();
      res.status(201).json(newPet);
    } catch (error) {
      next(error);
    }
  });

router.patch("/pets/:id", async (req, res) => {
  const {
    name,
    image,
    type,
    description,
    size,
    age,
    vaccination,
    castrated,
    place,
  } = req.body;
  try {
    const onePet = await Pets.findOne({
      _id: req.params.id,
    });
    await onePet.update({
      name,
      image,
      type,
      description,
      size,
      age,
      vaccination,
      castrated,
      place,
    });
    res
      .status(200)
      .json("Los Datos de Tu Mascota se actualizaron exitosamente 🐶 ");
  } catch (error) {
    next(error);
  }
});

router.get("/filterByVaccination", async (req, res, next) => {
  try {
    let { vaccination } = req.query;
    if (vaccination === "yes") {
      connection();
      const yes = await Pets.find({ vaccination: "yes" });
      res.send(yes);
    }
    if (vaccination === "no") {
      connection();
      const no = await Pets.find({ vaccination: "no" });
      res.send(no);
    }
    if (vaccination === "unknown") {
      connection();
      const unknown = await Pets.find({ vaccination: "unknown" });
      res.send(unknown);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/filterByCastrated", async (req, res, next) => {
  try {
    let { castrated } = req.query;
    if (castrated === "true") {
      connection();
      const yes = await Pets.find({ castrated: true });
      res.send(yes);
    }
    if (castrated === "false") {
      connection();
      const no = await Pets.find({ castrated: false });
      res.send(no);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/filterByPlace", async (req, res, next) => {
  let { place } = req.body;
  try {
    connection();
    const pet = await Pets.find({ place: place });
    res.send(pet);
  } catch (error) {
    next(error);
  }
});

router.get("/filterByAge", async (req, res, next) => {
  let { age } = req.query;
  try {
    let pet;
    connection();
    if (age === "young") {
      pet = await Pets.find({ age: { $lt: 6 } });
      res.send(pet);
    }
    if (age === "adult") {
      pet = await Pets.find({ age: { $gt: 5, $lt: 10 } });
      res.send(pet);
    }
    if (age === "old") {
      pet = await Pets.find({ age: { $gt: 9 } });
      res.send(pet);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/bySortDate", async (req, res, next) => {
    try{
        connection()
        const desc = await Pets.find().sort({ createdAt: -1 })
        res.send(desc)
    } catch(error){
        next(error)
    }
})

router.get("/bySortDate2", async (req, res, next) => {
    try{
        connection()
        const asc = await Pets.find().sort({ createdAt: 1 })
        res.send(asc)
    } catch(error){
        next(error)
    }
})

router.get("/filters", async (req, res, next) => {
    try {
        connection()
        let { age, creation_date, vaccinated, castrated, location, pet_type, pet_size, pet_age } = req.query 
        let all = await Pets.find().populate("user")
        
        if (age === "young") {
            all = all.filter(ev => ev.age < 6)
        }
        if (age === "adult") {
            all = all.filter(ev => ev.age > 5 && ev.age < 10)
        }
        if (age === "old") {
            all = all.filter(ev => ev.age > 9)
        }
        if (castrated === "true") {
            all = all.filter(ev => ev.castrated === true)
        } 
         if (castrated === "false") {
            all = all.filter(ev => ev.castrated === false)
        } 
        if (pet_size === "big") {
            all = all.filter(ev => ev.size === "big")
        }
        if (pet_size === "medium") {
            all = all.filter(ev => ev.size === "medium")
        } 
        if (pet_size === "small") {
            all = all.filter(ev => ev.size === "small")
        }  
        if (pet_type === "cat") {
            all = all.filter(ev => ev.type === "cat")
        }
        if (pet_type === "dog") {
            all = all.filter(ev => ev.type === "dog")
        }
        if (vaccinated === "yes") {
            all = all.filter(ev => ev.vaccination === "yes")
        }
        if (vaccinated === "no") {
            all = all.filter(ev => ev.vaccination === "no")
        }
        if (vaccinated === "unknown") {
            all = all.filter(ev => ev.vaccination === "unknown")
        }
        if (pet_age === "asc") {
            all = all.sort((a, b) => a.age - b.age)
        }
        if (pet_age === "desc") {
            all = all.sort((a, b) => b.age - a.age)
        }
        if (creation_date === "asc") {
            all = all.sort((a, b) => a.createdAt - b.createdAt)
        }
        if (creation_date === "desc") {
            all = all.sort((a, b) => b.createdAt - a.createdAt)
        }
        
        res.send(all)

    }catch(error){
        next(error)
    }
})
module.exports = router;
