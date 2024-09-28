import express from "express";
import {
  IWebServer,
  IWebService,
  morganConfig,
  router,
} from "shared/infrastructure";
import { mongooseErrorHandler } from "../middlewares/MongooseErrorHandler";
const cors = require("cors");

export class ExpressWebServer implements IWebServer {
  init(options: { port: number; services?: IWebService[] }): void {
    this.app.use(cors());
    this.app.use(morganConfig);
    this.app.listen(options.port, () => {
      console.log(`🚀💯 Backend up and running. Port: ${options.port}`);
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get("/", async (req, res) => {
      return res.status(200).send({
        database: "OK",
        cache: "OK",
      });
    });

    this.app.get("/healthcheck", async (req, res) => {
      return res.status(200).send({
        database: "OK",
        cache: "OK",
      });
    });

    this.app.use(router);
    this.app.use(mongooseErrorHandler);
    options?.services?.forEach((service) => {
      this.app.use(service.params.prefixUrl, service.getService());
    });
  }

  private app = express();
}
