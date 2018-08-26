void setup() {
  // initialize serial:
  Serial.begin(9600);

  ; // wait for serial port to connect. Needed for native USB port only
  while (!Serial) {}

  delay(5 * 1000);

  Serial.println("ready");

}

void loop() {

  if (Serial.available() > 0){
    String message = Serial.readStringUntil('\n');
    
    Serial.print("message received: ");
    Serial.println(message);
  }
  
}


