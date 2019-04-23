import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { YoutubePlayerComponent } from 'src/app/services/youtube-player/youtube-player.component';

@Component({
  selector: 'app-video-title',
  templateUrl: './video-title.component.html',
  styleUrls: ['./video-title.component.css']
})
export class VideoTitleComponent {
  private params: any;
  link: string;
  name: string;

  constructor(
    public dialog: MatDialog) { }

  agInit(params: any): void {
    this.params = params;
    this.link = 'https://www.youtube.com/watch?v=' + this.params.value.id.videoId;
    this.name = this.params.value.snippet.title || 'No title in response :(';
  }
  openLink() {
    // window.open(this.link);
    const dialogRef = this.dialog.open(YoutubePlayerComponent, {
      width: '80%'
    });
    dialogRef.componentInstance.videoId = this.params.value.id.videoId;
  }

}
