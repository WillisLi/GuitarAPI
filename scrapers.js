const puppeteer = require('puppeteer-extra');

(async () => {
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({headless: false});

    const scrapePage = async (url, current) => {
      await page.goto(url, {
        waitUntil: 'domcontentloaded'
      });
      await autoScroll(page)
      const data = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".products div.product-card")).map(product => ({
          name: product.querySelector('h2.product-card__name a').innerText.trim(),
          price: product.querySelector('strong.product-card__amount').innerText,
          link: product.querySelector('div.product-card__img a').href,
          image: product.querySelector('div.product-card__img a img').src
        }))
      })

      const next = await page.evaluate(() => document.querySelector("a.paginate-next") ? true : false)
      if (next) {
        return data.concat(await scrapePage(`https://www.sweetwater.com/c988--Left_handed_Acoustic_Guitars?ost=&sb=popular&pn=${current}`, current + 1));
      } else {
        return data
      }
    }

    const page = await browser.newPage();
    const data = await scrapePage('https://www.sweetwater.com/c988--Left_handed_Acoustic_Guitars?ost=&sb=popular&pn=1', 2)
    console.log(data)
})();

async function autoScroll(page){
  await page.evaluate(() => new Promise((resolve) => {
    var scrollTop = -1;
    const interval = setInterval(() => {
      window.scrollBy(0, 100);
      if(document.documentElement.scrollTop !== scrollTop) {
        scrollTop = document.documentElement.scrollTop;
        return;
      }
      clearInterval(interval);
      resolve();
    }, 20);
  }));
}

// exports.modules = {
//     scrapeSweetWater
// }