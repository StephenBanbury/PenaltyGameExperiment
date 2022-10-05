import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-penalty-shoot-out',
  templateUrl: './penalty-shoot-out.component.html',
  styleUrls: ['./penalty-shoot-out.component.scss']
})
export class PenaltyShootOutComponent {
  startAnimation: Subject<boolean> = new Subject();
  resetAnimation: Subject<boolean> = new Subject();

  public buttonId: string = '';
  public strength: number = 0;
  public width: string = '0';
  public height: string = '0';
  public isKickCompleted: boolean = false;
  public strengthFinal: number = 0;

  private timerStepSize: number = 0.05;
  private timerspeed: number = 10;

  constructor(
  ) {}

  public onAction($event: any) {
    if (this.isKickCompleted) return;

    this.buttonId = $event.currentTarget.id;
    const eventType = $event.type;
    console.log(this.buttonId, eventType);
    switch (eventType) {
      case 'mousedown':
        this.strength = 0;
        this.strengthFinal = 0;
        this.strengthometer();
        break;
      case 'mouseup':
        this.clearAllIntervals();
        this.kick();
        break;
    }
  }

  private strengthometer() {
    let timer = 0;
    setInterval(() => {
      if (this.strength < 100) {
        timer += this.timerStepSize;
        this.strength = Math.floor(timer * this.timerspeed);
        this.width = this.strength.toString() + '%';
        this.height = this.strength.toString() + '%';
      } else {
        this.kick();
      }
    }, this.timerStepSize * this.timerspeed );
  }

  private clearAllIntervals() {
    const intervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < intervalId; i++) {
      window.clearInterval(i);
    }
  }

  private kick() {
    if (this.isKickCompleted) return;

    console.log('Kick!');
    this.clearAllIntervals();
    this.strengthFinal = this.strength;
    this.isKickCompleted = true;
    this.startAnimation.next(true);
  }

  public reset() {
    this.strengthFinal = 0;
    this.strength = 0;
    this.buttonId = '';
    this.width = '0';
    this.height = '0';
    this.isKickCompleted = false;
    this.resetAnimation.next(true);
  }
}
