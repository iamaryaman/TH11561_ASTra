#include <QMC5883LCompass.h>

QMC5883LCompass compass;

void setup() {
  Serial.begin(115200);
  Wire.begin(21,22);
  compass.init();
  
}

void loop() {
  int x, y, z;
  
  // Read compass values
  compass.read();

  // Return XYZ readings
  x = compass.getX();
  y = compass.getY();
  z = compass.getZ();
  
  Serial.print("X: ");
  Serial.print(x);
  Serial.print(" Y: ");
  Serial.print(y);
  Serial.print(" Z: ");
  Serial.print(z);
  Serial.println();
  
  delay(2500);
}
