import { Injectable } from "@nestjs/common";
import { IpRange } from "../interface/IpRange.interface";

@Injectable()
export class FindLocation {
  run(ipId: number, ranges: IpRange[], version: string): IpRange | null {
    const searchMethod = this.getVersionOffset(version);
    return searchMethod(ipId, ranges);
  }

  private getVersionOffset(version: string): Function {
    switch (version) {
      case 'v1':
        return this.findLocationLinearSearch;
      case 'v2':
        return this.findLocationBinarySearch;
      default:
        throw new Error('Unsupported version');
    }
  }

  private findLocationLinearSearch(ipId: number, ranges: IpRange[]): IpRange | null {
    return ranges.find(range => ipId >= range.lower && ipId <= range.upper) || null;
  }

  private findLocationBinarySearch(ipId: number, ranges: IpRange[]): IpRange | null {
    let left = 0;
    let right = ranges.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const range = ranges[mid];

      if (ipId < range.lower) right = mid - 1;
      else if (ipId > range.upper) left = mid + 1;
      else return range;
    }

    return null;
  }
}
