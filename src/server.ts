// import { Server } from "http";
import app from "./app";

import mongoose from "mongoose";
import config from "./app/config";

// let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Database Connected Successfulllllllly")
    app.listen(config.port, () => {
     console.log(`🚀 Application is running on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();


