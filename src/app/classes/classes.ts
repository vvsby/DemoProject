
function _get(name: string, obj: any) {
    return (obj !== undefined && obj !== null && obj[name] !== undefined && (obj[name] !== null)) ? obj[name] : null;
}

function _getArray(name: string, obj: any) {
    return (obj !== undefined && obj !== null && obj[name] !== undefined && (obj[name] !== null)) ? _convertToArray(obj[name]) : [];
}

function _convertToArray(obj) {
    if (obj && Array.isArray(obj)) {
        return obj;
    } else {
        return [obj];
    }
}

export class PageInfo {
    resultsPerPage: number;
    totalResults: number;

    constructor(obj?: any) {
        this.resultsPerPage = _get('resultsPerPage', obj);
        this.totalResults = _get('totalResults', obj);
    }
}

export class Item {
    etag: string;
    id: ItemId;
    kind: string;
    snippet: ItemSnippet;

    constructor(obj?: any) {
        this.etag = _get('etag', obj);
        this.id = _get('id', obj);
        this.kind = _get('kind', obj);
        this.snippet = _get('snippet', obj);
    }
}
export class ItemId {
    kind: string;
    videoId: string;

    constructor(obj?: any) {
        this.kind = _get('kind', obj);
        this.videoId = _get('videoId', obj);
    }
}

export class Thumbnails {
    default: Thumbnail;
    high: Thumbnail;
    medium: Thumbnail;

    constructor(obj?: any) {
        this.default = _get('default', obj);
        this.high = _get('high', obj);
        this.medium = _get('medium', obj);
    }
}

export class Thumbnail {
    height: number;
    url: string;
    width: number;

    constructor(obj?: any) {
        this.height = _get('height', obj);
        this.url = _get('url', obj);
        this.width = _get('width', obj);
    }
}

export class ItemSnippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: Date;
    thumbnails: Thumbnails;
    title: string;

    constructor(obj?: any) {
        this.channelId = _get('channelId', obj);
        this.channelTitle = _get('channelTitle', obj);
        this.description = _get('description', obj);
        this.liveBroadcastContent = _get('liveBroadcastContent', obj);
        this.publishedAt = new Date(_get('publishedAt', obj));
        this.thumbnails = _get('thumbnails', obj);
        this.title = _get('title', obj);
    }
}

export class SearchList {
    etag: string;
    items: Item[];
    kind: string;
    nextPageToken: string;
    pageInfo: PageInfo;
    regionCode: string;

    constructor(obj?: any) {
        this.etag = _get('etag', obj);
        this.items = _getArray('items', obj);
        this.kind = _get('kind', obj);
        this.nextPageToken = _get('nextPageToken', obj);
        this.pageInfo = _get('pageInfo', obj) || false;
        this.regionCode = _get('regionCode', obj);
    }
}

export class RowData {
    thumbnails: Thumbnails;
    publishedAt: Date;
    title: Item;
    description: string;
    selected: boolean;

    constructor(obj?: any) {
        this.thumbnails = _get('thumbnails', obj);
        this.publishedAt = new Date(_get('publishedAt', obj));
        this.title = _get('title', obj);
        this.selected = _get('selected', obj);
        this.description = _get('description', obj);
    }
}

