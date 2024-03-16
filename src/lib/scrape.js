import puppeteer from 'puppeteer';

export default async function fetchData(url, cccc, select, sum) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.type('input[name="CCCC"]', cccc);
    await page.select('select[name="MSG_TYPE"]', select);
    await page.click('input[type="SUBMIT"]');
    await page.waitForSelector('table');

    const result = await page.evaluate((sum) => {
        const content = document.documentElement.innerHTML;
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


/**
 * Script ini dibuat untuk kebutuhan scraping data CMSS
 * Mohon untuk menggunakan script ini dengan bijak
 * Jika ada kesalahan silahkan hubungi pembuat script ini
 * 
 * Author: Satriyo Unggul Wicaksono
 * Email: mail@satrio.dev
 * 
 * Thanks to:
 * - My Daughter
 * - My Wife
 * - My Parent
 * - BMKG Cilacap
 */