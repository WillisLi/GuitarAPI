const mongoose = require("mongoose");
const Guitars = require("./model");
const Scrapers = require("./scrapers");
require('dotenv').config();

(async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(async () => {
            console.log("Connected")
            await Guitars.deleteMany({}).then(() => console.log("Deleted Data."))

            const acousticSweetwater = await Scrapers.scrapeSweetWater("acoustic");
            const electricSweetwater = await Scrapers.scrapeSweetWater("electric");
            const bassSweetwater = await Scrapers.scrapeSweetWater("bass");

            const acousticChicagoMusicExchange = await Scrapers.scrapeChicagoMusicExchange("acoustic");
            const electricChicagoMusicExchange = await Scrapers.scrapeChicagoMusicExchange("electric");
            const bassChicagoMusicExchange = await Scrapers.scrapeChicagoMusicExchange("bass");

            const data = [
                ...acousticSweetwater, ...electricSweetwater, ...bassSweetwater, 
                ...acousticChicagoMusicExchange, ...electricChicagoMusicExchange, ...bassChicagoMusicExchange
            ];
            
            for (let guitar of data) {
                const newGuitar = new Guitars(guitar)
                await newGuitar.save().catch(error => console.log(guitar, error))
            }
            console.log(data)
            mongoose.disconnect();
        })
        .catch(error => {
            console.log(error)
        })
})();