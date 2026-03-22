import mongoose from "mongoose";
import { app } from "./app.js";

const serviceName = "Tickets";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to ${serviceName} MongoDB`);

    app.listen(process.env.PORT, () => {
      console.log(
        `${serviceName} service listening on port ${process.env.PORT}`,
      );
    });
  } catch (error) {
    console.error(`Failed to connect to ${serviceName} MongoDB`, error);
  }
};

start();
