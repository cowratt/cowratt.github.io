from flask import Flask, send_from_directory, send_file
app = Flask(__name__)

@app.route("/")
def hello():
    return send_file("index.html")
@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('.', path)
if __name__ == "__main__":
    app.run()