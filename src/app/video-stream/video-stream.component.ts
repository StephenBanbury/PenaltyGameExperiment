import { Component, Input, OnInit } from '@angular/core';
import { MediaType } from '../../shared/enums/media-type';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss'],
})
export class VideoStreamComponent implements OnInit {
  @Input() public url: string = '';
  @Input() public isLiveStream: boolean = false;

  //public youTubeUrl: string = '';
  private mediaType: MediaType = MediaType.NotSet;

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

    this.mediaType = this.isLiveStream ? MediaType.YouTubeLive : MediaType.YouTubeVideo;

    console.log('Is live stream', this.isLiveStream);
    console.log('URL', this.url);

  }
}
