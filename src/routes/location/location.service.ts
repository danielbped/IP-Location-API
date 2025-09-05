import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { LoadDataset } from '../../helper/loadDataset.helper';
import ipToId from '../../helper/ipToId.helper';
import { FindLocation } from '../../helper/findLocation.helper';
import { IpRange } from '../../interface/IpRange.interface';
import * as path from 'path';
import ErrorMessage from '../../utils/ErrorMessage';

@Injectable()
export class LocationService implements OnModuleInit {
  private dataset: IpRange[] = [];

  constructor(
    private readonly loadDataset: LoadDataset,
    private readonly findLocation: FindLocation,
  ) {}

  async onModuleInit() {
    console.log('Loading dataset...');
    const datasetPath = path.join(__dirname, '../../assets/ip2location.csv');
    this.dataset = await this.loadDataset.run(datasetPath);
    console.log(`Dataset loaded with ${this.dataset.length} rows`);
  }

  async findLocationByIp(ip: string): Promise<IpRange | null> {
    const ipId = ipToId(ip);

    const result = this.findLocation.run(ipId, this.dataset);
    if (!result) {
      throw new NotFoundException(ErrorMessage.LOCATION_NOT_FOUND);
    }

    return result;
  }
}
