from flask import Flask, jsonify, request, json
from flask_cors import CORS
from pymongo import MongoClient

import os

cors = CORS()
app = Flask(__name__)
cors.init_app(app)


def get_db():
    client = MongoClient(host='test_mongodb',
                         port=27017, 
                         username=os.environ["MONGO_INITDB_ROOT_USERNAME"], 
                         password=os.environ["MONGO_INITDB_ROOT_PASSWORD"],
                         authSource="admin")
    db = client[os.environ["MONGO_INITDB_DATABASE"]]
    return db

@app.route('/newProdotto', methods = ['POST'])
def newProdotto():
    
    db=""
    db = get_db() 
   
    last_prodotto = db.prodotto_tb.find_one(sort=[("id", -1)])
    
    request.json['id'] = int(last_prodotto['id']) + 1 
   
    x = db.prodotto_tb.insert_one(request.json)
   
    response = app.response_class(
        response=json.dumps(response_data),
        status=status_code,
        mimetype='application/json'
    )
    response.headers.add('Access-Control-Allow-Origin', 'https://4200-vincenzagen-supercontai-2aajk6rp92y.ws-eu114.gitpod.io')
    return response


@app.route('/magazzino')
def get_prodotti():
    db = None
    try:
        db = get_db()
        prodotti = db.prodotti_tb.find()

        processed_prodotti = []
        for prodotto in prodotti:
            product_data = {
                'id': prodotto['_id'],
                'nome': prodotto['nome'],
                'categoria': prodotto['categoria'],
                'quantita': prodotto['quantita'],
                'prezzo_unitario': prodotto['prezzo_unitario']

            }
            processed_prodotti.append(product_data)

        response = jsonify({
            'prodotti': processed_prodotti,
            'success': True
        })
    except pymongo.errors.ConnectionError as e:
        print(f"Error connecting to database: {e}")
        response = jsonify({
            'error': 'Error connecting to database',
            'success': False
        }), 500
    except pymongo.errors.CursorError as e:
        print(f"Error querying database: {e}")
        response = jsonify({
            'error': 'Error querying database',
            'success': False
        }), 500
    finally:
        if db:
            db.close()


    response.headers.add('Access-Control-Allow-Origin', '*')
    return response



@app.route('/environment')
def env():
    return jsonify(
            {"env":[
                {"MONGO_INITDB_DATABASE": os.environ["MONGO_INITDB_DATABASE"]},
                {"MONGO_INITDB_ROOT_USERNAME": os.environ["MONGO_INITDB_ROOT_USERNAME"]},
                {"MONGO_INITDB_ROOT_PASSWORD": os.environ["MONGO_INITDB_ROOT_PASSWORD"]}
            ]})

@app.route('/')
def ping_server():
    return "funziona"

@app.route('/simple_json')
def simple_json():
    return jsonify({'saluto':'ciao'})

if __name__=='__main__':
    app.run(host="0.0.0.0", port=5000)