import { StatusCodes } from 'http-status-codes';
import { LocationValidator } from '../helper/validator.helper';
import { NextFunction, Request, Response } from 'express';
import ErrorMessage from '../utils/ErrorMessage';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LocationService } from '../routes/location/location.service';

@Injectable()
export class LocationMiddleware implements NestMiddleware {
  private validator: LocationValidator;

  public constructor(
    private readonly locationService: LocationService,
  ) {
    this.validator = new LocationValidator();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.query.ip as string;

    if (!ip || !this.validator.isValidIp(ip)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: ErrorMessage.INVALID_IP });
    }

    if (!this.locationService['dataset'] || this.locationService['dataset'].length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.DATASET_NOT_LOADED });
    }

    next();
  }
}