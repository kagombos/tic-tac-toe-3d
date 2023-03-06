import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { MessageContainerComponent } from './message-container/message-container.component';
import { GameStateComponent } from './game/game-state/game-state.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameStatePipe } from './pipes/game-state.pipe';
import { GameTreeComponent } from './game-tree/game-tree.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    MessageContainerComponent,
    GameStateComponent,
    GameStatePipe,
    GameTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
