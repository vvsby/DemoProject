import { Component, OnInit, Input } from '@angular/core';

declare var YT: any;

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {

  private link: string;
  waitYT: any;
  private id: string;
  private player: any;
  private done = false;
  @Input() set videoId(id: string) {
    this.link = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    this.id = id;
  }
  constructor() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.waitYT = setInterval(this.checkYT.bind(this), 100);
  }

  ngOnInit() {
  }
  checkYT() {
    if (YT && YT.Player) {
      clearInterval(this.waitYT);
      this.onYouTubeIframeAPIReady();
    }
  }

  onYouTubeIframeAPIReady() {
    this.player = new YT.Player('player', {
      height: '500',
      // width: '640',
      videoId: this.id,
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': this.onPlayerStateChange.bind(this)
      }
    });
  }
  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
  }
  stopVideo() {
    this.player.stopVideo();
  }
}
