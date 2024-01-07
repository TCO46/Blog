import express, { Express, Request, Response } from "express";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import path from "path";
import Database from "./config/index";
import { route } from "./routes/index";

const app: Express = express();
const port: number = 3000;

// connect to database
const db = new Database();
db.connect();

// setup express
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

// set ejs view engine
app.use(expressLayouts);
app.set("layout", "./layout/layout");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// route
app.get("/", (req, res) => {
	res.redirect("/home");
});
route(app);

// app listen
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
