const puppeteer = require('puppeteer-extra');

const scrapeSweetWater = async (guitarType) => {
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({headless: false});

    const acousticUrl = "https://www.sweetwater.com/c988--Left_handed_Acoustic_Guitars?ost=&pn=1"
    const electricUrl = "https://www.sweetwater.com/c595--Left_handed_Electric_Guitars?ost=&pn=1"
    const bassUrl = "https://www.sweetwater.com/c1015--Left_handed_Bass_Guitars?ost=&pn=1"

    const url = guitarType === 'acoustic' ? acousticUrl : guitarType === 'electric' ? electricUrl : bassUrl;

    const scrapePage = async () => {
      await autoScroll(page)
      const data = await page.evaluate((guitarType) => {
        return Array.from(document.querySelectorAll(".products div.product-card")).map(product => ({
          website: "sweetwater",
          type: guitarType,
          name: product.querySelector('h2.product-card__name a').innerText.trim(),
          price: product.querySelector('strong.product-card__amount') !== null ? product.querySelector('strong.product-card__amount').innerText : "Out of Stock",
          link: product.querySelector('div.product-card__img a').href,
          image: product.querySelector('div.product-card__img a img').src
        }))
      }, guitarType)
      const next = await page.evaluate(() => document.querySelector("a.paginate-next") ? true : false)
      if (next) {
        await page.click('a.paginate-next')
        return data.concat(await scrapePage());
      } else {
        return data
      }
    }

    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'domcontentloaded'
    });
    const data = await scrapePage()
    await browser.close();
    return data
};

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

(async () => {
  
})();

module.exports = {
  scrapeSweetWater
};