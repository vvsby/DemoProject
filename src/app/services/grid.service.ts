import { Injectable } from '@angular/core';
import { GridOptions, RowNode } from 'ag-grid-community';
import { AgGridNg2 } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';

import { MatCheckboxComponent } from '../my-grid-application/mat-checkbox/mat-checkbox.component';
import { ShowImgComponent } from '../my-grid-application/show-img-component/show-img-component.component';
import { DateParseComponent } from '../my-grid-application/date-parse/date-parse.component';
import { RedComponentComponent } from '../my-grid-application/red-component/red-component.component';

import * as Classes from '../classes/classes';


@Injectable()
export class GridService {
    constructor(
        public http: HttpClient) {
    }
    /**
     * Function return column definition for table
     */
    generateColumnDefs() {
        const response: Classes.GroupColumnDef[] = [
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
        return response;
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
    /**
    * Function return auto group column definition for table
    */
    getAutoGroupColumnDef() {
        const response = {
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
        return response;
    }
    /**
    * Function return status bar information for table
    */
    getStatusBar() {
        const response = {
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
        return response;
    }
    /**
    * Function return default column definition for table
    */
    getDefaultColDef() {
        const response: Classes.ColumnDefinition = {
            sortable: true,
            filter: true,
        };
        return response;
    }
    /**
     * return row data for table
     * @param searchList input data for convert
     */
    getRowData(searchList: Classes.SearchList) {
        const rowData: Classes.RowData[] = [];
        if (searchList && searchList.items) {
            searchList.items.forEach(item => {
                const row = new Classes.RowData();
                row.description = item.snippet.description;
                row.publishedAt = item.snippet.publishedAt;
                row.thumbnails = item.snippet.thumbnails;
                row.title = item;
                row.selected = false;
                rowData.push(row);
            });
        }
        return rowData;
    }
    /**
    * Refresh search results
    * @param numRows max number of rows in result
    * @param searchWord search query
     */
    sendRequest(numRows: number, searchWord: string) {
        return this.http.get(this.getPath(numRows, searchWord));
    }
    /**
    * Function for creating JSON file with selected rows
    */
    getSelectedRows(selectedNodes: RowNode[]) {
        const selectedData = selectedNodes.map(node => node.data);
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedData, null, '\t'));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute('href', dataStr);
        dlAnchorElem.setAttribute('download', 'selected-rows.json');
        dlAnchorElem.click();
    }

}
