from flask import Flask, render_template, request, jsonify
from pyutil import weiboCrawler
from pyutil import api

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getWeibo', methods=['GET'])
def getWeibo():
    user_id = request.args.get('userid', default='2348648143', type=str)
    text = weiboCrawler.getWeibo(user_id, maxPages=10)
    return jsonify(text)

@app.route('/personalInsight', methods=['GET', 'POST'])
def personalInsight():
    if request.method == 'GET':
        text = request.args.get('text', default='', type=str)
    elif request.method == 'POST':
        text = request.form.get('text', default='', type=str)
    else:
        text = ''
    ret = api.personalInsight(text)

    return jsonify(ret)

if __name__ == '__main__':
    app.run()
