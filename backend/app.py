# backend/app.py
from flask import Flask, request, jsonify,session, Blueprint
import json
from werkzeug.utils import secure_filename
import os
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
        session['role'] = record[3]   # Assuming record[5] contains the username
        print(record[3])
        response = {
            'message': 'Login successful',
            'username': session['username'],
            'role': session['role'],   
            'loggedin': True
        }
        connection.close()
        return jsonify(response), 200

    else:
        # Login failed, return an error message
        response = {
            'message': 'Usuario o Contrasena incorrectos. Intente de nuevo.',
            'loggedin': False
        }
        return jsonify(response), 401  # Unauthorized

   

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  # Clear the session
    return jsonify({'message': 'Logged out successfully'}), 200


upload_bp = Blueprint('upload', __name__)

# Configure upload folder and allowed extensions
UPLOAD_FOLDER = './gold-gym/public/images'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def process_and_save_image(file):
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    # Save the file to the filesystem
    file.save(filepath)

    return filepath, filename

@app.route('/api/food', methods=['POST'])
def manage_food():
    # Retrieve the food object and file
    food_json = request.form.get('food')
    file = request.files.get('file')

    if not food_json or not file:
        return jsonify({'error': 'Food details or file missing'}), 400

    # Validate file type
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type'}), 400

    # Process and save the file
    filepath, filename = process_and_save_image(file)

    # Parse and validate the food object
    try:
        food = json.loads(food_json)
    except Exception:
        return jsonify({'error': 'Invalid food object'}), 400

    name = food.get('name')
    description = food.get('description')

    if not name or not description:
        return jsonify({'error': 'Food name and description are required'}), 400

    # Update the database
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO foods (name.....)
            VALUES (%s, %s, %s,.....)
            ON DUPLICATE KEY UPDATE
            food_image_path = VALUES(food_image_path)
            """,
            (name, description, filepath) # cambiar por aquello que traiga el renponse.
        )
        connection.commit()
    except Exception as e:
        connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        connection.close()

    return jsonify({'message': 'Food added/updated successfully', 'filename': filename}), 200

if __name__ == '__main__':
    app.run(debug=True)


#Mas metodos
