import { Component } from '@angular/core';

@Component({
  selector: 'app-video-title',
  templateUrl: './video-title.component.html',
  styleUrls: ['./video-title.component.css']
})
export class VideoTitleComponent {
  private params: any;
  link: string;
  name: string;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.link = 'https://www.youtube.com/watch?v=' + this.params.value.id.videoId;
    this.name = this.params.value.snippet.title || 'No title in response :(';
  }
  openLink() {
    window.open(this.link);
  }




}
