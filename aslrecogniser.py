from PIL import Image, ImageTk
import tkinter as tk
import cv2
import os
import numpy as np
from keras.models import model_from_json, load_model
import operator
import time
import sys, os
import matplotlib.pyplot as plt
from string import ascii_uppercase
class Application:
    def __init__(self):
        self.directory = 'model'

        self.vs = cv2.VideoCapture(0)
        self.current_image = None
        self.current_image2 = None
        #-------------------------
        # # self.json_file = open("C:/Users/Chandu/Desktop/STUDY/Capstone/p2/model/model.json", "r")
        # self.json_filer = open("C:/Users/Rahul/Desktop/project/project/model/model.json", "r")
        # self.model_json = self.json_filer.read()
        # self.json_filer.close()
        # self.loaded_model = model_from_json(self.model_json)
        # # self.loaded_model.load_weights("C:/Users/Chandu/Desktop/STUDY/Capstone/p2/model/model.h5")
        # self.loaded_model.load_weights("C:/Users/Rahul/Desktop/project/project/model/model.h5")
        #-------------------------------
        self.loaded_model = load_model(r"D:\14b\aug_vgg.h5")
        # self.loaded_model = load_model(r"C:\Users\Rahul\Desktop\SLD_LUV\Sign-Language-to-Text-master\model\model-bw.h5")
        # self.loaded_model = load_model(r"C:\Users\Rahul\Downloads\aug_incp.h5")
        self.ct = {}
        self.ct['blank'] = 0
        self.blank_flag = 0
        for i in ascii_uppercase:
            self.ct[i] = 0
        print("Loaded model from disk")
        self.root = tk.Tk()
        self.root.title("Sign language to Text Converter")
        self.root.protocol('WM_DELETE_WINDOW', self.destructor)
        self.root.geometry("900x900")
        self.panel = tk.Label(self.root)
        self.panel.place(x=135, y=10, width=640, height=520)
        self.panel2 = tk.Label(self.root)  # initialize image panel
        self.panel2.place(x=460, y=38, width=310, height=310)

        self.T = tk.Label(self.root)
        self.T.place(x=170, y=10)
        self.T.config(text="Sign Language to Text", font=("courier", 30, "bold"))
        def toggle_button_state():
            if self.button['text'] == 'On':
                self.button['text'] = 'Off'
            else:
                self.button['text'] = 'On'
        def freeze_state():
            if self.current_symbol == 'blank':
                self.sentence += self.word + ' '
                self.word = ''
            else:
                self.word += self.current_symbol
        # def key_pressed(event):
        #     print("key_pressed function has been called")
        #     """Callback function that will be called when a key is pressed"""
        #     key = event.char
        #     self.word += {key}
            print(f"Key pressed: {key}")  # Print the key to the console
            # label.config(text=f"Key pressed: {key}")  # Update the label with the key
            # if self.current_symbol == 'blank':
            #     self.sentence += {key} + ' '
            # else:
                
        self.button = tk.Button(self.root, text='On', command=toggle_button_state)
        self.button.pack(padx=5, pady=20, side=tk.LEFT)

        self.freezer = tk.Button(self.root, text='freeze', command=freeze_state)
        self.freezer.pack(padx=7, pady=23, side=tk.LEFT)
        self.panel3 = tk.Label(self.root)  # Current SYmbol
        self.panel3.place(x=500, y=520)
        self.T1 = tk.Label(self.root)
        self.T1.place(x=10, y=520)
        self.T1.config(text="Character :", font=("Courier", 30, "bold"))
        
        self.panel4 = tk.Label(self.root)  # Word
        self.panel4.place(x=220, y=570)
        self.T2 = tk.Label(self.root)
        self.T2.place(x=10, y=570)
        self.T2.config(text="Word :", font=("Courier", 30, "bold"))
        self.panel5 = tk.Label(self.root)  # Sentence
        self.panel5.place(x=350, y=620)
        self.T3 = tk.Label(self.root)
        self.T3.place(x=10, y=620)
        self.T3.config(text="Sentence :", font=("Courier", 30, "bold"))

        # self.root = tk.Tk()
        self.panel6 = tk.Label(self.root, text="")
        self.panel6.place(x=5, y=3)
        self.panel6.pack()
        # self.panel6.bind("<Key>", key_pressed)
        # self.root.bind("<Key>", key_pressed)
        # self.bt5.grid(row = 5, column = 1, columnspan = 1, padx = 10, pady = 10, sticky = tk.N)
        self.str = ""
        self.sentence = ""
        self.word = ""
        self.current_symbol = "Empty"
        self.photo = "Empty"
        self.video_loop()

    def video_loop(self):
        
        def key_pressed(event):
            print("key_pressed function has been called")
            """Callback function that will be called when a key is pressed"""
            key = event.char
            print(type(key))
            if key == 'X' or str(key) == 'x':
                print(key, "hello")
                self.current_symbol = 'blank'
            else:
                self.current_symbol = key
            self.panel3.config(text=self.current_symbol, font=("Courier", 30))
            print(self.current_symbol)
            if self.current_symbol != 'blank':
                self.word += self.current_symbol
            print(f"Key pressed: {key}")

        ok, frame = self.vs.read()
        if ok:
            cv2image = cv2.flip(frame, 1)
            x1 = int(0.5 * frame.shape[1])
            y1 = 10
            x2 = frame.shape[1] - 10
            y2 = int(0.5 * frame.shape[1])
            cv2.rectangle(frame, (x1 - 1, y1 - 1), (x2 + 1, y2 + 1), (255, 0, 0), 1)
            cv2image = cv2.cvtColor(cv2image, cv2.COLOR_BGR2RGBA)
            self.current_image = Image.fromarray(cv2image)
            imgtk = ImageTk.PhotoImage(image=self.current_image)
            self.panel.imgtk = imgtk
            self.panel.config(image=imgtk)
            cv2image = cv2image[y1:y2, x1:x2]
            gray = cv2.cvtColor(cv2image, cv2.COLOR_BGR2GRAY)
            blur = cv2.GaussianBlur(gray, (5, 5), 2)
            th3 = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
            ret, res = cv2.threshold(th3, 70, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
            if self.button['text'] == 'On':
                self.predict(res)
                self.panel3.config(text=self.current_symbol, font=("Courier", 30))
            else:
                self.root.bind("<Key>", key_pressed)
            self.current_image2 = Image.fromarray(res)
            imgtk = ImageTk.PhotoImage(image=self.current_image2)
            self.panel2.imgtk = imgtk
            self.panel2.config(image=imgtk)

            self.panel4.config(text=self.word, font=("Courier", 20))
            # self.panel5.config(text=self.str, font=("Courier", 20))
            self.panel5.config(text=self.sentence, font=("Courier", 20))
            self.button.config(text = self.button['text'], font=("Courier", 20))

        self.root.after(35, self.video_loop)

    def predict(self, test_image):
        # print(self.ct) #**
        test_image = cv2.resize(test_image, (224, 224))
        test_image = np.repeat(test_image[:, :, np.newaxis], 3, axis=2)
        result = self.loaded_model.predict(test_image.reshape(1, 224, 224, 3) / 255)
        # print(max(result[0]))
        labels = [x for x in "0ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
        labels[0] = "blank"
        self.current_symbol = labels[np.argmax(result)]
        
        
        # prediction = {}
        # prediction['blank'] = result[0][0]
        # inde = 1
        # for i in ascii_uppercase:
        #     prediction[i] = result[0][inde]
        #     inde += 1
        # # LAYER 1
        # prediction = sorted(prediction.items(), key=operator.itemgetter(1), reverse=True)
        # self.current_symbol = prediction[0][0]
        # LAYER 2

        # if self.current_symbol == 'blank':
        #     for i in ascii_uppercase:
        #         self.ct[i] = 0
        self.ct[self.current_symbol] += 1
        if self.ct['blank'] > 30:
            for i in ascii_uppercase:
                self.ct[i] = 0
            self.ct['blank'] = 0

            if self.sentence[-1:] != ' ' or self.sentence != '':
                self.sentence += self.word + ' '
                self.word = ''
            return
        if len(self.word) > 10:
            
            self.sentence += self.word + ' '
            self.word = ''
            for i in ascii_uppercase:
                self.ct[i] = 0
            self.ct['blank'] = 0
            return

        if self.ct[self.current_symbol] > 20:
            if self.current_symbol == 'blank':
                return
            self.word += self.current_symbol
            for i in ascii_uppercase:
                self.ct[i] = 0
            self.ct['blank'] = 0

        

        '''
        if self.ct[self.current_symbol] > 30:
            for i in ascii_uppercase:
                if i == self.current_symbol:
                    continue
                tmp = self.ct[self.current_symbol] - self.ct[i]
                if tmp < 0:
                    tmp *= -1
                if tmp <= 20:
                    self.ct['blank'] = 0
                    for i in ascii_uppercase:
                        self.ct[i] = 0
                    return
            self.ct['blank'] = 0
            for i in ascii_uppercase:
                self.ct[i] = 0
            if self.current_symbol == 'blank':
                if self.blank_flag == 0:
                    self.blank_flag = 1
                    if len(self.str) > 0:
                        self.str += " "
                    self.str += self.word
                    self.word = ""
            else:
                if (len(self.str) > 16):
                    self.str = ""
                self.blank_flag = 0
                self.word += self.current_symbol
        '''
    def destructor(self):
        print("Closing Application...")
        self.root.destroy()
        self.vs.release()
        cv2.destroyAllWindows()

    def destructor1(self):
        print("Closing Application...")
        self.root1.destroy()


print("Starting Application...")
pba = Application()
pba.root.mainloop()
