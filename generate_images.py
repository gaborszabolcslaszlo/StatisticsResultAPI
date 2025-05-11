# generate_images.py
import sys
from PIL import Image, ImageDraw
from datetime import datetime
import os

def generate_image(date_string):
    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)

    img = Image.new("RGB", (200, 100), color=(73, 109, 137))
    d = ImageDraw.Draw(img)
    d.text((10, 40), f"Date: {date_string}", fill=(255, 255, 0))

    file_path = os.path.join(output_dir, f"{date_string}.jpg")
    img.save(file_path)
    print(file_path)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python generate_images.py <date>", file=sys.stderr)
        sys.exit(1)

    generate_image(sys.argv[1])
