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
      await autoScroll(page, 20)
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

async function autoScroll(page, speed){
  await page.evaluate((speed) => new Promise((resolve) => {
    var scrollTop = -1;
    const interval = setInterval(() => {
      window.scrollBy(0, 100);
      if(document.documentElement.scrollTop !== scrollTop) {
        scrollTop = document.documentElement.scrollTop;
        return;
      }
      clearInterval(interval);
      resolve();
    }, speed);
  }), speed);
};

const scrapeChicagoMusicExchange = async (guitarType) => {
  const StealthPlugin = require('puppeteer-extra-plugin-stealth')
  puppeteer.use(StealthPlugin())

  const browser = await puppeteer.launch({headless: false});

  const acousticUrl = "https://www.chicagomusicexchange.com/collections/acoustic-guitars-lefty?page=1"
  const electricUrl = "https://www.chicagomusicexchange.com/collections/electric-guitars-lefty?page=1"
  const bassUrl = "https://www.chicagomusicexchange.com/collections/basses-lefty?page=1"

  const url = guitarType === 'acoustic' ? acousticUrl : guitarType === 'electric' ? electricUrl : bassUrl;

  const scrapePage = async () => {
    await page.waitForTimeout(3000).then(() => console.log('Waiting...'));
    await autoScroll(page, 200)
    const data = await page.evaluate((guitarType) => {
      return Array.from(document.querySelectorAll("div.ss-item-container div.ss-result-item")).map(product => ({
        website: "chicagomusicexchange",
        type: guitarType,
        name: product.querySelector('h5.product-thumb-caption-title').innerText.trim(),
        price: product.querySelector('p.money').innerText,
        link: product.querySelector('div.product-thumb > a').href,
        image: product.querySelector('div.product-thumb-img-wrap a img').src
      }))
    }, guitarType)
    const next = await page.evaluate(() => document.querySelector("li.last.ng-scope a") ? true : false)
    if (next) {
      await page.click('li.last.ng-scope a')
      return data.concat(await scrapePage());
    } else {
      return data
    }
  }

  const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: 'domcontentloaded'
  });

  /*Remove Popup*/
  await page.waitForTimeout(10000).then(() => console.log('Waiting for popup...'));
  await page.waitForSelector('iframe#attentive_creative');
  const popup = await page.$('#attentive_creative'); 
  const frame = await popup.contentFrame();
  await frame.waitForSelector('button#closeIconContainer');
  await frame.click('button#closeIconContainer')

  const data = await scrapePage()
  await browser.close();
  return data
};

const scrapeGuitarCenter = async (guitarType) => {
  const StealthPlugin = require('puppeteer-extra-plugin-stealth')
  puppeteer.use(StealthPlugin())

  const browser = await puppeteer.launch({headless: false});

  const acousticUrl = "https://www.guitarcenter.com/Left-Handed-Acoustic-Guitars.gc"
  const electricUrl = "https://www.guitarcenter.com/Left-Handed-Electric-Guitars.gc"
  const bassUrl = "https://www.guitarcenter.com/Left-Handed-Electric-Bass.gc"

  const url = guitarType === 'acoustic' ? acousticUrl : guitarType === 'electric' ? electricUrl : bassUrl;

  const scrapePage = async () => {
    await page.waitForTimeout(3000).then(() => console.log('Waiting...'));
    const data = await page.evaluate((guitarType) => {
      return Array.from(document.querySelectorAll("div.productGrid li.product-container")).map(product => ({
        website: "guitarcenter",
        type: guitarType,
        name: product.querySelector('div.productTitle a').innerText.trim(),
        price: product.querySelector('div.mainPrice span.productPrice').innerText.replace(/\n/g, "").replace("Your Price", "").trim(),
        link: product.querySelector('div.thumb > a').href,
        image: product.querySelector('div.thumb a img').src
      }))
    }, guitarType)

    const next = await page.evaluate(() => document.querySelector("a.-next") ? true : false)
    if (next) {
      await page.click('a.-next')
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
}

module.exports = {
  scrapeSweetWater,
  scrapeChicagoMusicExchange,
  scrapeGuitarCenter
};