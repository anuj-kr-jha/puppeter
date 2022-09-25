import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

process.env.USERNAME = 'akjha3314@gmail.com';
process.env.PASSWORD = 'Bovkkib@2';

const selectors = {
    email: '[type="email"]',
    // password: '[type="password"]', // not working
    password: '[name="Passwd"]',
    emailNextButton: '#identifierNext',
    passwordNextButton: '#passwordNext',
    composeButton: 'div[role="button"][gh="cm"]',
};

(async () => {
    puppeteer.use(stealthPlugin());
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://mail.google.com/mail/u/0/?ogbl#inbox', {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
    });

    /*  Enter E-MAIL */
    {
        await page.type(selectors.email, process.env.USERNAME);
        await page.click(selectors.emailNextButton);
        /*
            await page.waitForSelector(selectors.email);
            await page.waitForSelector(selectors.emailNextButton);
            await page.$eval(selectors.email, (el, val) => (el.value = val), process.env.USERNAME);
            const button = await page.$(selectors.emailNextButton);
            await button.evaluate((btn) => btn.click());
        */
    }
    /*  Enter PASSWORD */
    {
        /*
            await page.waitForTimeout(5500);
            await page.type(selectors.password, process.env.PASSWORD);
            await page.click(selectors.passwordNextButton);
        */

        await page.waitForSelector(selectors.password);
        await page.waitForSelector(selectors.passwordNextButton);
        await page.$eval(selectors.password, (el, val) => (el.value = val), process.env.PASSWORD);
        const button = await page.$(selectors.passwordNextButton);
        await button.evaluate((btn) => btn.click());
    }

    /* Click on compose mail button */
    {
        await page.waitForSelector(selectors.composeButton);
        const button = await page.$(selectors.composeButton);
        await button.evaluate((btn) => btn.click());
    }

    // await browser.close();
})();

// import puppeteer from 'puppeteer-extra';
// import chromium from 'chrome-aws-lambda';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import { takeScreenshot, grabElement } from './util.mjs';

// puppeteer.use(StealthPlugin());
// StealthPlugin.setMaxListeners = () => {};

// process.env.USERNAME = 'akjha3314@gmail.com';
// process.env.PASSWORD = 'password';

// const url = 'https://accounts.google.com/v3/signin/identifier?dsh=S889591592%3A1664099511058827&continue=https%3A%2F%2Fmail.google.com&ec=GAlAFw&hl=en&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession';

// const options = {
//     waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
// };

// const selectors = {
//     signIn: '#gb > div > div.gb_Re > a',
//     email: 'input[type="email"]',
// };

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         // args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         args: chromium.args,
//         defaultViewport: chromium.defaultViewport,
//         dumpio: false,
//         executablePath: await chromium.executablePath,
//         headless: chromium.headless,
//         ignoreHTTPSErrors: true,
//     });
//     const page = await browser.newPage();
//     await page.setBypassCSP(true);
//     await page.goto(url, options);

//     // await page.mainFrame().waitForSelector('#identifierId');
//     // console.log('Typing email...');
//     // await page.type('#identifierId', process.env.USERNAME);
//     // await page.mainFrame().waitForSelector('#identifierNext');
//     // console.log('Clicking next button...');
//     // await page.click('#identifierNext');
//     // await page.waitFor(3000);

//     // click on the sign in button
//     // await page.click(selectors.signIn);

//     await page.waitForSelector(selectors.email);
//     await page.$eval(
//         selectors.email,
//         (el, _username) => {
//             el.value = _username;
//         },
//         process.env.USERNAME
//     );
//     await page.keyboard.press('Enter');
//     // await page.$eval(
//     //     selectors.email,
//     //     (el, _password) => {
//     //         el.value = _password;
//     //     },
//     //     process.env.PASSWORD
//     // );

//     // fill in the email field of gmail

//     // await page.type(selectors.email, 'akjha3314@gmail.com');
//     // await page.type('#identifierId', 'Bovkkib@2');
//     // await page.click('#identifierNext');
//     // await browser.close();
// })();
