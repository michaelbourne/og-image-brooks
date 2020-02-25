import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname = '/', query = {} } = parse(req.url || '', true);
    const { image, layout } = query;
  
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
        image: decodeURIComponent(image),
        layout: decodeURIComponent(layout),
    };
    parsedRequest.image = getDefaultImages(parsedRequest.image);
    return parsedRequest;
}

function getDefaultImages(image: string): string {
    if (image.length > 0) {
        return image;
    }
    return 'https://images.commerce7.com/brooks/images/original/brooks-riesling-ara-2017-1581624827943.png';
}
