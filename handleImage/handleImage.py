import random
import base64
import cv2
import numpy as np
from io import BytesIO
from PIL import Image

from paho.mqtt import client as mqtt_client

broker = 'broker.emqx.io'
port = 1883
topic = "DATN20172605/handleImage"
# Generate a Client ID with the subscribe prefix.
client_id = f'subscribe-{random.randint(0, 100)}'
# username = 'emqx'
# password = 'public'


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    # client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        Fire_Reported = 0

        img_string = msg.payload.decode()
        img_data = base64.b64decode(img_string)
        img_arr = np.frombuffer(img_data, dtype=np.uint8)
        frame = cv2.imdecode(img_arr, flags=cv2.IMREAD_COLOR)
        
        frame = cv2.resize(frame, (960, 540))

        blur = cv2.GaussianBlur(frame, (21, 21), 0)
        hsv = cv2.cvtColor(blur, cv2.COLOR_BGR2HSV)

        lower = [18, 50, 50]
        upper = [35, 255, 255]
        lower = np.array(lower, dtype="uint8")
        upper = np.array(upper, dtype="uint8")

        mask = cv2.inRange(hsv, lower, upper)

        output = cv2.bitwise_and(frame, hsv, mask=mask)

        no_red = cv2.countNonZero(mask)

        if int(no_red) > 15000:
            Fire_Reported = Fire_Reported + 1

        cv2.imshow(f'output-{random.randint(0, 100)}', output)
        print(Fire_Reported)

    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == '__main__':
    run()