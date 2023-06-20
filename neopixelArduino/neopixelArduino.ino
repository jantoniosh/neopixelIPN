#include <ArduinoJson.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

#define PIN 2 
#define NUMPIXELS 8

Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

StaticJsonDocument<200> doc;

void setup() {
  Serial.begin(9600);
  while (!Serial) continue;

  pixels.begin();
}

void loop() {
  if (Serial.available()) {
    String data = Serial.readStringUntil('\n');
    Serial.println(data);
    
    DeserializationError error = deserializeJson(doc, data);
    
    // Test if parsing succeeds.
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }
    
    long r = doc["r"];
    long g = doc["g"];
    long b = doc["b"];

    pixels.clear();
    
    for(int i=0; i<NUMPIXELS; i++) {
      pixels.setPixelColor(i, pixels.Color(r, g, b));
    }
    pixels.show();
  }
}
