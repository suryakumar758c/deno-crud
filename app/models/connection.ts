import { Database, MySQLConnector, MongoDBConnector } from "../../deps.ts";

// const connector = new MySQLConnector({
//   host: Deno.env.get("MYSQL_HOST") as string,
//   port: Number(Deno.env.get("MYSQL_PORT")),
//   username: Deno.env.get("MYSQL_USERNAME") as string,
//   password: Deno.env.get("MYSQL_PASSWORD") as string,
//   database: Deno.env.get("MYSQL_DATABASE") as string,
// });

const connector = new MongoDBConnector({
  uri: Deno.env.get("MONGO_URI") as string,
  database: Deno.env.get("MONGO_DATABASE") as string,
});

const connection = new Database(connector);

export default connection;
