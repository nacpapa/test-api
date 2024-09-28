import { Request, Response } from "express";
import { version } from "version";

export const getVersion = (req: Request, res: Response) => {
  return res.status(200).json({ version: version });
};
