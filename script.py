import serial
import json
import paho.mqtt.client as mqtt

# UART
# ser = serial.Serial(
#     port = "COM3",
#     baudrate=115200,
#     timeout=1
# )

# MQTT
client = mqtt.Client()
client.connect("localhost", 1883, 60)


temperature = 0
light = 0
humidity = 0
x = 1
while x == 1:
    #line = ser.readline().decode().strip()
    line = "{\"temperature\":28.4,\"airHumidity\":51,\"light\":720}"
    if line:
        print(line)

    try:
        data = json.loads(line)

        # temperature = data.temperature
        # light = data.light
        # humidity = data.humidity
        x = 0
        client.publish("garden/sensors", line)
    
    except:
        value = line.split(",")
        temperature = value[0]
        light = value[1]
        humidity = value[2]
        