import { IWebServiceParams } from './interfaces/IWebServiceParams';

export interface IWebService {
  getService: Function;
  params: IWebServiceParams;
}
