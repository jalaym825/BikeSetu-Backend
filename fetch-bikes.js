const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBikeSetu() {
    try {
        // Fetch the HTML content of the website
        const response = await axios.get('https://bikesetu.com/');
        const html = response.data;

        // Load the HTML content into cheerio
        const $ = cheerio.load(html);

        // Extract information (example: getting all bike brands)
        const bikeBrands = [];
        $('.brand-item').each((index, element) => {
            const brand = $(element).find('.brand-name').text().trim();
            bikeBrands.push(brand);
        });

        console.log('Bike Brands:', bikeBrands);

        // You can add more scraping logic here based on the website structure

    } catch (error) {
        console.error('Error scraping the website:', error.message);
    }
}

// Run the scraper
scrapeBikeSetu();
