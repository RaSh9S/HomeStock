const express = require('express');
const puppeteer = require('puppeteer');
const ScrapedProduct = require('../models/ScrapedProduct'); // Make sure path is correct

const router = express.Router();

router.get('/keells-products', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112 Safari/537.36'
    );

    await page.goto('https://www.keellssuper.com/product-listing', {
      waitUntil: 'domcontentloaded',
      timeout: 0
    });

    await page.waitForSelector('.product-card-name', { timeout: 20000 });

    await page.screenshot({ path: 'keells_debug.png', fullPage: true });

    const products = await page.evaluate(() => {
      const items = [];
      const productCards = document.querySelectorAll('.row');

      productCards.forEach(card => {
        const name = card.querySelector('.product-card-name')?.innerText?.trim();
        const price = card.querySelector('.product-card-final-price')?.innerText?.trim();
        const imageUrl = card.querySelector('img.img-fluid')?.src;

        if (name && price) {
          items.push({ name, price, imageUrl });
        }
      });

      return items;
    });

    await browser.close();

    // Save to DB
    if (products.length > 0) {
      await ScrapedProduct.insertMany(
        products.map(p => ({
          name: p.name,
          price: p.price,
          source: 'Keells',
          imageUrl: p.imageUrl,
        }))
      );
    }

    res.json(products);
  } catch (error) {
    console.error('Scraping failed:', error);
    res.status(500).json({ error: 'Scraping failed', message: error.message });
  }
});

module.exports = router;
