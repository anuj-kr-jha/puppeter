import { promises as fs } from 'fs';

// take screenshot of the current page
export async function takeScreenshot(page, path = 'screenshot.png') {
    await page.screenshot({ path: path });
}

export async function grabElement(page, selector) {
    const e = await page.evaluate(() => {
        const elem = document.querySelector(selector);
        return elem.innerHTML;
    });
    return e;
}

export async function readCSV(path = './list.csv') {
    const data = (await fs.readFile(path)).toString(); // split(/[,\r\n]+/)
    const [r1, ...rest] = data.split('\r\n');
    const keys = r1.split(',');
    const json = rest.map((r) => {
        const values = r.split(',');
        const obj = {};
        keys.forEach((k, i) => {
            obj[k] = values[i];
        });
        return obj;
    });
    // const values = data.split('\r\n')[0].split(',');
    // const parsedData = await neatCsv(data);
    // return parsedData.toString();
    return json;
}

/*

s2,a2@gmail.com
s3,a3@gmail.com
s4,a4@gmail.com
s5,a5@gmail.com
s6,a6@gmail.com

*/
