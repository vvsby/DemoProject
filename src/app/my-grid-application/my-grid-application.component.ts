import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { RedComponentComponent } from './red-component/red-component.component';
import { MatCheckboxComponent } from './mat-checkbox/mat-checkbox.component';
import { ShowImgComponent } from './show-img-component/show-img-component.component';
import { DateParseComponent } from './date-parse/date-parse.component';
import { HttpClient } from '@angular/common/http';
import * as Classes from '../classes/classes';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-my-grid-application',
  templateUrl: './my-grid-application.component.html',
  styleUrls: ['./my-grid-application.component.css']
})
export class MyGridApplicationComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;
  private gridOptions: GridOptions;
  paginationNumberFormatter;
  autoGroupColumnDef;
  pinnedBottomRowData;
  defaultColDef;
  gridColumnApi;
  statusBar;
  searchList: Classes.SearchList;
  show = false;
  search = 'john';
  maxNumRows = 50;
  numRows = 10;
  numRowsArray = [3, 5, 10, 20, 50];

  constructor(
    public http: HttpClient) {
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
      this.http.get(this.getPath(numRows, searchWord))
        .subscribe((res: Classes.SearchList) => {
          this.searchList = new Classes.SearchList(res);
          this.showTable(this.searchList, this.numRows);
        });
    }

  }
  /**
   * Update table with new results
   * @param searchList data for table
   * @param maxRows max number of rows in result
   */
  showTable(searchList: Classes.SearchList, maxRows?: number) {
    const rowData: Classes.RowData[] = [];
    searchList.items.forEach(item => {
      const row = new Classes.RowData();
      row.description = item.snippet.description;
      row.publishedAt = item.snippet.publishedAt;
      row.thumbnails = item.snippet.thumbnails;
      row.title = item;
      row.selected = false;
      rowData.push(row);
    });
    this.autoGroupColumnDef = {
      headerName: 'Group',
      width: 200,
      field: 'athlete',
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: { checkbox: true }
    };
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {
        headerName: '',
        field: 'selected',
        sortable: true,
        checkboxSelection: (params) => {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        headerCheckboxSelection: (params) => {
          return params.columnApi.getRowGroupColumns().length === 0;
        },
        cellRendererFramework: MatCheckboxComponent,
        width: 40
      },
      {
        headerName: '',
        field: 'thumbnails.default.url',
        cellRendererFramework: ShowImgComponent,
        width: 100
      },
      {
        headerName: 'Description',
        field: 'description',
        resizable: true,
        sortable: true,
        menuTabs: ['filterMenuTab', 'generalMenuTab'],
        width: window.innerWidth * 0.3
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        resizable: true,
        sortable: true,
        cellRendererFramework: DateParseComponent,
        width: 150
      },
      {
        headerName: 'Video Title',
        field: 'title',
        resizable: true,
        cellRendererFramework: RedComponentComponent,
        width: window.innerWidth * 0.3,

      },

    ];
    this.defaultColDef = {
      sortable: true,
      filter: true,
    };
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'left'
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' }
      ]
    };
    this.gridOptions.rowData = rowData;
    this.show = true;

  }
  /**
   * return path to search api
   * @param numRows max number of rows in result
   * @param searchWord search query
   */
  getPath(numRows = 10, searchWord = '') {
    const path = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=' +
      numRows + '&type=video&part=snippet&q=' + searchWord;
    return path;
  }
  /**
   * update number of rows per page
   */
  numRowsChanged() {
    this.agGrid.api.paginationSetPageSize(Number(this.numRows));
    setTimeout(this.showTable.bind(this), 0, this.searchList, this.numRows);
  }
  /**
   * return menu array
   * @param params input parameter
   */
  getContextMenuItems(params) {
    let result: any[] = [
      'copy',
      'copyWithHeaders',
      'paste'
    ];
    if (params.column.colId === 'title') {
      result = [{
        name: 'Open in new tab',
        action: () => {
          let link;
          link = 'https://www.youtube.com/watch?v=' + params.value.id.videoId;
          window.open(link);

        }
      },
        'separator'].concat(result);
    } else if (params.column.colId === 'thumbnails.default.url') {
      result = [{
        name: 'Open image in new tab',
        action: () => {
          let link;
          link = params.node.data.thumbnails.high.url;
          window.open(link);

        }
      },
        'separator'].concat(result);
    }
    return result;
  }
}
