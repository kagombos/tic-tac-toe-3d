import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../game/game.component';

const timer = (ms: number) => new Promise(res => setTimeout(res, ms))
let totalRun: any;

class TreeNode {
  nodeWinner = '';
  _parent;
  children: TreeNode[] = [];
  actionNum = 0;
  move;

  constructor(_parent: TreeNode, move = '') {
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
      newGame?.placePiece(0, 0);
      games.push(newGame);
      this.children.push(new TreeNode(this, '00'));
      newGame = game.copy();
      newGame?.placePiece(0, 1);
      games.push(newGame);
      this.children.push(new TreeNode(this, '01'));
      newGame = game.copy();
      newGame?.placePiece(1, 1);
      games.push(newGame);
      this.children.push(new TreeNode(this, '11'));
    }

    this.actionNum = totalRun;
    totalRun += 1;

    if (!(totalRun % 1000) || [1, 2, 3, 4, 5].includes(totalRun)) {
      postMessage({
        totalRun,
        test: this.reconstructGame()
      })
    }
    
    if (games.some(childGame => childGame.win)) {
      this.nodeWinner = game.xTurn ? 'o' : 'x'; 
    }
    else {
      for (let x = 0; x < this.children.length; x++) {
        this.children[x].createNextStep();
      }   
    }
  }
}


@Component({
  selector: 'app-game-tree',
  templateUrl: './game-tree.component.html',
  styleUrls: ['./game-tree.component.scss']
})
export class GameTreeComponent {
  totalRun = 0;
  running: boolean = false;
  runStack: Function[] = [];
  webWorker: any;

  constructor(private httpClient: HttpClient) {

  }

  async start() {
    this.running = true;
    if (typeof Worker !== 'undefined') {
      this.httpClient.get('assets/game-tree.worker.js', { responseType: 'text' }).subscribe((res) => {
        const scriptBlob = new Blob([res], { type: 'text/javascript' })
        const scriptBlobUrl = URL.createObjectURL(scriptBlob);
        this.webWorker = new Worker(scriptBlobUrl, {type: 'module'});
        this.webWorker.addEventListener('error', (e: any) => {
          console.log(e);
        })
        this.webWorker.addEventListener('message', (e: any) => {
          console.log(e.data);
        });
      });
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  terminate() {
    this.webWorker.terminate();
    this.running = false;
  }
}
