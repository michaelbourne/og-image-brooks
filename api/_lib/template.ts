
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const big = readFileSync(`${__dirname}/../_fonts/modesto-open.woff2`).toString('base64');

function getCss() {
    return `
    @font-face {
        font-family: 'Modesto Open';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${big}) format('woff2');
    }

    body {
        background-image: url('https://wordpress-350678-1086447.cloudwaysapps.com/wp-content/themes/brooks-wine/images/lightpaperfibers.png');
        background-repeat: repeat;
        background-size: auto;
        height: 100vh;
        overflow: hidden;
    }

    body:before {
        content: '';
        background: url('https://wordpress-350678-1086447.cloudwaysapps.com/wp-content/themes/brooks-wine/images/brooks-logo-watermark.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: right;
        height: 60vh;
        width: 100vw;
        position: absolute;
        top: 5vh;
        right: 0;
        z-index: 1;
        opacity: .4;
    }

    .og {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-end;
        justify-content: space-around;
    }

    .image-wrapper {
        flex: 0 1 25%;
        text-align: center;
    }

    .image-wrapper img {
        width: 100%;
        height: auto;
    }

    .heading {
        flex: 0 1 68%;
    }
    .heading p {
        font-family: 'Modesto Open', serif;
        font-size: 140px;
        font-style: normal;
        color: #981C20;
        line-height: 1.15;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        font-kerning: none;
        text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        text-align: left;
        margin-bottom: 10vh;
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

            <div class="heading"><p>${sanitizeHtml(text)}</p></div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width ='auto', height = 'auto') {
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
