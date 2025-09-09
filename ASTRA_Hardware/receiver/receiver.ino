#include <HardwareSerial.h>

HardwareSerial RxSerial(1);

void setup() {
  Serial.begin(115200);
  RxSerial.begin(2400,SERIAL_8N1,18,19);
}

void loop(){
  String received="";
  while(RxSerial.available()){
    received=char(RxSerial.read());
    Serial.print(received);
  }




}