import * as express from "express";
import * as bodyParser from "body-parser";
import {initializeRoutes} from "server-bridge-express";
import {NoteRoutes} from "./NoteRoutes";

const SERVER_PORT = 8082;
const app = express();
const router = express.Router();

initializeRoutes(router, [NoteRoutes]);
app.use(bodyParser.json());
app.use("/", router);

const server = app.listen(SERVER_PORT, () => {
    console.log(`Running on port ${server.address().port}`);
});
