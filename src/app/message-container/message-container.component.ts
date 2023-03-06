import { Component } from '@angular/core';

@Component({
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent {
  messages: string[] = [];
  inputBox: any;  

  constructor() {
    this.messages.push('hello');
  }

  inputBoxChange(event: any) {
    console.log(event);
    console.log(this.inputBox)
  }
}
