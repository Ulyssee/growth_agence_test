const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin/", { waitUntil: 'load' });
    await page.click('#username')
    await page.keyboard.type('ulysse.mf@hotmail.fr');
    await page.click('[id="password"]')
    await page.keyboard.type('Derichebourg1');
    await page.click('[type="submit"]')
    await page.goto("https://www.linkedin.com/mynetwork/", { timeout: 0, waitUntil: 'load' });
    await page.goto("https://www.linkedin.com/feed/update/urn:li:activity:6947463737259769856/", { timeout: 0, waitUntil: 'load' });
    await page.click('[class="social-details-social-counts__reactions-count"]');
    await page.click('[data-js-reaction-tab="LIKE"]')

    const linkedinHandles = await page.$$('#ember1720');
    for (const linkedinhandle of linkedinHandles){
        const title = await page.evaluate(el => el.querySelector("span").textContent, linkedinhandle)

        console.log(title)
    }

    await page.screenshot({ path: 'screenshot0.png' });
    await browser.close();
})();
