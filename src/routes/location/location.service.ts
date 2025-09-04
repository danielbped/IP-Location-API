import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ErrorMessage from '../../utils/ErrorMessage';
import Location from '../../entity/location.entity';

@Injectable()
export class LocationService {
    constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    async function findLocationByIp(ip: string): Promise<Location | null> {
      return null
    }
  }
}