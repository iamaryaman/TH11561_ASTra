#include <HardwareSerial.h>

HardwareSerial TxSerial(1);

void setup() {
  Serial.begin(115200);
  TxSerial.begin(2400,SERIAL_8N1,18,19);
}

void loop() {
  TxSerial.flush();
  TxSerial.println("||AST-0001||I am lost"+String(millis()/1000));
  delay(100);
}
