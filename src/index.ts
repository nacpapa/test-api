import { Environment, ExpressWebServer } from "shared/infrastructure";

const server = new ExpressWebServer();
console.log("test");

server.init({
  port: Environment.PORT || 3000,
  services: [],
});
