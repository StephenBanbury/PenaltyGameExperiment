import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeLiveStreamComponent } from './youtube-live-stream/youtube-live-stream.component';
import { SafePipe } from '../shared/pipes/safe-pipe';
import { PenaltyShootOutComponent } from './penalty-shoot-out/penalty-shoot-out.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeLiveStreamComponent,
    SafePipe,
    PenaltyShootOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
