
db = db.getSiblingDB("magazzino_db");
db.prodotti_tb.drop();

db.prodotti_tb.insertMany([
    {
        "id": 1,
        "nome": "Pasta",
        "categoria": "Cereali",
        "quantita": 100,
        "prezzo_unitario": 2.5
    },
    {
        "id": 2,
        "nome": "Riso",
        "categoria": "Cereali",
        "quantita": 80,
        "prezzo_unitario": 3.0
    },
    {
        "id": 3,
        "nome": "Olio d'oliva",
        "categoria": "Condimenti",
        "quantita": 50,
        "prezzo_unitario": 5.0
    },
    {
        "id": 4,
        "nome": "Pomodori",
        "categoria": "Verdure",
        "quantita": 70,
        "prezzo_unitario": 1.0
    },
    {
        "id": 5,
        "nome": "Carne di manzo",
        "categoria": "Carne",
        "quantita": 30,
        "prezzo_unitario": 10.0
    },
    {
        "id": 6,
        "nome": "Latte",
        "categoria": "Latticini",
        "quantita": 60,
        "prezzo_unitario": 2.0
    },
    {
        "id": 7,
        "nome": "Formaggio",
        "categoria": "Latticini",
        "quantita": 40,
        "prezzo_unitario": 4.0
    },
    {
        "id": 8,
        "nome": "Uova",
        "categoria": "Uova",
        "quantita": 50,
        "prezzo_unitario": 1.5
    },
    {
        "id": 9,
        "nome": "Pane",
        "categoria": "Pane",
        "quantita": 90,
        "prezzo_unitario": 1.0
    },
    {
        "id": 10,
        "nome": "Salsicce",
        "categoria": "Carne",
        "quantita": 25,
        "prezzo_unitario": 8.0
    },
    {
        "id": 11,
        "nome": "Insalata",
        "categoria": "Verdure",
        "quantita": 60,
        "prezzo_unitario": 2.0
    },
    {
        "id": 12,
        "nome": "Tonno in scatola",
        "categoria": "Pesce",
        "quantita": 35,
        "prezzo_unitario": 3.5
    },
    {
        "id": 13,
        "nome": "Patate",
        "categoria": "Verdure",
        "quantita": 80,
        "prezzo_unitario": 1.2
    },
    {
        "id": 14,
        "nome": "Biscotti",
        "categoria": "Dolci",
        "quantita": 75,
        "prezzo_unitario": 2.5
    },
    {
        "id": 15,
        "nome": "Acqua minerale",
        "categoria": "Bevande",
        "quantita": 100,
        "prezzo_unitario": 1.0
    },
    {
        "id": 16,
        "nome": "Marmellata",
        "categoria": "Dolci",
        "quantita": 45,
        "prezzo_unitario": 3.0
    },
    {
        "id": 17,
        "nome": "Sugo di pomodoro",
        "categoria": "Condimenti",
        "quantita": 55,
        "prezzo_unitario": 2.0
    },
    {
        "id": 18,
        "nome": "Zucchero",
        "categoria": "Dolci",
        "quantita": 70,
        "prezzo_unitario": 1.5
    },
    {
        "id": 19,
        "nome": "Caffè",
        "categoria": "Bevande",
        "quantita": 40,
        "prezzo_unitario": 4.0
    },
    {
        "id": 20,
        "nome": "Salmone affumicato",
        "categoria": "Pesce",
        "quantita": 20,
        "prezzo_unitario": 7.0
    }
]);
