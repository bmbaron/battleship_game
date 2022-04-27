function ShipFactory() {
  let length;
  const coordinates = [];
  const hitSpots = [];

  function getLength() {
    return length;
  }

  function getName(len) {
    let shipName;
    switch (len) {
      case 5:
        shipName = 'carrier';
        break;
      case 4:
        shipName = 'battleship';
        break;
      case 3:
        shipName = 'submarine';
        break;
      case 2:
        shipName = 'patrol boat';
        break;
      case 1:
        shipName = 'jet ski';
        break;
      default:
        break;
    }
    return shipName;
  }
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
    getLength,
    getName,
    setCoordinates,
    getCoordinates,
    getHitSpots,
    hit,
    isSunk,
  };
}

export default ShipFactory;
