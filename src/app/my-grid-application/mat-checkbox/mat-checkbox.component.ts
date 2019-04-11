import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-mat-checkbox',
  templateUrl: './mat-checkbox.component.html',
  styleUrls: ['./mat-checkbox.component.css']
})
export class MatCheckboxComponent implements ICellRendererAngularComp {
  private params: any;
  boo = true;
  private checked = false;

  agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value;
  }

  // demonstrates how you can do "inline" editing of a cell
  onChange(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.colDef, this.checked);
  }

  refresh(params: any): boolean {
    return false;
  }
}
