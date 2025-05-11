# generate_images.py
import sys
import os
from PIL import Image, ImageDraw

date = sys.argv[1]
folder = 'images'
os.makedirs(folder, exist_ok=True)

# Dummy kép generálás (teszt)
for i in range(3):
    img = Image.new('RGB', (200, 100), color=(73, 109, 137))
    d = ImageDraw.Draw(img)
    d.text((10, 10), f"{date} - Kép {i+1}", fill=(255, 255, 0))
    img.save(f'{folder}/image_{i+1}.jpg')
