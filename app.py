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

    details = request.get_json()
    
    controller_obj = controller.Controller() 
    status = controller_obj.enter_user(details)

    return status

@app.route('/update_score',methods=['POST'])
@cross_origin()
def update_score():

    scoreDetails = request.get_json()

    controller_obj = controller.Controller() 
    status = controller_obj.update_score(scoreDetails)

    return jsonify({'status':status})


if __name__ == '__main__':
    app.run()
