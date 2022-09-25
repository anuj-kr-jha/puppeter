import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { readCSV } from './util.mjs';
import './env.mjs';

const selectors = {
    email: '[type="email"]',
    // password: '[type="password"]', // not working
    password: '[name="Passwd"]',
    emailNextButton: '#identifierNext',
    passwordNextButton: '#passwordNext',
    composeButton: 'div[role="button"][gh="cm"]',
    to: '[name="to"]',
    subject: '[name="subjectbox"]',
    body: 'div[aria-label="Message Body"]',
    sendButton: 'div[role="button"][data-tooltip="Send ‪(Ctrl-Enter)‬"]', //
};

async function login(page) {
    await page.goto('https://mail.google.com/mail/u/0/?ogbl#inbox', {
        waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'],
    });

    /*  Enter E-MAIL */
    {
        // await page.type(selectors.email, process.env.USERNAME);
        // await page.click(selectors.emailNextButton);
        // /*
        await page.waitForSelector(selectors.email);
        await page.waitForSelector(selectors.emailNextButton);
        await page.$eval(selectors.email, (el, val) => (el.value = val), process.env.USERNAME);
        const button = await page.$(selectors.emailNextButton);
        await button.evaluate((btn) => btn.click());
        // */
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
}

async function composeMail(page, data, cb = () => {}) {
    /* Click on compose mail button */
    {
        await page.waitForSelector(selectors.composeButton);
        const button = await page.$(selectors.composeButton);
        await button.evaluate((btn) => btn.click());
    }

    /* Compose Mail */
    {
        await page.waitForSelector(selectors.to);
        await page.waitForSelector(selectors.subject);
        await page.waitForSelector(selectors.body);
        await page.waitForSelector(selectors.sendButton);
        await page.waitForTimeout(500);
        await page.type(selectors.to, data.to ?? 'anujkumar000000@gmail.com');
        // await page.type(selectors.subject, data.subject ?? 'Test Mail');
        // await page.type(selectors.body, data.body ?? 'Test body');
        // await page.click(selectors.sendButton);

        // await page.$eval(selectors.to, (el, val) => (el.value = val), data.to ?? 'anujkumar000000@gmail.com');
        await page.$eval(selectors.subject, (el, val) => (el.value = val), data.subject ?? 'Test Mail');
        await page.$eval(selectors.body, (el, val) => (el.value = val), data.body ?? 'Test body');
        const button = await page.$(selectors.sendButton);
        await button.evaluate((btn) => btn.click());
        console.log('Mail Composed', data);
        cb();
    }
}

(async () => {
    puppeteer.use(stealthPlugin());
    const browser = await puppeteer.launch({ headless: false, slowMo: 0 });
    const page = await browser.newPage();
    let list = await readCSV('./list.csv');
    list = list.map((d) => {
        const obj = {};
        obj.to = d.email;
        obj.subject = d.subject;
        obj.body = 'Test Body';
        return obj;
    });
    console.log({ list });
    await login(page);
    for (const data of list) {
        // await page.waitForTimeout(2000);
        await composeMail(page, data, () => {});
    }
    // await page.close();
    // await browser.close();
})();
