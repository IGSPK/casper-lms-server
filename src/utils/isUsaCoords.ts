const isUsaCoords = (lat: number, lon: number): boolean => {
  const boundryLatHigh = 49;
  const boundryLatLow = 14;
  const boundryLonHigh = -47;
  const boundryLonLow = -170;

  const latCheck = lat >= boundryLatLow && lat <= boundryLatHigh;
  const lonCheck = lon >= boundryLonLow && lon <= boundryLonHigh;

  return latCheck && lonCheck;
};

export default isUsaCoords;
