import { Component } from '@angular/core';

@Component({
  selector: 'app-show-img-component',
  templateUrl: './show-img-component.component.html',
  styleUrls: ['./show-img-component.component.css']
})
export class ShowImgComponent {
  private params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

}
