import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../game/game.component';

@Pipe({
  name: 'gameState',
  pure: false
})
export class GameStatePipe implements PipeTransform {

  transform(game: Game, x: number, y: number, z: number): unknown {
    if (game.x.some(pos => pos.equals(x, y, z))) {
      return 'x';
    };
    if (game.o.some(pos => pos.equals(x, y, z))) {
      return 'o';
    };
    return '.'
  }
}
