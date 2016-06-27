import * as fs from "fs";
import {getGeneratedCode} from "server-bridge";

// get the generated code
const clientSideCode = getGeneratedCode({
    files: ["src/NoteRoutes.ts"],
    classMapping: { "NoteRoutes": "NoteApi" },
    libraryName: "server-bridge-superagent-client"
});
// write it to a file in the client application
fs.writeFile("../client/src/server.ts", clientSideCode);
