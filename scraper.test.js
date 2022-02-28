const Scrapers = require('./scrapers');

jest.setTimeout(200000);

describe('SweetWater', () => {
    test('Test if SweetWater Scraper for Acoustics is returning the correct response', async () => {
        const acousticSweetwater = await Scrapers.scrapeSweetWater("acoustic");
        expect(acousticSweetwater.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
    test('Test if SweetWater Scraper for Electrics is returning the correct response', async () => {
        const electricSweetwater = await Scrapers.scrapeSweetWater("electric");
        expect(electricSweetwater.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
    test('Test if SweetWater Scraper for Bass is returning the correct response', async () => {
        const bassSweetwater = await Scrapers.scrapeSweetWater("bass");
        expect(bassSweetwater.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
})


describe('Chicago Music Exchange', () => {
    test('Test if Chicago Music Exchange Scraper for Acoustics is returning the correct response', async () => {
        const acousticChicagoMusicExchange = await Scrapers.scrapeChicagoMusicExchange("acoustic");
        expect(acousticChicagoMusicExchange.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
    test('Test if Chicago Music Exchange Scraper for Electrics is returning the correct response', async () => {
        const electricChicagoMusicExchange = await Scrapers.scrapeChicagoMusicExchange("electric");
        expect(electricChicagoMusicExchange.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
    test('Test if Chicago Music Exchange Scraper for Bass is returning the correct response', async () => {
        const bassChicagoMusicExchange = await Scrapers.scrapeChicagoMusicExchange("bass");
        expect(bassChicagoMusicExchange.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
})


describe('Guitar Center', () => {
    test('Test if Guitar Center Scraper for Acoustics is returning the correct response', async () => {
        const acousticGuitarCenter = await Scrapers.scrapeGuitarCenter("acoustic");
        expect(acousticGuitarCenter.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
    test('Test if Guitar Center Scraper for Electrics is returning the correct response', async () => {
        const electricGuitarCenter = await Scrapers.scrapeGuitarCenter("electric");
        expect(electricGuitarCenter.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    })
    test('Test if Guitar Center Scraper for Bass is returning the correct response', async () => {
        const bassGuitarCenter = await Scrapers.scrapeGuitarCenter("bass");
        expect(bassGuitarCenter.every((guitar) => Object.values(guitar).every((prop) => prop !== null || prop !== ''))).toBeTruthy();
    }) 
})