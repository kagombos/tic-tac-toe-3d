import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Position, WIN_POSITIONS } from '../utils/position';

export class Game {
  x: Position[] = [];
  o: Position[] = [];

  xTurn = true;
  win = false;

  toString() {
    let gameString = "";
    for (let a = 0; a < this.x.length; a++) {
      gameString = gameString + this.x[a].x + this.x[a].z;
      if (this.o.length != a) {
        gameString = gameString + this.o[a].x + this.o[a].z;
      }
    }
    return gameString;
  }

  static stringToGame(gameString: string) {
    let newGame = new Game();
    let moveList = gameString.match(/.{2}/g);
    if (moveList) {
      for (let moveCount = 0; moveCount < moveList.length; moveCount++) {
        newGame.placePiece(parseInt(moveList[moveCount][0]), parseInt(moveList[moveCount][1]));
      }
    }
    return newGame;
  }

  stringToGameSlow(gameString: string) {
    if (gameString.length > 1) {
      let move = gameString.slice(0, 2);
      this.placePiece(parseInt(move[0]), parseInt(move[1]));
    }
    return gameString.slice(2);
  }

  copy() {
    let newGame = new Game();
    this.x.forEach((pos) => {
      newGame.x.push(new Position(pos.x, pos.y, pos.z));
    })
    this.o.forEach((pos) => {
      newGame.o.push(new Position(pos.x, pos.y, pos.z));
    })
    newGame.xTurn = this.xTurn;
    newGame.win = this.win;
    return newGame;
  }

  placePiece(x: number, z: number) {
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
  
      if (this.xTurn) {
        this.x.push(newPiece);
      }    
      else {
        this.o.push(newPiece);
      }
      if (this.checkSuccess()) {
        this.win = true;
      }
      else {
        this.xTurn = !this.xTurn;
      }
      return true;
    }
    return false;
  }

  checkSuccess() {
    let testPositions = this.xTurn ? this.x : this.o;
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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  gameStateInput: string = '';
  game: Game = new Game();

  constructGame() {
    console.log(this.gameStateInput);
    this.game = Game.stringToGame(this.gameStateInput);
  }

  playMove() {
    this.gameStateInput = this.game.stringToGameSlow(this.gameStateInput);
  }
}
