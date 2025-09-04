export default (ip: string): number => {
  const ipParts = ip.split('.');
  let ipId = 0;
  for (let index = 0; index < ipParts.length; index++) {
    const element = parseInt(ipParts[index]);
    if (index === 0) ipId += 16777216 * element;
    if (index === 1) ipId += 65536 * element;
    if (index === 2) ipId += 256 * element;
    if (index === 3) ipId += element;
  }
  return ipId;
}
