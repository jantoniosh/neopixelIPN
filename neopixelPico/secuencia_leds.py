# Example showing how functions, that accept tuples of rgb values,
# simplify working with gradients

import time
from neopixel import Neopixel

numpix = 8
strip = Neopixel(numpix, 0, 22, "GRB")
# strip = Neopixel(numpsix, 0, 0, "GRBW")

red = (255, 0, 0)
orange = (255, 50, 0)
yellow = (255, 100, 0)
green = (0, 255, 0)
blue = (0, 0, 255)
cyan = (0, 255, 255)
violet = (200, 0, 100)
colors_rgb = [red, orange, yellow, green, blue, cyan, violet]

# same colors as normaln rgb, just 0 added at the end
colors_rgbw = [color+tuple([0]) for color in colors_rgb]
colors_rgbw.append((0, 0, 0, 255))

# uncomment colors_rgbw if you have RGBW strip
colors = colors_rgb
# colors = colors_rgbw


step = round(numpix / len(colors))
current_pixel = 0
current_color = 0
strip.brightness(50)

while True:
    strip.set_pixel_line(0, numpix - 1, (0,0,0))
    strip.show()
    strip.set_pixel(current_pixel, colors_rgb[current_color])
    strip.show()
    current_pixel = current_pixel + 1
    if current_pixel == 8:
        current_pixel = 0
        current_color = current_color + 1
        if current_color == 7:
            current_color = 0
    time.sleep(0.5)
