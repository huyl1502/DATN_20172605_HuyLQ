import cv2
import numpy as np

def run():
    i = 1
    while i <= 5:
        try:
            Fire_Reported = 0
            
            img_loc = str(i) + ".jpg"
            frame = cv2.imread(img_loc, cv2.IMREAD_COLOR)
            frame = cv2.resize(frame, (960, 540))

            blur = cv2.GaussianBlur(frame, (21, 21), 0)
            hsv = cv2.cvtColor(blur, cv2.COLOR_BGR2HSV)

            lower = [18, 50, 50]
            upper = [35, 255, 255]
            lower = np.array(lower, dtype="uint8")
            upper = np.array(upper, dtype="uint8")

            mask = cv2.inRange(hsv, lower, upper)

            no_red = cv2.countNonZero(mask)

            if int(no_red) > 15000:
                Fire_Reported = Fire_Reported + 1

            print(Fire_Reported)
            i = i + 1
        except:
            print("An exception occurred")

if __name__ == '__main__':
    run()
    