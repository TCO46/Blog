import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import Database from "./config/index";
import { route } from "./routes/index";

const app: Express = express();
const port: number = 3000;

//connect to database
const db = new Database();
db.connect();

//setup express
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

//route
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World");
});
route(app);

//app listen
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
