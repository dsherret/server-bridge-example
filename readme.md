# server-bridge-example

This is an example of [server-bridge](https://github.com/dsherret/server-bridge) in action.

* `server/src/NoteRoutes.ts` - Defines the routes for notes.
* `server/src/index.ts` - Configures the server with `express` and defines the routes.
* `server/src/generateClientSideCode.ts` - Used by `npm run build` to generate the client-side code.

* `client/src/server.ts` - The generated code.
* `client/src/main.ts` - The client code that uses the generated code.

## Setup

Run `npm install` in both the *client* and *server* folders. Make sure port `8082` is open on your local computer.

## Run

1. Start the server by calling:

    ```
    npm start
    ```

    In the *server* folder.

2. Start the client by calling:

    ```
    npm start
    ```
    
    In the *client* folder.

Then follow the prompts in the client application.

## Generating the client-side code

Run `npm run build` in the server application.