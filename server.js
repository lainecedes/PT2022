const express = require("express"); // express
const { engine } = require("express-handlebars"); // express-handlebars
const chalk = require("chalk"); // chalk, for better view in terminal
const path = require("path"); // path
const fetch = require("node-fetch"); // node-fetch for API
const app = express();
const multer = require("multer"); // multer
const upload = multer();

const port = process.env.PORT || 1337; // port

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true })); // parses form data
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// dotenv configuration and MongoDB connection

require("dotenv").config({ path: ".env" }); // dotenv

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client
  .connect()
  .then((res) => console.log("@@-- connection established", res))
  .catch((err) => console.log("@@-- error", err));

// Connection of the database and its collection
const radianceDatabase = client.db("radiance");
const collection = radianceDatabase.collection("user");

// Radiance Homepage
app.get("/", (req, res) => {
  let quote;
  let options = {
    method: "GET",
    headers: { "x-api-key": process.env.API_KEY },
  };
  let url = "https://api.api-ninjas.com/v1/quotes?category=beauty";

  fetch(url, options) // fetch is async but api is await, fixed issue where data wasn't seen in view (source: Ivo Nijhuis)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      quote = data;
      console.log(quote);
      res.render("home.hbs", {
        title: "Radiance - Home",
        quote: quote[0].quote,
        author: quote[0].author,
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});

// Page where you can add a profile with a form
app.get("/add-profile", (req, res) => {
  res.render("add-profile.hbs", { title: "Radiance - Add your profile" });
});

// Page where confirmation of added profile is shown
app.post("/add-profile-success", upload.any(), async (req, res) => {
  let newProfile;
  res.render("add-profile-success.hbs", {
    title: "Radiance - Profile added!",
    data: newProfile,
  });
  newProfile = collection.insertOne(req.body);
  console.log(req.body);
});

// Page where you can select (multiple) filters
app.get("/filter-page", (req, res) => {
  res.render("filter-page.hbs", { title: "Radiance - Filter" });
});

// Page where filtered results are shown
app.post("/filter-results", async (req, res) => {
  const radianceUser = await collection
    .find({
      gender: req.body.gender,
    })
    .toArray();

  // {skinType:req.body.skinType}
  // {skinCare:req.body.skinCare}

  console.log(radianceUser);

  res.render("filter-results.hbs", {
    data: radianceUser,
    title: "Radiance - Results",
  });
});

app.use((req, res) => {
  // error handler, style in css
  res.status(404);
  res.render("404.hbs", { title: "Radiance - 404 page not found" });
});

// Port connection
app.listen(port, () => {
  console.log(chalk.magenta(`Running on port: ${port}`));
});
