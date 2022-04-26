// import PlayerFactory from './Player';

let takenCoordinates = [];

export function eraseTakenCoordinates() {
  takenCoordinates = [];
}

export function placeAllShips(shipLength) {
  const length = shipLength;
  const horizontal = Math.random() < 0.5;
  const startPosition = Math.floor(Math.random() * 100);
  const shipCoords = [];
  if (horizontal) {
    let reverseAmount = 1;
    for (let i = startPosition; i < startPosition + length; i += 1) {
      if (Math.floor((i) % 10) === 0 || reverseAmount > 1) {
        shipCoords.push(startPosition - reverseAmount);
        reverseAmount += 1;
      } else if (reverseAmount === 1) {
        shipCoords.push(i);
      }
    }
  } else {
    let reverseAmount = 10;
    for (let i = 0; i < length; i += 1) {
      if (startPosition + (i * 10) < 100) {
        shipCoords.push(startPosition + (i * 10));
      } else {
        shipCoords.push(startPosition - reverseAmount);
        reverseAmount += 10;
      }
    }
  }

  let badPosition;
  let shipApproved = false;

  if (takenCoordinates[0] !== undefined) {
    badPosition = takenCoordinates.some((c) => shipCoords.includes(c));
    if (!badPosition) {
      badPosition = takenCoordinates.some((c) => shipCoords.includes(c + 1));
      if (!badPosition) {
        badPosition = takenCoordinates.some((c) => shipCoords.includes(c - 1));
        if (!badPosition) {
          badPosition = takenCoordinates.some((c) => shipCoords.includes(c + 10));
          if (!badPosition) {
            badPosition = takenCoordinates.some((c) => shipCoords.includes(c - 10));
            if (!badPosition) {
              shipApproved = true;
            }
          }
        }
      }
    }
  } else {
    shipApproved = true;
  }

  // console.log(takenCoordinates);

  shipCoords.forEach((coord) => {
    takenCoordinates.push(coord);
    takenCoordinates.push(coord + 1);
    takenCoordinates.push(coord - 1);
    takenCoordinates.push(coord + 10);
    takenCoordinates.push(coord - 10);
  });
  // console.log(takenCoordinates);
  return [shipApproved, shipCoords];
}

// test('place 7 ships at different coordinates', () => {
//   const player = new PlayerFactory('man');
//   const playerBoard = player.getPlayerBoard();
//   const shipLengths = [5, 4, 3, 2, 2, 1, 1];

//   // if (placeAllShips(playerBoard, shipLengths[0])[0] === false) {
//   //   console.log('no duplicate');
//   // }
//   // if (placeAllShips(playerBoard, shipLengths[1])[0] === false) {
//   //   console.log('no duplicate');
//   // }
//   // if (placeAllShips(playerBoard, shipLengths[2])[0] === false) {
//   //   console.log('no duplicate');
//   // }
//   // if (placeAllShips(playerBoard, shipLengths[3])[0] === false) {
//   //   console.log('no duplicate');
//   // }
//   // if (placeAllShips(playerBoard, shipLengths[4])[0] === false) {
//   //   console.log('no duplicate');
//   // }
//   // if (placeAllShips(playerBoard, shipLengths[5])[0] === false) {
//   //   console.log('no duplicate');
//   // }
//   // if (placeAllShips(playerBoard, shipLengths[6])[0] === false) {
//   //   console.log('no duplicate');
//   // }

//   expect(Array.isArray(takenCoordinates)).toBe(true);

//   // expect(placeAllShips(playerBoard, shipLengths[0])).toBe(false);
//   // expect(placeAllShips(playerBoard, shipLengths[1])).toBe(false);
//   // expect(placeAllShips(playerBoard, shipLengths[2])).toBe(false);
//   // expect(placeAllShips(playerBoard, shipLengths[3])).toBe(false);
//   // expect(placeAllShips(playerBoard, shipLengths[4])).toBe(false);
//   // expect(placeAllShips(playerBoard, shipLengths[5])).toBe(false);
//   // expect(placeAllShips(playerBoard, shipLengths[6])).toBe(false);
// });
