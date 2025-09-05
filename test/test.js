import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

const ipDataset = new SharedArray('ipDataset', () =>
  JSON.parse(open('./ips.json'))
);

export default function () {
  const ipData = ipDataset[Math.floor(Math.random() * ipDataset.length)];

  const res = http.get(`http://localhost:3000/ip/location/${ipData.ip}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has countryCode': (r) => r.json()?.countryCode === ipData.countryCode,
  });

  sleep(1);
}
