function ShipFactory() {
  let length;
  const coordinates = [];
  const hitSpots = [];

  function setCoordinates(arr) {
    length = arr.length;
    arr.forEach((a) => {
      coordinates.push(a);
      hitSpots.push(a);
    });
  }

  function getCoordinates() {
    return coordinates;
  }

  function getHitSpots() {
    return hitSpots;
  }

  function hit(num) {
    const x = hitSpots.indexOf(num);
    hitSpots[x] = true;
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
