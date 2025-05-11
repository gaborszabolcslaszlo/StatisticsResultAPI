const express = require("express");
const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

app.get("/getCalculateDate", (req, res) => {
    const date = req.body.date;
    if (!date) return res.status(400).json({ error: "Missing date" });

    const script = "generate_images.py";

    execFile("python3", [script, date], (error, stdout, stderr) => {
        if (error) {
            console.error(stderr);
            return res.status(500).json({ error: "Python script failed" });
        }

        const imagePath = stdout.trim();
        fs.readFile(imagePath, (err, data) => {
            if (err) return res.status(500).json({ error: "Image read failed" });

            res.setHeader("Content-Type", "image/jpeg");
            res.send(data);
        });
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
