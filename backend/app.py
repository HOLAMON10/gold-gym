# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from ConexionDB.database import get_db_connection


app = Flask(__name__)
CORS(app)

# Ruta para registrar usuarios 
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    nombre = data.get('nombre')
    cedula = data.get('cedula')
    rol = data.get('rol')
    usuario = data.get('usuario')
    contra = data.get('contra')
    correo = data.get('correo')
    edad = data.get('edad')

    # Conectar a la base de datos
    connection = get_db_connection()
    cursor = connection.cursor()

    # Insertar el usuario en la tabla
    cursor.execute("""
        INSERT INTO persona (nombre, cedula, rol, usuario, contra, correo, edad)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (nombre, cedula, rol, usuario, contra, correo, edad))

    # Confirmar la transacción y cerrar la conexión
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201

if __name__ == '__main__':
    app.run(debug=True)


#Mas metodos
