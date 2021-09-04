
from flask import Flask, jsonify, Blueprint, request

app = Flask(__name__)


@app.route('/api', methods=['GET'])
def index():

    return {
        'tutorial': 'Flask APP Heroku'
    }


if __name__ == '__main__':
    app.run()
