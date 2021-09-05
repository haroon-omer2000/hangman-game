from flask import Flask, jsonify, Blueprint, request
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import controller

app = Flask(__name__, static_folder='frontend/build', static_url_path='')

CORS(app)

@app.route('/',methods=['GET'])
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/enter_user',methods=['POST'])
@cross_origin()
def enter_user():
    name = request.get_json()
    controller_obj = controller.Controller()
    controller_obj.enter_user(name)
    return "",201


@app.route('/api', methods=['GET'])
@cross_origin()
def index():
    return {'tutorial': 'Flask APP Heroku'}



if __name__ == '__main__':
    app.run()
