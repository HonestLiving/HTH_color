from flask import Flask, request, jsonify, render_template
from detectColor import detectProperties

def flaskTest():
    newApp = Flask(__name__)
    @newApp.route('/')

    def index():
        #return render_template('index.html')
        return ("<p>" + "</p><p>".join(detectProperties("C:/Users/DESTR/Documents/GitHub/HTH_color/colorDetector/backend/Screenshot_5.png"))+ "</p")
        #return "Hi"
    #index()

    if __name__ == "__main__":
        newApp.run(debug=True)


try:
    #file_path = "C:/Users/DESTR/Documents/GitHub/HTH_color/colorDetector/backend/Screenshot_5.png"
    #detectProperties(file_path)
    flaskTest()
except Exception as e:
    print("An error occurred: ", e)