
from flask import Flask, jsonify, Blueprint, request

app = Flask(__name__)


@app.route("/test")
def test():

    print('Idhr agya ')

    return jsonify({'message': 'workedddd hahahaha'})


app.run(debug=True)
