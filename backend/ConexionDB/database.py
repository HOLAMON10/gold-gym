# backend/database.py
import mysql.connector

def get_db_connection():
    connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="oirflame",
    database="gimnasio",
    port=3306  # Cambia esto si tu MySQL está usando otro puerto
)

    return connection


