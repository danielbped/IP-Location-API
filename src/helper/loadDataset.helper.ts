import { Injectable } from '@nestjs/common';
import fs from 'fs';
import readline from 'readline';
import { IpRange } from '../interface/IpRange.interface';

@Injectable()
export class LoadDataset {
  async run(filePath: string): Promise<IpRange[]> {
    const ranges: IpRange[] = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (!line) continue;

      const parts = line.split(',').map(p => p.replace(/"/g, '').trim());

      if (parts.length < 6) continue;

      const lower = parseInt(parts[0]);
      const upper = parseInt(parts[1]);

      if (isNaN(lower) || isNaN(upper)) continue;

      ranges.push({
        lower,
        upper,
        countryCode: parts[2],
        country: parts[3],
        state: parts[4],
        city: parts[5],
      });
    }

    ranges.sort((a, b) => a.lower - b.lower);

    return ranges;
  }
}
