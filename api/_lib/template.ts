
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';

const big = readFileSync(`${__dirname}/../_fonts/recklessneue-light.woff2`).toString('base64');
const small = readFileSync(`${__dirname}/../_fonts/basis-grotesque-regular-pro.woff2`).toString('base64');

function getBaseCss() {
    return `
    @font-face {
        font-family: 'Reckless Neue';
        font-style:  normal;
        font-weight: 300;
        src: url(data:font/woff2;charset=utf-8;base64,${big}) format('woff2');
    }
    @font-face {
        font-family: 'Basis Grotesque';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${small}) format('woff2');
    }

    body {
        background-image: url('https://www.brookswine.com/wp-content/themes/brooks-wine-2022/images/lightpaperfibers.png');
        background-repeat: repeat;
        background-size: auto;
        background-color: #F6F4F0;
        height: 100vh;
        overflow: hidden;
        font-family: 'Basis Grotesque', sans-serif;
    }

    body:before {
        content: '';
        background: url('https://www.brookswine.com/wp-content/themes/brooks-wine-2022/images/brooks-logo-watermark.png');
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

    .heading p {
        font-family: 'Reckless Neue', serif;
        font-size: 140px;
        font-style: normal;
        font-weight: 300;
        line-height: 1.15;
        letter-spacing: -0.0175em;
        font-kerning: none;
    }`;
}

function getCss(layout = 'wine') {
    if ( 'wine' == layout ) {
        return `
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
            text-align: left;
            margin-bottom: 10vh;
        }`;
    } else if ( 'general' == layout ) {
        return `
        body {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        .image-wrapper {
            display: block;
            margin: 0 auto 5vh;
            text-align: center;
        }
        .image-wrapper img {
            width: auto;
            height: 500px;
        }
        .heading {
            display: block;
            margin: 0 auto;
        }
        .heading p {
            text-align: center;
        }`;
    } else if ( 'collection' == layout ) {
        return `
        body {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        .image-wrapper {
            display: none;
        }
        .image-wrapper img {
            display: none;
        }
        .heading {
            display: block;
            margin: 0 auto;
        }
        .heading p {
            text-align: center;
        }`
    } 
    else {
        return `
        body {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        .image-wrapper {
            display: none;
        }
        .image-wrapper img {
            display: none;
        }
        .og {
            text-align: center;
        }
        .heading {
            display: block;
            margin: 0 auto;
        }
        .heading p {
            text-align: center;
        }`
    }
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, image, layout } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getBaseCss()}
        ${getCss(layout)}
    </style>
    <body>
        <div class="og">
            <div class="image-wrapper">
                ${getImage(image)}
            </div>

            <div class="heading"><p>${sanitizeHtml(text)}</p></div>
        </div>
    </body>
</html>`;
}

function getImage(src: string) {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
    />`
}