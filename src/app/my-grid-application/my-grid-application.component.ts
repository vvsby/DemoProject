import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, ColumnApi } from 'ag-grid-community';
import { AgGridNg2 } from 'ag-grid-angular';

import { GridService } from '../services/grid.service';

import * as Classes from '../classes/classes';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  private gridOptions: GridOptions;
  private paginationNumberFormatter; // function
  private autoGroupColumnDef: Classes.GroupColumnDef;
  private pinnedBottomRowData; // function
  private defaultColDef: Classes.ColumnDefinition;
  private gridColumnApi: ColumnApi;
  private statusBar: Classes.StatusBar;
  private searchList: Classes.SearchList;
  private show = false;
  private search = 'john';
  private maxNumRows = 50;
  private numRows = 10;
  private numRowsArray = [3, 5, 10, 20, 50];

  constructor(
    public http: HttpClient,
    public gridService: GridService) {
    this.gridOptions = <GridOptions>{};
  }
  ngOnInit() {
    this.getNewResults(this.maxNumRows, 'john');
    this.paginationNumberFormatter = (params) => {
      return '[' + params.value.toLocaleString() + ']';
    };
  }
  onGridReady(params) {
    this.agGrid.api.refreshCells();
    this.agGrid.api.paginationSetPageSize(Number(this.numRows));
    this.gridColumnApi = this.agGrid.columnApi;
  }
  /**
  * Function for creating JSON file with selected rows
  */
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedData, null, '\t'));
    const dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'scene.json');
    dlAnchorElem.click();
  }
  /**
   * Refresh search results
   * @param numRows max number of rows in result
   * @param searchWord search query
   */
  getNewResults(numRows = 10, searchWord = '') {
    this.show = false;
    if (numRows < 0 || numRows > 50) {
      alert('Invalid value ' + numRows + '. Max number of rows must be within the range: [0, 50]');
    } else {
      this.gridService.sendRequest(numRows, searchWord)
        .subscribe((res: Classes.SearchList) => {
          this.searchList = new Classes.SearchList(res);
          this.showTable(this.searchList, numRows);
        });
    }

  }
  /**
   * Update table with new results
   * @param searchList data for table
   * @param maxRows max number of rows in result
   */
  showTable(searchList: Classes.SearchList, maxRows?: number) {
    this.autoGroupColumnDef = this.gridService.getAutoGroupColumnDef();
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = this.gridService.generateColumnDefs();
    this.defaultColDef = this.gridService.getDefaultColDef();
    this.statusBar = this.gridService.getStatusBar();
    this.gridOptions.rowData = this.gridService.getRowData(searchList);
    this.show = true;

  }
  /**
   * update number of rows per page
   */
  numRowsChanged() {
    this.agGrid.api.paginationSetPageSize(Number(this.numRows));
    setTimeout(this.showTable.bind(this), 0, this.searchList, this.numRows);
  }
  getContextMenuItems() {
    return this.gridService.getContextMenuItems;
  }
}
