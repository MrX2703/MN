const fetch = require('node-fetch');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  try {
    const response = await fetch('https://majhinaukri.in');
    const html = await response.text();

    const $ = cheerio.load(html);
    const jobs = [];

    // Update the selectors based on MajhiNaukri.com's structure
    $('.job-listing').each((index, element) => {
      const title = $(element).find('.job-title').text().trim();
      const location = $(element).find('.job-location').text().trim();
      const link = $(element).find('a').attr('href');

      if (title && location && link) {
        jobs.push({ title, location, link });
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(jobs),
    };
  } catch (error) {
    console.error('Error scraping jobs:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch job data' }),
    };
  }
}; 
