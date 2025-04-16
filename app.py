from flask import Flask, render_template, jsonify
import sqlite3
import os

app = Flask(__name__,
            static_folder='static',
            template_folder='templates')

def get_db_connection():
    db_path = os.path.join(app.root_path, 'database', 'titanic.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_stats/<stat_type>')
def get_stats(stat_type):
    conn = get_db_connection()
    
    stats = {}
    if stat_type == 'survival':
        stats = dict(conn.execute("SELECT Survived, COUNT(*) FROM titanic GROUP BY Survived").fetchall())
    elif stat_type == 'embarkation':
        stats = dict(conn.execute("SELECT Embarked, COUNT(*) FROM titanic GROUP BY Embarked").fetchall())
    elif stat_type == 'passenger':
        stats = {
            'total': conn.execute("SELECT COUNT(*) FROM titanic").fetchone()[0],
            'male': conn.execute("SELECT COUNT(*) FROM titanic WHERE Sex = 'male'").fetchone()[0],
            'female': conn.execute("SELECT COUNT(*) FROM titanic WHERE Sex = 'female'").fetchone()[0]
        }
    
    conn.close()
    return jsonify(stats)


@app.route('/titanic_table')
def titanic_table():
    conn = get_db_connection()
    passengers = conn.execute('SELECT * FROM titanic').fetchall()
    conn.close()
    return render_template('table.html', data=passengers, columns=['PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked'])

if __name__ == '__main__':
    app.run(debug=True)