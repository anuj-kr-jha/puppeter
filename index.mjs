import puppeteer from 'puppeteer-extra';
import chromium from 'chrome-aws-lambda';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { takeScreenshot, grabElement } from './util.mjs';

puppeteer.use(StealthPlugin());
StealthPlugin.setMaxListeners = () => {};

process.env.USERNAME = 'akjha3314@gmail.com';
process.env.PASSWORD = 'password';

const url = 'https://accounts.google.com/v3/signin/identifier?dsh=S889591592%3A1664099511058827&continue=https%3A%2F%2Fmail.google.com&ec=GAlAFw&hl=en&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession';

const options = {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
};

const selectors = {
    signIn: '#gb > div > div.gb_Re > a',
    email: 'input[type="email"]',
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        dumpio: false,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setBypassCSP(true);
    await page.goto(url, options);

    // await page.mainFrame().waitForSelector('#identifierId');
    // console.log('Typing email...');
    // await page.type('#identifierId', process.env.USERNAME);
    // await page.mainFrame().waitForSelector('#identifierNext');
    // console.log('Clicking next button...');
    // await page.click('#identifierNext');
    // await page.waitFor(3000);

    // click on the sign in button
    // await page.click(selectors.signIn);

    await page.waitForSelector(selectors.email);
    await page.$eval(
        selectors.email,
        (el, _username) => {
            el.value = _username;
        },
        process.env.USERNAME
    );
    await page.keyboard.press('Enter');
    // await page.$eval(
    //     selectors.email,
    //     (el, _password) => {
    //         el.value = _password;
    //     },
    //     process.env.PASSWORD
    // );

    // fill in the email field of gmail

    // await page.type(selectors.email, 'akjha3314@gmail.com');
    // await page.type('#identifierId', 'Bovkkib@2');
    // await page.click('#identifierNext');
    // await browser.close();
})();
