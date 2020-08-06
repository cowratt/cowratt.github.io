import os
from PIL import Image, ImageOps
size = 32 * 6
for filename in os.listdir():
    if filename.endswith(".png"):
        img = Image.open(filename)
        img = img.resize((size,size))
        if "white" in filename:
            img = ImageOps.mirror(img)
        img.save(filename.split(".png")[0] + "_" + str(size) + ".png")