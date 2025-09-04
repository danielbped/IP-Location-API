import { StatusCodes } from 'http-status-codes';
import { LocationValidator } from '../helper/validator.helper';
import { NextFunction, Request, Response } from 'express';
import ErrorMessage from '../utils/ErrorMessage';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Location from '../entity/location.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationMiddleware implements NestMiddleware {
  private validator: LocationValidator;

  public constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    this.validator = new LocationValidator();
  }

  async use(req: Request, res: Response, next: NextFunction) {
    next()
  }
}