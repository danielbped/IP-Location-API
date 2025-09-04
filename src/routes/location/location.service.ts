import { Injectable, OnModuleInit } from '@nestjs/common';
import ErrorMessage from '../../utils/ErrorMessage';
import { LoadDataset } from 'src/helper/loadDataset.helper';
import ipToId from 'src/helper/ipToId.helper';
import { FindLocation } from 'src/helper/findLocation.helper';
import { IpRange } from 'src/interface/IpRange.interface';
import * as path from 'path';

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
    if (!this.dataset || this.dataset.length === 0) {
      throw new Error(ErrorMessage.DATASET_NOT_LOADED);
    }

    const ipId = ipToId(ip);

    if (ipId === null) {
      throw new Error(ErrorMessage.INVALID_IP);
    }

    const result = this.findLocation.run(ipId, this.dataset);
    if (!result) {
      throw new Error(ErrorMessage.LOCATION_NOT_FOUND);
    }

    return result;
  }
}
