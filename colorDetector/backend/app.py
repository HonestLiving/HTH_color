
def flaskTest():
    from flask import Flask, render_template

    newApp = Flask(__name__)

    @newApp.route('/')
    def index():
        return render_template('index.html')
    #return "temp"

    if __name__ == "__main__":
        newApp.run(debug=True)