export class Position {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(x: number, y: number, z: number): boolean {
    return this.x == x && this.y == y && this.z == z;
  }

  equalsObj(pos: Position) {
    return this.x == pos.x && this.y == pos.y && this.z == pos.z;
  } 
}

export const WIN_POSITIONS = [
  // layer 0
  [ new Position(0, 0, 0), new Position(0, 0, 1), new Position(0, 0, 2) ],
  [ new Position(1, 0, 0), new Position(1, 0, 1), new Position(1, 0, 2) ],
  [ new Position(2, 0, 0), new Position(2, 0, 1), new Position(2, 0, 2) ],

  [ new Position(0, 0, 0), new Position(1, 0, 0), new Position(2, 0, 0) ],
  [ new Position(0, 0, 1), new Position(1, 0, 1), new Position(2, 0, 1) ],
  [ new Position(0, 0, 2), new Position(1, 0, 2), new Position(2, 0, 2) ],

  [ new Position(0, 0, 0), new Position(1, 0, 1), new Position(2, 0, 2) ],
  [ new Position(0, 0, 2), new Position(1, 0, 1), new Position(2, 0, 0) ],

  // layer 1
  [ new Position(0, 1, 0), new Position(0, 1, 1), new Position(0, 1, 2) ],
  [ new Position(1, 1, 0), new Position(1, 1, 1), new Position(1, 1, 2) ],
  [ new Position(2, 1, 0), new Position(2, 1, 1), new Position(2, 1, 2) ],

  [ new Position(0, 1, 0), new Position(1, 1, 0), new Position(2, 1, 0) ],
  [ new Position(0, 1, 1), new Position(1, 1, 1), new Position(2, 1, 1) ],
  [ new Position(0, 1, 2), new Position(1, 1, 2), new Position(2, 1, 2) ],

  // layer 2
  [ new Position(0, 2, 0), new Position(0, 2, 1), new Position(0, 2, 2) ],
  [ new Position(1, 2, 0), new Position(1, 2, 1), new Position(1, 2, 2) ],
  [ new Position(2, 2, 0), new Position(2, 2, 1), new Position(2, 2, 2) ],

  [ new Position(0, 2, 0), new Position(1, 2, 0), new Position(2, 2, 0) ],
  [ new Position(0, 2, 1), new Position(1, 2, 1), new Position(2, 2, 1) ],
  [ new Position(0, 2, 2), new Position(1, 2, 2), new Position(2, 2, 2) ],

  [ new Position(0, 2, 0), new Position(1, 2, 1), new Position(2, 2, 2) ],
  [ new Position(0, 2, 2), new Position(1, 2, 1), new Position(2, 2, 0) ],

  // columns
  [ new Position(0, 0, 0), new Position(0, 1, 0), new Position(0, 2, 0) ],
  [ new Position(1, 0, 0), new Position(1, 1, 0), new Position(1, 2, 0) ],
  [ new Position(2, 0, 0), new Position(2, 1, 0), new Position(2, 2, 0) ],
  [ new Position(0, 0, 1), new Position(0, 1, 1), new Position(0, 2, 1) ],
  [ new Position(2, 0, 1), new Position(2, 1, 1), new Position(2, 2, 1) ],
  [ new Position(0, 0, 2), new Position(0, 1, 2), new Position(0, 2, 2) ],
  [ new Position(1, 0, 2), new Position(1, 1, 2), new Position(1, 2, 2) ],
  [ new Position(2, 0, 2), new Position(2, 1, 2), new Position(2, 2, 2) ],

  // vertical diagonals
  [ new Position(0, 0, 0), new Position(1, 1, 0), new Position(2, 2, 0) ],
  [ new Position(0, 0, 0), new Position(0, 1, 1), new Position(0, 2, 2) ],
  [ new Position(0, 0, 2), new Position(0, 1, 1), new Position(0, 2, 0) ],
  [ new Position(0, 0, 2), new Position(1, 1, 2), new Position(2, 2, 2) ],
  [ new Position(2, 0, 0), new Position(1, 1, 0), new Position(0, 2, 0) ],
  [ new Position(2, 0, 0), new Position(2, 1, 1), new Position(2, 2, 2) ],
  [ new Position(2, 0, 2), new Position(1, 1, 2), new Position(0, 2, 2) ],
  [ new Position(2, 0, 2), new Position(2, 1, 1), new Position(2, 2, 0) ],
]
