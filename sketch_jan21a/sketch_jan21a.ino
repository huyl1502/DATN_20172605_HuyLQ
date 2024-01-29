#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

#define DHTTYPE DHT11 // DHT 11

static char data[] = "";

const int DHTPin = 4;

DHT dht(DHTPin, DHTTYPE);     // Initialize DHT sensor.
static char celsiusTemp[7];
static char humidityTemp[7];
static char gasTemp[7];
static char agasTemp[7];

// Update these with values suitable for your network.

const char* ssid = "Huy";
const char* password = "h150201H";
const char* mqtt_server = "broker.emqx.io";

WiFiClient espClient;
PubSubClient client(espClient);
unsigned long lastMsg = 0;
#define MSG_BUFFER_SIZE	(50)
char msg[MSG_BUFFER_SIZE];
int value = 0;

void setup_wifi() {

  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void warning() {
    tone(12,220,125);
    delay(125);
    tone(12,2093,250);
    delay(250);
    tone(12,82,125);
    delay(125);
}

void callback(char* topic, byte* payload, unsigned int length) {
  warning();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      // client.publish("DATN20172605/Device", "MQTT Server is Connected");
      // ... and resubscribe
      client.subscribe("DATN20172605/warning");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  pinMode(12,OUTPUT);
  dht.begin();
}

void loop() {
  // Connect MQTT
  if (!client.connected()) {
    reconnect();
  }

  // Wait 5 seconds
  delay(5000);
  
  // Read MQ6
  float g = digitalRead(5);
  float ag = analogRead(A0);

  // Read DHT11
  float h = dht.readHumidity();
  float t = dht.readTemperature(false);
  if (isnan(h) || isnan(t) || isnan(g) || isnan(ag)) {
    Serial.println("Failed to read!");
  }
  else {
    if (g != 0) {
      warning();
    }
    dtostrf(h, 5, 2, humidityTemp);
    dtostrf(t, 6, 2, celsiusTemp);
    dtostrf(g, 5, 2, gasTemp);
    dtostrf(ag, 5, 2, agasTemp);

    strcat(data, "NhaCuaHuy01");
    strcat(data, "~");
    strcat(data, celsiusTemp);
    strcat(data, "~");
    strcat(data, humidityTemp);
    strcat(data, "~");
    strcat(data, agasTemp);
    client.publish("DATN20172605/Device", data);

    strcpy(data, "");
  }

  client.loop();
}