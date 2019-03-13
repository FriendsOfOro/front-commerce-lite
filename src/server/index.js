import express from "express";
import cors from "cors";
import withGraphQLApi from "./express/withGraphQLApi";

require("dotenv").config({ silent: true });

const config = {
  host: process.env.FRONT_COMMERCE_HOST || "0.0.0.0",
  port: process.env.FRONT_COMMERCE_PORT || process.env.VIRTUAL_PORT || 4000
};

async function start() {
  const app = express();

  app.use(
    cors({
      origin: "*"
    })
  );
  app.use(await withGraphQLApi(require("./modules").default));
  app.use(express.static("build/client"));

  const server = app.listen(config.port, config.host, undefined, () => {
    /* eslint-disable no-console */
    console.log(
      `GraphQL server started. Listening on ${config.host}:${config.port}...`
    );
    /* eslint-enable no-console */

    const shutdown = function() {
      server.close(function() {
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  });
}

start();
