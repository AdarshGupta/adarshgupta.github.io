/*
To run this script - `node minifyImages.js`
Step 1: Remove the re-size logic and convert the file to webp if not already done
Step 2: Use the re-size logic to compress the image to desired thumbnail size
*/
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const directory = './assets/img/thumbnails';

fs.readdirSync(directory).forEach(file => {
    var outputFileName = path.parse(file).name + '.webp';

    sharp(`${directory}/${file}`)
    .resize({ width: 500 }) // width, height auto scale;  Note: Can comment this line if no resize required
    .webp()
    .toFile(`./assets/img/thumbnails-small/${outputFileName}`, (err, info) => {
        if(err){
            console.log(info);
            console.log(err);
        }
    });
});