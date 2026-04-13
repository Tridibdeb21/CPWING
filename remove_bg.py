from PIL import Image
import numpy as np

# Open the logo
img = Image.open(r"C:\Users\USER\Downloads\logo_cp_wing.jpeg").convert("RGBA")
data = np.array(img)

r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Define "white-ish" pixels — anything with R>220, G>220, B>220
white_mask = (r > 220) & (g > 220) & (b > 220)

# Make white pixels transparent
data[white_mask, 3] = 0

result = Image.fromarray(data)

# Crop to the actual content (trim transparent edges)
bbox = result.getbbox()
if bbox:
    result = result.crop(bbox)

result.save(r"C:\Users\USER\Desktop\CPWING\public\logo.png", "PNG")
print(f"Done! Saved logo.png, size: {result.size}")
