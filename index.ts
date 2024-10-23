import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import express from "express";
import bodyParser from "body-parser";

import root from "./src/graphql/resolver";

import { mergeSchemas } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";

import { schemaCampaign, schemaLeaderboard } from "./src/graphql/schema";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "../public")));

const schema = mergeSchemas({
  schemas: [schemaCampaign, schemaLeaderboard],
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(Number(process.env.PORT), () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}/graphql`
  );
});
