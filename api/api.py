import time
from flask import Flask, jsonify, request, redirect, url_for
from flask_cors import CORS
from docker_utils import docker_client as docker
import os


app = Flask(__name__)
CORS(app)


@app.route('/time', methods=['GET'])
def get_current_time():
    return jsonify({'time': time.time()})


@app.route('/', methods=['GET'])
def default():
    return redirect(url_for('images', **request.args))


@app.route('/index', methods=['GET'])
def index():
    return redirect(url_for('images', **request.args))


@app.route('/images', methods=['GET'])
def images():
    print("Getting images...")
    args = request.args
    res = docker.get_images(**args)
    return jsonify({'data': res})


@app.route('/containers/', methods=['GET'])
@app.route('/containers/<container_id>', methods=['GET'])
def containers(container_id=None):
    args = request.args
    res = docker.get_containers(container_id=container_id, **args)
    return jsonify({'data': res}), 200


@app.route('/containers/<container_id>/files', methods=['GET'])
def files(container_id):
    args = request.args
    res = docker.get_archive(container_id=container_id, path=args.get('path'))
    return jsonify({'data': res})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('REACT_APP_FLASK_PORT'))
# gunicorn -w 1 -b 0.0.0.0:8000 wsgi:server
