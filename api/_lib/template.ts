
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
        color: #2b2824;
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
    }
    
    .logo {
        display: none;
        margin: 0 auto 5vh;
    }`;
}

function getCss(layout = 'wine') {
    if ( 'wine' == layout ) {
        return `
        .og {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: stretch;
            justify-content: center;
        }
        .image-wrapper {
            flex: 0 1 50%;
            text-align: center;
        }
        .image-wrapper img {
            width: auto;
            height: 100%;
        }
        .heading {
            flex: 0 1 50%;
            background: #fff;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: flex-start;
            padding: 3vh;
        }
        .heading p {
            text-align: left;
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
        }
        .logo {
            display: block;
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
            <div class="logo">
            <svg width="479" height="27" viewBox="0 0 479 27" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-label="Brooks Wine">
            <path fill="#2B2824" d="M400.065 1.53564L384.279 10.0306L392.577 19.5368L400.47 24.9979H373.553L380.636 19.9414L375.779 14.4803L366.672 18.7278V19.5368L373.148 24.9979H346.029L354.529 19.5368V6.99667L346.029 1.53564H372.946L366.672 6.79443V13.0645L380.232 6.38991L374.16 1.53564H400.065Z"></path>
            <path fill="#2B2824" d="M96.2912 7.19895V19.7391L87.5889 25.2001H116.934L108.232 19.7391V16.0984H113.898C116.529 16.0984 118.148 16.7052 118.756 17.5143C119.97 19.1323 121.184 21.5595 122.601 24.9979H139.196L133.529 21.5595C132.315 19.1323 131.303 17.312 130.089 16.3007C128.875 15.2894 127.053 14.4803 124.827 13.8736C131.708 13.0645 134.946 11.2442 134.946 8.21025C134.946 6.59217 134.136 5.3786 132.315 4.16504C130.696 2.95148 128.47 2.14242 125.636 1.94016L120.172 1.53564H115.922H87.5889L96.2912 7.19895ZM108.434 5.98537H116.125C118.553 5.98537 120.172 6.18764 121.184 6.59216C121.994 6.99668 122.398 7.80574 122.398 8.81704C122.398 10.4351 121.184 11.4464 118.553 11.4464H116.125H108.434V5.98537Z"></path>
            <path fill="#2B2824" d="M21.2075 15.4916H32.1361C34.5647 15.4916 35.779 16.5029 35.779 18.3233C35.779 20.1436 34.1599 20.9527 30.9218 20.9527H21.2075V15.4916V15.4916ZM9.06469 6.99667V19.5368L0.362305 24.9979H34.5647C44.0766 24.9979 48.9337 23.1775 48.9337 19.3346C48.9337 16.0984 44.8861 13.8735 36.7909 12.8622C43.6718 12.0532 47.1123 10.2328 47.1123 7.60346C47.1123 5.78311 45.898 4.3673 43.6718 3.15373C41.4456 1.94017 38.4099 1.53564 34.5647 1.53564H0.564685L9.06469 6.99667ZM21.2075 5.78313H30.9218C33.5528 5.78313 34.9695 6.59217 34.9695 8.41252C34.9695 10.0306 33.5528 10.8396 30.9218 10.8396H21.0052V5.78313H21.2075Z"></path>
            <path fill="#2B2824" d="M269.327 4.77203C264.875 7.40142 262.648 10.4353 262.648 14.076C262.648 17.3122 264.875 20.1439 269.327 22.571C273.779 24.9981 279.041 26.2117 284.91 26.2117C290.982 26.2117 296.244 24.9981 300.696 22.571C305.148 20.1439 307.375 17.3122 307.375 14.076C307.375 10.4353 305.148 7.40142 300.898 4.77203C296.446 2.14263 291.387 0.726807 285.518 0.726807C279.041 0.726807 273.779 2.14263 269.327 4.77203ZM290.779 7.19915C292.398 8.81724 293.006 10.8398 293.006 13.267C293.006 15.6941 292.196 17.7167 290.779 19.3348C289.363 20.7506 287.339 21.5597 284.708 21.5597C282.279 21.5597 280.256 20.7506 278.637 19.3348C277.22 17.919 276.41 15.8964 276.41 13.267C276.41 10.8398 277.22 8.61498 278.637 7.19915C280.256 5.58106 282.077 4.77203 284.708 4.77203C287.339 4.97429 289.363 5.78332 290.779 7.19915Z"></path>
            <path fill="#2B2824" d="M184.731 4.77203C180.279 7.40142 178.053 10.4353 178.053 14.076C178.053 17.3122 180.279 20.1439 184.731 22.571C189.184 24.9981 194.446 26.2117 200.315 26.2117C206.386 26.2117 211.648 24.9981 216.1 22.571C220.553 20.1439 222.779 17.3122 222.779 14.076C222.779 10.4353 220.553 7.40142 216.303 4.77203C211.85 2.14263 206.791 0.726807 200.922 0.726807C194.648 0.726807 189.184 2.14263 184.731 4.77203ZM206.386 7.19915C208.005 8.81724 208.815 10.8398 208.815 13.267C208.815 15.6941 208.005 17.7167 206.588 19.3348C205.172 20.7506 203.148 21.5597 200.517 21.5597C198.088 21.5597 196.065 20.7506 194.446 19.3348C193.029 17.919 192.219 15.8964 192.219 13.267C192.219 10.8398 193.029 8.61498 194.446 7.19915C196.065 5.58106 198.088 4.77203 200.517 4.77203C202.946 4.97429 204.767 5.78332 206.386 7.19915Z"></path>
            <path fill="#2B2824" d="M440.744 26.0092V14.2781C442.767 16.7053 445.803 18.5256 449.446 19.9414C453.089 21.3573 457.136 21.964 461.589 21.964C466.244 21.964 468.672 21.3572 468.672 20.1437C468.672 19.5369 468.267 19.1324 467.66 18.9301C467.053 18.7279 465.434 18.5256 463.208 18.3233L458.148 17.9188C452.077 17.5143 448.029 16.7052 445.398 15.6939C441.553 14.0759 439.529 11.851 439.529 9.01935C439.529 6.38996 440.744 4.16511 443.577 2.74929C446.208 1.13121 449.851 0.524414 454.505 0.524414C458.958 0.524414 463.005 1.13121 466.446 2.34478L467.458 2.74929L474.136 0.726687V10.6374C468.065 6.59223 461.386 4.56962 454.505 4.56962C450.256 4.56962 448.232 5.17642 448.232 6.38999C448.232 6.99677 448.839 7.40128 449.851 7.8058C450.863 8.00806 452.886 8.41257 455.72 8.61483L460.779 9.01935C467.053 9.42387 471.303 10.2329 473.327 11.2442C476.97 12.8623 478.589 15.2894 478.589 18.1211C478.589 20.7505 477.172 22.7731 474.339 24.1889C471.505 25.6047 467.66 26.4138 463.005 26.4138C457.946 26.4138 452.684 25.6047 447.422 23.7844L440.744 26.0092Z"></path>
            </svg>
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