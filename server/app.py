from flask import Flask, request, jsonify, escape, make_response
from chart_models import chart_models
from random import randint
from time import time_ns

app = Flask(__name__)


@app.route('/models', methods=['GET'])
@app.route('/models/<name>', methods=['GET'])
def chart_model(name=None):
    if request.method == 'GET':
        response_headers = {'Access-Control-Allow-Origin': 'http://localhost:3000'}
        if name:
            model_name = escape(name)
            for model in chart_models:
                if model['name'] == model_name:
                    model['data'] = dict(timestamp=time_ns(),
                                          value=randint(model['values_range'][0], model['values_range'][-1]))
                    return jsonify(model), 200, response_headers
            return 'Invalid model name', 400, response_headers
        else:
            return jsonify(chart_models), 200, response_headers


if __name__ == '__main__':
    app.run()
