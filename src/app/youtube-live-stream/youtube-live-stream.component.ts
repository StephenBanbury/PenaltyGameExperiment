import { Component, OnInit } from '@angular/core';
import { MediaType } from '../../shared/enums/media-type';

@Component({
  selector: 'app-youtube-live-stream',
  templateUrl: './youtube-live-stream.component.html',
  styleUrls: ['./youtube-live-stream.component.scss'],
})
export class YoutubeLiveStreamComponent implements OnInit {
  public youTubeVideoUrl: string = '';
  public youTubeLiveUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    // this removes all 'youtube' branding:
    // 'https://unity-youtube-dl-server.herokuapp.com/watch?v=_o-rHZSr1i0&cli=yt-dlp'

    // Using YT channel ID (Phygital Staging):
    // 'https://www.youtube.com/embed/live_stream?channel=UCS-UCmihY6Z_5ivj7AKNZawo7bw'

    // Using YT stream specific link:
    // 'https://www.youtube.com/embed/5VNuB7Y6SvQ'

    // Shareable link:
    // 'https://youtu.be/5VNuB7Y6SvQ'

    this.setPlayerUrl(
      MediaType.YouTubeVideo,
      'https://www.youtube.com/embed/_o-rHZSr1i0'
    );

    this.setPlayerUrl(
      MediaType.YouTubeLive,
      'https://www.youtube.com/embed/CXnTlmZIwrA'
    );
  }

  private setPlayerUrl(type: MediaType, url: string) {
    switch (type) {
      case 1:
        this.youTubeVideoUrl = url;
        break;
      case 2:
        this.youTubeLiveUrl = url;
        break;
    }
  }
}
