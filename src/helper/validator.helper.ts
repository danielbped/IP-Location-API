import ipToId from './ipToId.helper';
import { IpRange } from '../interface/IpRange.interface';

export class LocationValidator {
  isValidIp(ip: string): boolean {
    return ipToId(ip) !== null;
  }

  isDatasetLoaded(dataset: IpRange[]): boolean {
    return Array.isArray(dataset) && dataset.length > 0;
  }
}