/*----------------------------------------------------
 Simple music play with Serial MP3 Player TD5580A chip.
 Copy the "exam.mp3" file to an empty SD card
 Connect Serial MP3 Player with ESP32:
      TX  --> Pin 16 (RX2)
      RX  --> Pin 17 (TX2)
      GND --> GND
      VCC --> 5V or 3.3V
----------------------------------------------------*/

#include <SerialMP3.h>

// ESP32 Serial2 pins
#define RX_PIN 25  // RX2 pin (connects to MP3 player TX)
#define TX_PIN 26  // TX2 pin (connects to MP3 player RX)

SerialMP3 mp3(RX_PIN, TX_PIN);

void setup() {
  Serial.begin(115200);    // Start serial interface for debugging
  mp3.showDebug(true);     // Print commands sent to Serial MP3 Player
  mp3.init();              // Initialize Serial MP3 Player
  
  Serial.println("MP3 Player initialized for TD5580A chip");
  mp3.play(1);              
  delay(3000);
  mp3.play(2);
  delay(3000);
  mp3.play(3);
  delay(3000);
  mp3.play(4);
  delay(3000);
}

void loop() {              
}