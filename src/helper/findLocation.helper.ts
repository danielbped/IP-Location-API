import { Injectable } from "@nestjs/common";
import { IpRange } from "src/interface/IpRange.interface";

@Injectable()
export class FindLocation {
  run(ipId: number, ranges: IpRange[]): IpRange | null {
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
