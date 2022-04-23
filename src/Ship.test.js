function ShipFactory() {
  let length;
  const coordinates = [];
  const hitSpots = [];

  function setCoordinates(arr) {
    length = arr.length;
    arr.forEach((a) => {
      coordinates.push(a);
      hitSpots.push(false);
    });
  }

  function getCoordinates() {
    return coordinates;
  }

  function getHitSpots() {
    return hitSpots;
  }

  function hit(num) {
    hitSpots[num] = true;
  }

  function isSunk() {
    if (hitSpots.every((x) => x === true)) {
      return true;
    }
    return false;
  }

  return {
    length,
    setCoordinates,
    getCoordinates,
    getHitSpots,
    hit,
    isSunk,
  };
}

export default ShipFactory;

test('check if new ship is an object', () => {
  const ship = new ShipFactory();
  expect(typeof ship).toBe('object');
});

test('make a new ship of length 5', () => {
  const ship = new ShipFactory();
  ship.length = 5;
  expect(ship.length).toEqual(5);
});

test('set coordinates of a ship and check that hitspots is also set', () => {
  const ship = new ShipFactory();
  ship.setCoordinates([0, 1, 2]);
  const results = ship.getCoordinates();
  expect(results).toEqual([0, 1, 2]);
  expect(ship.getHitSpots()).toEqual([false, false, false]);
});

test('make a new ship at coordinates 0, 1, 2 and mark it as hit at positions 1 and 2', () => {
  const ship = new ShipFactory();
  ship.setCoordinates([0, 1, 2]);
  ship.hit(1);
  ship.hit(2);
  expect([ship.getHitSpots()[1], ship.getHitSpots()[2]]).toEqual([true, true]);
});

test('a ship at coordinates 0, 1, 2 can be sunk with 3 calls to hit function', () => {
  const ship = new ShipFactory();
  ship.setCoordinates([0, 1, 2]);
  expect(ship.getHitSpots()).toEqual([false, false, false]);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.getHitSpots()).toEqual([true, true, true]);
  expect(ship.isSunk()).toEqual(true);
});
