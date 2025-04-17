# Titanic Project using (Flask + SQLite3)

A simple flask web application to display content of the titanic dataset. Users can get information such as Survival statistics, Embarkation ports, passenger statistics and can also view all passenger data all on the homepage.

## Project Structure

```
titanic_app/
├── data preprocessing/       # Placeholder for future data tasks
|   ├── train.csv       #The original database from Kaggle
|   └── titanic.ipynb   #Notebook used for cleaning data
|
|
├── database/                 # Contains the SQLite DB
     ├── titanic_cleaned.csv             #Cleaned Titanic Data
|    ├── titanic_database.ipynb   #Contains the data exported to the database
|    └── titanic.db
|
|
├── website/
│   ├── app.py                # Flask web app
|   |──static/
│   |       ├── assets/           #Contains the images used
│   |       ├── css/
|   |       |    └──styles.css
│   |       └── js/
|   |            └── script.js
│   └── templates/            # HTML templates
│          ├── index.html
│          └── table.html
|
|
├── requirements.txt          # Python dependencies
└── README.md
```

## Setup

Run in the terminal

```Bash
cd titanic_app
pip install -r requirements.txt
python website/app.py
```

Then open your browser and go to: `http://localhost:5000`.
