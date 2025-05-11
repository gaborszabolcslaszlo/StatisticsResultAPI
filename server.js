const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Használjuk a 'public/images' mappát statikus fájlokhoz
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

app.post('/getCalculateDate', (req, res) => {
    const date = req.body.date;

    if (!date) {
        return res.status(400).json({ error: 'Missing date parameter' });
    }

    // 1. Lefuttatjuk a python scriptet
    exec(`python3 generate_images.py "${date}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Hiba a Python script futtatásakor: ${stderr}`);
            return res.status(500).json({ error: 'Hiba a képgenerálás közben' });
        }

        // 2. Listázzuk az összes képet a mappában
        const imageFolder = path.join(__dirname, 'images');
        fs.readdir(imageFolder, (err, files) => {
            if (err) {
                console.error('Nem sikerült listázni a képeket:', err);
                return res.status(500).json({ error: 'Nem sikerült listázni a képeket' });
            }

            // Csak JPG/JPEG képeket adunk vissza
            const imageUrls = files
                .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
                .map(file => `http://localhost:${PORT}/images/${file}`);

            return res.json({ images: imageUrls });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
