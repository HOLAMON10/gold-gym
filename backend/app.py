# backend/app.py
from flask import Flask, request, jsonify,render_template,session,redirect,url_for
from flask_cors import CORS
from flask_session import Session
from ConexionDB.database import get_db_connection


app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app, supports_credentials=True)

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

@app.route('/login', methods=['POST']) 
def login():

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM persona WHERE usuario = %s AND contra = %s', (username, password))
    record = cursor.fetchone()
    
    if record:
        # If successful, create session and return success response
        session['loggedin'] = True
        session['username'] = record[5]
        session['role'] = record[4]   # Assuming record[5] contains the username
        
        response = {
            'message': 'Login successful',
            'username': session['username'],
            'role': record[3],   
            'loggedin': True
        }
        return jsonify(response), 200

    else:
        # Login failed, return an error message
        response = {
            'message': 'Usuario o Contrasena incorrectos. Intente de nuevo.',
            'loggedin': False
        }
        return jsonify(response), 401  # Unauthorized

    connection.close()

@app.route('/logout', methods=['POST'])
def logout():
        # Clear session data on logout
    session.pop('loggedin', None)
    session.pop('username', None)
    return jsonify({'message': 'Logout successful'}), 200


if __name__ == '__main__':
    app.run(debug=True)


#Mas metodos
