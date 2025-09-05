import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 100 },
    { duration: '10s', target: 0 },
  ],
};

const ipDataset = [
  { ip: "1.0.170.0", countryCode: "TH" },
  { ip: "8.8.8.8", countryCode: "US" },
  { ip: "200.147.67.0", countryCode: "BR" },
  { ip: "203.0.113.25", countryCode: "-" },
  { ip: "5.135.12.0", countryCode: "FR" },
];

export default function () {
  const ipData = ipDataset[Math.floor(Math.random() * ipDataset.length)];

  const res = http.get(`http://localhost:3000/ip/location/${ipData.ip}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has countryCode': (r) => r.json()?.countryCode === ipData.countryCode,
  });

  sleep(1);
}
