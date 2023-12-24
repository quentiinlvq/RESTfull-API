const express = require("express");
const checkAuth = require("./middlewares/checkAuth");
require('./models/db');


const UsersRouter = require("./routes/users");
const TachesRouter = require("./routes/taches");
const ListeTachesRouter = require("./routes/listetaches");
const CommentairesRouter = require("./routes/commentaires");
const AssignationsRouter = require("./routes/assignations");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello world");
});

app.post("/", (req, res, next) => {
  res.send("Hello world from POST : " + JSON.stringify(req.body));
});

app.put("/", (req, res, next) => {
  res.send("Hello world from PUT : " + JSON.stringify(req.body));
});

app.use(UsersRouter);
app.use(TachesRouter);
app.use(ListeTachesRouter);
app.use(CommentairesRouter);
app.use(AssignationsRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});