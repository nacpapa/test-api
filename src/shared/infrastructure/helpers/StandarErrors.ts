import { NextFunction, Response } from 'express';
import {
  InvalidArgumentError,
  InvalidForeingKeyError,
  RepositoryIsUndefError,
} from 'shared/domain';
import {
  AlreadyExistError,
  ConsistencyError,
  Environment,
  OverlapError,
  ResourceNotFound,
  ServerError,
  SystemError,
  VerificationFailed,
} from 'shared/infrastructure';
import { ZodError } from 'zod';

export class StandarErrors {
  static catch(error: Error, res: Response, next: NextFunction): void {
    if (error instanceof InvalidArgumentError) {
      res.status(400).json({
        message: error.message,
      });
    } else if (error instanceof ResourceNotFound) {
      res.status(404).json({
        message: error.message || error.defaultMessage,
      });
    } else if (error instanceof AlreadyExistError) {
      res.status(403).json({
        message: error.message || error.defaultMessage,
      });
    } else if (error instanceof ConsistencyError) {
      res.status(500).json({
        message: error.message || error.defaultMessage,
      });
    } else if (error instanceof SystemError) {
      res.status(500).json({
        message: error.message,
      });
    } else if (error instanceof InvalidForeingKeyError) {
      res.status(500).json({
        message: error.message,
      });
    } else if (error instanceof VerificationFailed) {
      res.status(500).json({
        message: error.message,
      });
    } else if (error instanceof OverlapError) {
      res.status(500).json({
        message: error.message,
      });
    } else if (error instanceof RepositoryIsUndefError) {
      res.status(500).json({
        message: error.message,
      });
    } else if (error instanceof ZodError) {
      console.log('**************************************');
      console.log(error.flatten());
      res.status(400).json({
        message: error.flatten().formErrors[0],
      });
    } else if (error instanceof ServerError) {
      console.log('**************************************');
      console.log('WARNING: No identified error');
      console.log('**************************************');
      console.log(error.name ? error.name : 'No error name');
      console.log(error.message ? error.message : 'No error message');
      console.log('**************************************');

      res.status(500).json({
        message: error.defaultMessage,
      });
    } else {
      next(error);
    }
  }
}
