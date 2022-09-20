import isUsaCoords from './isUsaCoords';

describe('Test Usa Cooords', () => {
  test('miami coords 25.7617 -80.1918 to be in usa', () => {
    expect(isUsaCoords(25.7617, -80.1918)).toBe(true);
  });

  test('miami coords 27.6648° N, 81.5158° W to be in usa', () => {
    expect(isUsaCoords(27.6648, -81.5158)).toBe(true);
  });

  test('multan coords 30.1575° N, 71.5249° E to not be in usa', () => {
    expect(isUsaCoords(30.1575, 71.5249)).toBe(false);
  });
});
