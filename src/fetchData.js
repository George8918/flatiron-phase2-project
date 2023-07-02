const fs = require('fs');
const fetch = require('node-fetch');

fetch('https://pixabay.com/api/?key=YOUR_API_KEY&q=cuisine&per_page=10')
  .then((response) => response.json())
  .then((data) => {
    if (data.hits) { 
        fs.readFile('db.json', 'utf8', (err, fileData) => {
            if (err) {
              console.error('Error reading db.json:', err);
              return;
            }

        const jsonData = JSON.parse(fileData);

        const extractedData = data.hits.map((hit) => ({
            id: hit.id,
            imageUrl: hit.webformatURL,
            title: hit.tags,
            description: '',
          }));
          jsonData.cuisines = extractedData;