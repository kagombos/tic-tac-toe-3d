import { Component, Input } from '@angular/core';
import { Game } from '../game.component';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss']
})
export class GameStateComponent {
  @Input() game!: Game;
}
