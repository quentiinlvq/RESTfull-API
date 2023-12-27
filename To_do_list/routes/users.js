const { Router } = require("express");
const User = require("../models/User");
const checkAuth = require("../middlewares/checkAuth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = new Router();
require('dotenv').config();

const secret = process.env.MDP_JWT;

router.get("/users", checkAuth, async (req, res, next) => {
  if (req.userId) {
    req.query.id = req.userId;
  }
  res.json(
    await User.findAll({
      where: req.query,
    })
  );
});

router.post("/users", checkAuth, async (req, res, next) => {
  try {
    res.status(201).json(await User.create(req.body));
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

// utilisation du rôle admin
router.get("/users", checkAuth, async (req, res, next) => {
  const user = await User.findByPk(parseInt(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }
  if (req.userRole !== "admin" && req.userId !== parseInt(req.params.id)) {
    return res.status(403).json({ message: "Accès non autorisé" });
  }
  res.json(user);
});

router.patch("/users/:id", checkAuth, async (req, res, next) => {
  if (req.userId !== parseInt(req.params.id)) res.sendStatus(403);
  try {
    const result = await User.update(req.body, {
      where: {
        id: parseInt(req.params.id),
      },
      individualHooks: true,
    });
    if (result[0] === 0) {
      res.sendStatus(404);
    } else {
      res.json(await User.findByPk(parseInt(req.params.id)));
    }
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

router.delete("/users/:id", checkAuth, async (req, res, next) => {
  const result = await User.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.sendStatus(result === 0 ? 404 : 204);
});

router.put("/users/:id", async (req, res, next) => {
  try {
    const result = await User.destroy({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res
      .status(result === 1 ? 200 : 201)
      .json(await User.create({ ...req.body, id: parseInt(req.params.id) }));
  } catch (err) {
    res.status(422).json({
      email: err.message,
    });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user)
      res.status(422).json({
        username: "Invalid credentials",
      });
    else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            sub: user.id,
          },
          secret,
          {
            expiresIn: "90 days",
          }
        );
        res.json({
          token,
        });
      } else
        res.status(422).json({
          username: "Invalid credentials",
        });
    }
  } catch (err) {
    res.status(422).json({
      username: err.message,
    });
  }
});



module.exports = router;