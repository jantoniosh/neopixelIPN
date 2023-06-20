import sys
import ujson
from neopixel import Neopixel

numpix = 8
strip = Neopixel(numpix, 0, 22, "GRB")

while True:
    # read a command from the host
    v = sys.stdin.readline().strip()
    vJson = ujson.loads(v)
    strip.set_pixel_line(0, numpix - 1, (vJson['r'],vJson['g'],vJson['b']))
    strip.show()