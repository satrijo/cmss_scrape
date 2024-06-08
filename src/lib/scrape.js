import puppeteer from 'puppeteer';

export default async function fetchData(url, cccc, select, sum, stnid) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('input[name="MAX_MSGS"]');
    if (cccc) {
        await page.type('input[name="CCCC"]', cccc);
    }

    if (stnid) {
        await page.type('input[name="STN_ID"]', stnid);
    }

    await page.type('input[name="MAX_MSGS"]', sum);
    await page.select('select[name="MSG_TYPE"]', select);
    await page.click('input[type="SUBMIT"]');
    await page.waitForSelector('table');
    await page.waitForSelector('pre');
    await page.waitForSelector('strong');

    await page.waitForNetworkIdle();

    const result = await page.evaluate((sum) => {
        const content = document.documentElement.innerHTML;
        sum = parseInt(sum);
        let results = [];
        if (content.includes('<pre>')) {
            const preElements = content.split('<pre>');
            preElements.shift();
            for (let i = 0; i < preElements.length; i++) {
                const element = preElements[i];
                const text = element.split('</pre>')[0];
                results.push(text.split('\n').filter(line => line.trim() !== ''));
                if (results.length === sum) {
                    break;
                }
            }
        }
        return results;
    }, sum);

    await browser.close();
    return result;
}