import time
from flask import Flask, jsonify, request, redirect, url_for
from docker_utils import docker_instance as docker

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return jsonify({'time': time.time()})


@app.route('/index', methods=['GET'])
def index():
    return redirect(url_for('images', **request.args), code=302)


@app.route('/images', methods=['GET'])
def images():
    print("Getting images...")
    args = request.args
    res = docker.get_images(**args)
    return jsonify({'data': res})


@app.route('/containers', methods=['GET'])
def containers():
    args = request.args
    res = docker.get_containers(**args)
    return jsonify({'data': res})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
# gunicorn -w 1 -b 0.0.0.0:8000 wsgi:server
