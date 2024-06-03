from flask import Flask, jsonify, request, json
from flask_cors import CORS
from pymongo import MongoClient, errors

import os

app = Flask(__name__)


cors = CORS(app, resources={r"/*": {"origins": "*"}})

def get_db():
    client = MongoClient(host='test_mongodb',
                         port=27017,
                         username=os.environ["MONGO_INITDB_ROOT_USERNAME"],
                         password=os.environ["MONGO_INITDB_ROOT_PASSWORD"],
                         authSource="admin")
    db = client[os.environ["MONGO_INITDB_DATABASE"]]
    return db

@app.route('/newProdotto', methods=['POST'])
def newProdotto():
    try:
        db = get_db()
        last_prodotto = db.prodotto_tb.find_one(sort=[("id", -1)])
        new_id = int(last_prodotto['id']) + 1 if last_prodotto else 1
        request.json['id'] = new_id
        db.prodotto_tb.insert_one(request.json)

        response_data = {
            'message': 'Product added successfully',
            'success': True
        }
        status_code = 201
    except errors.PyMongoError as e:
        response_data = {
            'error': str(e),
            'success': False
        }
        status_code = 500

    response = app.response_class(
        response=json.dumps(response_data),
        status=status_code,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')

    return response

@app.route('/magazzino', methods=['GET'])
def get_prodotti():
    try:
        db = get_db()
        prodotti = db.prodotti_tb.find()
        processed_prodotti = []

        for prodotto in prodotti:
            product_data = {
                'id': str(prodotto['_id']),
                'nome': prodotto['nome'],
                'categoria': prodotto['categoria'],
                'quantita': prodotto['quantita'],
                'prezzo_unitario': prodotto['prezzo_unitario']
            }
            processed_prodotti.append(product_data)

        response_data = {
            'prodotti': processed_prodotti,
            'success': True
        }
        status_code = 200
    except errors.PyMongoError as e:
        print(f"Error querying database: {e}")
        response_data = {
            'error': 'Error querying database',
            'success': False
        }
        status_code = 500

    response = jsonify(response_data)
    response.status_code = status_code
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'true')

    return response

@app.route('/environment', methods=['GET'])
def env():
    return jsonify({
        "env": [
            {"MONGO_INITDB_DATABASE": os.environ["MONGO_INITDB_DATABASE"]},
            {"MONGO_INITDB_ROOT_USERNAME": os.environ["MONGO_INITDB_ROOT_USERNAME"]},
            {"MONGO_INITDB_ROOT_PASSWORD": os.environ["MONGO_INITDB_ROOT_PASSWORD"]}
        ]
    })

@app.route('/', methods=['GET'])
def ping_server():
    return "funziona"

@app.route('/simple_json', methods=['GET'])
def simple_json():
    return jsonify({'saluto': 'ciao'})




if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
