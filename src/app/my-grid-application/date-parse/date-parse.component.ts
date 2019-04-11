import { Component } from '@angular/core';

@Component({
  selector: 'app-date-parse',
  templateUrl: './date-parse.component.html',
  styleUrls: ['./date-parse.component.css']
})
export class DateParseComponent {

  private params: Date;
  date: Date;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
    this.date = new Date(params.value);

  }

}
