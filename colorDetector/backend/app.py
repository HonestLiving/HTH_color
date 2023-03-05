from flask import Flask, request, jsonify, render_template
from detectColor import detectProperties

newApp = Flask(__name__)


def flaskTest():
    @newApp.route('/', methods=['POST', 'GET'])
    def index():
        # return render_template('index.html')
        # color_list = detectProperties("C:/Users/DESTR/Documents/GitHub/HTH_color/colorDetector/backend/pictures/Screenshot_5.png")
        # fraction_list =
        # return ("<p>" + "</p><p>".join(detectProperties("C:/Users/DESTR/Documents/GitHub/HTH_color/colorDetector/backend/pictures/Screenshot_5.png")) + "</p")
        return "This is default"
    # get the file from the POST request
    # file = request.files['file']
    # pass the file to the detectProperties function
    # color_list = detectProperties(file)
    # return the color_list as a JSON response
    # return jsonify(color_list)

    @newApp.route('/upload', methods=['POST', 'GET'])
    def upload():
        file = request.files['file']
        colors = detectProperties(file)
        return jsonify(colors)

    if __name__ == "__main__":
        newApp.run(debug=True)


try:
    flaskTest()
except Exception as e:
    print("An error occurred: ", e)
