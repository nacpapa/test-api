import { IWebService } from './IWebService';

export interface IWebServer {
  init(options: { port: number; services: IWebService[] }): void;
}
