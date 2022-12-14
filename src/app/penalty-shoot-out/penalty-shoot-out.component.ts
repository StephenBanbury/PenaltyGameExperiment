import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {WebSocketService} from 'src/app/services/websocket.service';

@Component({
  selector: 'app-penalty-shoot-out',
  templateUrl: './penalty-shoot-out.component.html',
  styleUrls: ['./penalty-shoot-out.component.scss']
})
export class PenaltyShootOutComponent implements OnInit {
  startAnimation: Subject<boolean> = new Subject();
  resetAnimation: Subject<boolean> = new Subject();

  public buttonId: string = '';
  public strength: number = 0;
  public indicatorWidth: string = '0';
  public indicatorHeight: string = '0';
  public isKickCompleted: boolean = false;
  public strengthFinal: number = 0;

  private timerStepSize: number = 0.05;
  private timerSpeed: number = 10;

  public penaltyVideoLocation: string = '';

  constructor(private webSocket: WebSocketService) {}

  ngOnInit() {
    this.webSocket.connect();
  }

  sendMessage(msg: any) {
    this.webSocket.send(msg);
  }

  public onAction($event: any) {
    if (this.isKickCompleted) return;

    this.buttonId = $event.currentTarget.id;
    const eventType = $event.type;
    //console.log(this.buttonId, eventType);
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
        this.strength = Math.floor(timer * this.timerSpeed);
        this.indicatorWidth = this.strength.toString() + '%';
        this.indicatorHeight = this.strength.toString() + '%';
      } else {
        this.kick();
      }
    }, this.timerStepSize * this.timerSpeed);
  }

  private clearAllIntervals() {
    const intervalId = window.setInterval(() => {
    }, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < intervalId; i++) {
      window.clearInterval(i);
    }
  }

  private kick() {
    if (this.isKickCompleted) return;

    this.clearAllIntervals();
    this.strengthFinal = this.strength;
    this.isKickCompleted = true;
    this.playPenaltyVideo(this.buttonId);
    this.sendMessage({Position: this.buttonId, Strength: this.strengthFinal });
    //this.startAnimation.next(true);
  }

  public reset() {
    this.strengthFinal = 0;
    this.strength = 0;
    this.buttonId = '';
    this.indicatorWidth = '0';
    this.indicatorHeight = '0';
    this.isKickCompleted = false;
    //this.resetAnimation.next(true);
  }

  playPenaltyVideo(placement: string) {
    const fileName = `penalty_${placement.replace('-', '_')}`;
    this.penaltyVideoLocation = `../../assets/${fileName}.mp4?autoplay=1`;
  }
}
