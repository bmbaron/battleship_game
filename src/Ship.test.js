function Ship() {
  const length = 0;
  const hitSpots = [];

  function hit(num) {
    if (!hitSpots.includes(num) && num > 0 && num <= this.length) {
      hitSpots.push(num);
    }
  }

  function isSunk() {
    if (hitSpots.length === this.length) {
      return 1;
    }
    return 0;
  }

  return {
    length,
    hitSpots,
    hit,
    isSunk,
  };
}

export default Ship;

test('check if new ship is an object', () => {
  const ship = new Ship();
  expect(typeof ship).toBe('object');
});

test('make a new ship of length 5', () => {
  const ship = new Ship();
  ship.length = 5;
  expect(ship.length).toEqual(5);
});

test('make a new ship but do not specify length', () => {
  const ship = new Ship();
  expect(ship.length).toEqual(0);
});

test('make a new ship of length 5 and mark it as hit at positions 3 and 4', () => {
  const ship = new Ship();
  ship.length = 5;
  ship.hit(3);
  ship.hit(4);
  expect([ship.hitSpots[0], ship.hitSpots[1]]).toEqual([3, 4]);
});

test('making a ship with two hits in the same position will only log 1 hit', () => {
  const ship = new Ship();
  ship.length = 5;
  ship.hit(3);
  ship.hit(3);
  expect([ship.hitSpots[0], ship.hitSpots[1]]).toEqual([3, undefined]);
});

test('a ship of length 3 can be sunk with 3 calls to hit function', () => {
  const ship = new Ship();
  ship.length = 3;
  ship.hit(1);
  ship.hit(2);
  ship.hit(3);
  expect(ship.isSunk()).toEqual(1);
});
