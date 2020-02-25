import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname = '/', query = {} } = parse(req.url || '', true);
    const { images, widths, heights } = query;
  
    const arr = pathname.slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        images: getArray(images),
        widths: getArray(widths),
        heights: getArray(heights),
    };
    parsedRequest.images = getDefaultImages(parsedRequest.images);
    return parsedRequest;
}

function getArray(stringOrArray: string[] | string): string[] {
    return Array.isArray(stringOrArray) ? stringOrArray : [stringOrArray];
}

function getDefaultImages(images: string[]): string[] {
    if (images.length > 0 && images[0] && images[0].startsWith('https://assets.zeit.co/image/upload/front/assets/design/')) {
        return images;
    }
    return ['https://images.commerce7.com/brooks/images/medium/brooks-riesling-ara-2017-1581624827943.png'];
}
