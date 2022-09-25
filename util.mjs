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
