/// <reference lib="webworker" />

// import { cloneDeep } from "lodash";
// import { Game } from "../app/game/game.component";

class Position {
  x;
  y;
  z;

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  equals(x, y, z) {
    return this.x == x && this.y == y && this.z == z;
  }

  equalsObj(pos) {
    return this.x == pos.x && this.y == pos.y && this.z == pos.z;
  } 
}

let WIN_POSITIONS = [
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

const USE_CENTER_WIN_POSITIONS = [
  //missing layer 1
  [ new Position(0, 1, 0), new Position(1, 1, 1), new Position(2, 1, 2) ],
  [ new Position(0, 1, 2), new Position(1, 1, 1), new Position(2, 1, 0) ],

  //missing diagonals
  [ new Position(0, 0, 1), new Position(1, 1, 1), new Position(2, 2, 1) ],
  [ new Position(0, 2, 1), new Position(1, 1, 1), new Position(2, 0, 1) ],
  [ new Position(1, 0, 0), new Position(1, 1, 1), new Position(1, 2, 2) ],
  [ new Position(1, 0, 2), new Position(1, 1, 1), new Position(1, 2, 0) ],
]

class Game {
  o = [];
  x = [];

  oTurn = true;
  win = false;

  toString() {
    let gameString = "";
    for (let a = 0; a < this.o.length; a++) {
      gameString = gameString + this.o[a].x + this.o[a].z;
      if (this.x.length != a) {
        gameString = gameString + this.x[a].x + this.x[a].z;
      }
    }
    return gameString;
  }

  static stringToGame(gameString) {
    let newGame = new Game();
    let moveList = gameString.match(/.{2}/g);
    if (moveList) {
      for (let moveCount = 0; moveCount < moveList.length; moveCount++) {
        newGame.placePiece(parseInt(moveList[moveCount][0]), parseInt(moveList[moveCount][1]));
      }
    }
    return newGame;
  }

  copy() {
    let newGame = new Game();
    this.o.forEach((pos) => {
      newGame.o.push(new Position(pos.x, pos.y, pos.z));
    })
    this.x.forEach((pos) => {
      newGame.x.push(new Position(pos.x, pos.y, pos.z));
    })
    newGame.oTurn = this.oTurn;
    newGame.win = this.win;
    return newGame;
  }

  placePiece(x, z) {
    if (!this.win) {
      let newPiece;

      if (this.x.some(pos => pos.equals(x, 2, z)) || this.o.some(pos => pos.equals(x, 2, z))) {
        return false;
      }
      if (this.x.some(pos => pos.equals(x, 1, z)) || this.o.some(pos => pos.equals(x, 1, z))) {
        newPiece = new Position(x, 2, z);
      }
      else if (this.x.some(pos => pos.equals(x, 0, z)) || this.o.some(pos => pos.equals(x, 0, z))) {
        newPiece = new Position(x, 1, z);
      }
      else {
        newPiece = new Position(x, 0, z);
      }
  
      if (this.oTurn) {
        this.o.push(newPiece);
      }    
      else {
        this.x.push(newPiece);
      }
      if (this.checkSuccess()) {
        this.win = true;
      }
      else {
        this.oTurn = !this.oTurn;
      }
      return true;
    }
  }

  checkSuccess() {
    let testPositions = this.oTurn ? this.o : this.x;
    let retVal = false;

    WIN_POSITIONS.forEach(winPos => {
      if (testPositions.some(pos => winPos[0].equalsObj(pos))) {
        if (testPositions.some(pos => winPos[1].equalsObj(pos))) {
          if (testPositions.some(pos => winPos[2].equalsObj(pos))) {
            retVal = true;
          }
        }
      }
    });

    return retVal;
  }
}

let totalRun = 0;

class TreeNode {
  nodeWinner = '';
  _parent;
  children = [];
  actionNum = 0;
  move;
  movesToWin;
  depth = 0;

  constructor(_parent, move = '') {
    this._parent = _parent;
    this.move = move;
  }

  reconstructGame() {
    let gameString = this.move;
    let _parent = this._parent;
    while (_parent) {
      gameString = _parent.move + gameString;
      _parent = _parent._parent;
    }
    return gameString;
  }

  createNextStep() {
    let game;
    let games = [];
    game = Game.stringToGame(this.reconstructGame())
    if (this._parent) {
      this.depth = this._parent.depth + 1;
      for (let x = 0; x <= 2; x++) {
        for (let z = 0; z <= 2; z++) {
          let newGame = game.copy();
          const piecePlaced = newGame?.placePiece(x, z);
          if (piecePlaced) {
            games.push(newGame);
            this.children.push(new TreeNode(this, `${x}${z}`));
          }
        }
      }
    }
    // we don't need to test every case, just center, one edge, and one corner
    else {
      let newGame = game.copy();
      // newGame?.placePiece(0, 0);
      // games.push(newGame);
      // this.children.push(new TreeNode(this, '00'));
      // newGame = game.copy();
      // newGame?.placePiece(0, 1);
      // games.push(newGame);
      // this.children.push(new TreeNode(this, '01'));
      // newGame = game.copy();
      newGame?.placePiece(1, 1);
      games.push(newGame);
      this.children.push(new TreeNode(this, '11'));
    }

    this.actionNum = totalRun;
    totalRun += 1;

    if (!(totalRun % 10000) || [1, 2, 3, 4, 5, 6, 7, 8].includes(totalRun)) {
      postMessage({
        totalRun,
        test: this.reconstructGame()
      })      
    }

    if (games.some(childGame => childGame.win)) {
      this.nodeWinner = game.oTurn ? 'o' : 'x';
      this.children = [];
      this.movesToWin = 1;
    }
    else {
      for (let x = 0; x < this.children.length; x++) {
        this.children[x].createNextStep();
        if (this.children[x].nodeWinner == (game.oTurn ? 'o' : 'x')) {
          this.movesToWin = this.children[x].movesToWin + 1;
          this.nodeWinner = game.oTurn ? 'o' : 'x';

          // force best move
          this.children = [this.children[x]]
          break;
        }
      }
      if (this.children.every(child => child.nodeWinner == (game.oTurn ? 'x' : 'o'))) {
        this.nodeWinner = game.oTurn ? 'x' : 'o';
        this.movesToWin = Math.max(...this.children.map(child => child.movesToWin)) + 1;
      }
    }
    if (this.depth > 25 && !this.nodeWinner) {
      postMessage(this.reconstructGame());
    }
  }
}

const treeNode = new TreeNode(undefined)

treeNode.createNextStep()

postMessage(treeNode);