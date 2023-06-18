const request = require('request');
const fs = require('fs');

//enter url and filePath in command line
const url = process.argv[2];
const filePath = process.argv[3];

//create function that takes url and filepath
//use request to get data from url
//print error and status code if any
//fs.writeFile the body to filePath 
const fetcher = (url, filePath) => {
  request.get(url, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }

    if (response.statusCode !== 200) {
      console.log('Error: status code ', response.statusCode);
      return;
    }

    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }
      const fileSize = Buffer.byteLength(body);
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

fetcher(url, filePath);
