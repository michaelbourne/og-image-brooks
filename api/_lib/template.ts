
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const big = readFileSync(`${__dirname}/../_fonts/modesto-open.woff2`).toString('base64');
const bgimage = readFileSync(`${__dirname}/../_images/lightpaperfibers.png`).toString('base64');

function getCss() {
    let background = 'white';

    return `
    @font-face {
        font-family: 'Modesto Open';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${big}) format('woff2');
    }

    body {
        background: ${background};
        background-image: url(${bgimage});
        background-repeat: repeat;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .og {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        width: 1200px;
    }

    .image-wrapper {
        flex: 0 1 35%;
    }
   
    .heading {
        flex: 0 1 60%;
        font-family: 'Modesto Open', serif;
        font-size: 80px;
        font-style: normal;
        color: #981C20;
        line-height: 1.6;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        font-kerning: none;
        text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, images, widths, heights } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="og">
            <div class="image-wrapper">
                ${images.map((img, i) =>
                    getPlusSign(i) + getImage(img, widths[i], heights[i])
                ).join('')}
            </div>

            <div class="heading">${sanitizeHtml(text)}</div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = '225') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}

function getPlusSign(i: number) {
    return i === 0 ? '' : '<div class="plus">+</div>';
}
