from flask import Flask, render_template, request, jsonify
from pyutil import weiboCrawler
from pyutil import api

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
    return app.send_static_file("index.html")

@app.route('/getWeibo', methods=['GET'])
def getWeibo():
    user_id = request.args.get('userid', default='2348648143', type=str)
    texts, dates = weiboCrawler.getWeibo(user_id, maxPages=10)
    text = '\n'.join(texts)
    res = api.personalInsight(text.encode("utf-8"))
    return jsonify(res)

@app.route('/getSentiment', methods=['GET'])
def getSentiment():
    user_id = request.args.get('userid', default='2348648143', type=str)
    texts, dates = weiboCrawler.getWeibo(user_id, maxPages=10)
    textdateList = list(zip(texts, dates))
    sentimentList = []
    for textdate in textdateList:
        ret = api.nlu(textdate[0])

        if 'sentiment' in ret:
            print(ret)
            sentimentList.append((textdate[1], ret['sentiment']['document']))
    return jsonify({'dates': dates, 'sentiments': sentimentList})

@app.route('/personalInsight', methods=['GET', 'POST'])
def personalInsight():
    if request.method == 'GET':
        text = request.args.get('text', default='', type=str)
    elif request.method == 'POST':
        text = request.form['file']
        print(text)
    else:
        text = ''
    ret = api.personalInsight(text)

    return jsonify(ret)

if __name__ == '__main__':
    app.run()
