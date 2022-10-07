import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { SafePipe } from '../shared/pipes/safe-pipe';
import { PenaltyShootOutComponent } from './penalty-shoot-out/penalty-shoot-out.component';
import { FootballAnimationComponent } from './football-animation/football-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoStreamComponent,
    PenaltyShootOutComponent,
    FootballAnimationComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
