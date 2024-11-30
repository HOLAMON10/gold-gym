# backend/app.py
from flask import Flask, request, jsonify,render_template,session,redirect,url_for,Blueprint,send_from_directory
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

# Funciones para registrar  --------------------------------------------------------------------------------

#Registrar Usuarios
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





#Registrar Ejercicios 
@app.route('/api/agregarEjercicio', methods=['POST'])
def agregarEjercicio():
    data = request.json
    nombreEjer = data.get('nombreEjer')
    repeticiones = data.get('repeticiones')
    levantamientos = data.get('levantamientos')
    idrutina = data.get('idrutina')
    

    # Conectar a la base de datos
    connection = get_db_connection()
    cursor = connection.cursor()

    # Insertar el ejercicio en la tabla
    cursor.execute("""
        INSERT INTO ejercicio (nombreEjer, repeticiones, levantamientos, idrutina)
        VALUES (%s, %s, %s, %s)
    """, (nombreEjer, repeticiones, levantamientos, idrutina))

    # Confirmar la transacción y cerrar la conexión
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Ejercicio registrado exitosamente"}), 201





#Registrar Recomendacion Alimenticia 
@app.route('/api/agregarRecoAlimen', methods=['POST'])
def agregarRecoAlimen():
    data = request.json
    objetivo = data.get('objetivo')
    calorias = data.get('calorias')
    proteina = data.get('proteina')
    carbo = data.get('carbo')
    

    # Conectar a la base de datos
    connection = get_db_connection()
    cursor = connection.cursor()

    # Insertar el ejercicio en la tabla
    cursor.execute("""
        INSERT INTO recomendacionai (objetivo, calorias, proteina, carbo)
        VALUES (%s, %s, %s, %s)
    """, (objetivo, calorias, proteina, carbo))

    # Confirmar la transacción y cerrar la conexión
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Recomendacion Alimenticia  registrado  exitosamente"}), 201







# Editar Registros  --------------------------------------------------------

@app.route('/api/actualizarEjercicio/<int:id>', methods=['PATCH'])
def actualizarEjercicio(id):
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Verificar si el ejercicio existe
        cursor.execute('SELECT idRutina FROM ejercicio WHERE idEjercicio = %s', (id,))
        ejercicio_actual = cursor.fetchone()

        if not ejercicio_actual:
            return jsonify({"error": "Ejercicio no encontrado"}), 404

        # Obtener los datos del cuerpo de la solicitud
        data = request.json
        nombreEjer = data.get('nombreEjer')
        repeticiones = data.get('repeticiones')
        levantamientos = data.get('levantamientos')

        # Actualizar el ejercicio, sin cambiar idRutina
        cursor.execute('''
            UPDATE ejercicio
            SET nombreEjer = %s, repeticiones = %s, levantamientos = %s
            WHERE idEjercicio = %s
        ''', (nombreEjer, repeticiones, levantamientos, id))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Ejercicio actualizado correctamente"}), 200

    except Exception as e:
        print(f"Error al actualizar el ejercicio: {e}")
        return jsonify({"error": "Hubo un problema al actualizar el ejercicio"}), 500




@app.route('/api/actualizarRecoAlimen/<int:id>', methods=['PATCH'])
def actualizarRecoAlimen(id):
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Obtener los datos del cuerpo de la solicitud
        data = request.json
        objetivio = data.get('objetivio')
        calorias = data.get('calorias')
        proteina = data.get('proteina')
        carbo = data.get('carbo')

        # Actualizar el reco alimenticia sin cambiar idRA
        cursor.execute('''
            UPDATE recomendacionai

            SET objetivo = %s, calorias = %s, proteina = %s, carbo = %s
            WHERE idRA = %s
        ''', (objetivio, calorias, proteina, carbo, id))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Recomendacion alimenticia actualizada correctamente"}), 200

    except Exception as e:
        print(f"Error al actualizar la recomendación alimenticia: {e}")
        return jsonify({"error": "Hubo un problema al actualizar la recomendación alimenticia"}), 500








@app.route('/api/actualizarUsuario/<int:id>', methods=['PATCH'])
def actualizarUsuario(id):
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Obtener los datos del cuerpo de la solicitud
        data = request.json
        nombre = data.get('nombre')
        cedula = data.get('cedula')
        
        usuario = data.get('usuario')
        correo = data.get('correo')
        edad = data.get('edad')
        
        # Actualizar el reco alimenticia sin cambiar idRA
        cursor.execute('''
            UPDATE persona

            SET nombre = %s, cedula = %s,  usuario = %s,  correo = %s, edad = %s
            WHERE id = %s
        ''', (nombre, cedula, usuario,correo,edad, id))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Usuario actualizada correctamente"}), 200

    except Exception as e:
        print(f"Error al actualizar la usuario: {e}")
        return jsonify({"error": "Hubo un problema al actualizar la usuario"}), 500






#Login --------------------------------------------------------------------------------

@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM persona WHERE usuario = %s AND contra = %s', (username, password))
    
    record = cursor.fetchone()
    print(record)

    if record:
        # If successful, create session and return success response
        session['loggedin'] = True
        session['username'] = record[5]
        session['role'] = record[3]   # Assuming record[5] contains the username
        session['id'] = record[0]
        response = {
            'message': 'Login successful',
            'username': session['username'],
            'role': session['role'],
            'id': session['id'],
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




# Backend para mostrar tablas --------------------------------------------------------------------------------


@app.route('/verClientes', methods=["GET"])
def verClientes():
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para obtener todas las personas con rol "Cliente"
        cursor.execute('SELECT * FROM persona WHERE rol = %s', ('Cliente',))

        # Obtener todos los resultados de la consulta
        clientes = cursor.fetchall()

        # Verificar si no hay personas con rol "Cliente"
        if not clientes:
            return jsonify({"message": "No hay personas con rol 'Cliente' en la base de datos"}), 404

        # Crear una lista de diccionarios para representar cada cliente
        resultado = []
        for cliente in clientes:
            resultado.append({
                'id': cliente[0],
                'nombre': cliente[1],
                'cedula': cliente[2],
                'rol': cliente[3],
                'usuario': cliente[4],
                'contra': cliente[5],
                'correo': cliente[6],
                'edad': cliente[7]
            })

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()

        # Devolver los datos en formato JSON
        return jsonify({"data": resultado, "message": "Clientes obtenidos correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error al conectar con la base de datos", "error": str(e)}), 500





@app.route('/verEmpleados', methods=["GET"])
def verEmpleados():
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para obtener todas las personas con rol "Empleado"
        cursor.execute('SELECT * FROM persona WHERE rol = %s', ('Empleado',))

        # Obtener todos los resultados de la consulta
        empleados = cursor.fetchall()

        # Verificar si no hay personas con rol "Empleado"
        if not empleados:
            return jsonify({"message": "No hay personas con rol 'Empleado' en la base de datos"}), 404

        # Crear una lista de diccionarios para representar cada empleado
        resultado = []
        for empleado in empleados:
            resultado.append({
                'id': empleado[0],
                'nombre': empleado[1],
                'cedula': empleado[2],
                'rol': empleado[3],
                'usuario': empleado[4],
                'contra': empleado[5],
                'correo': empleado[6],
                'edad': empleado[7]
            })

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()

        # Devolver los datos en formato JSON
        return jsonify({"data": resultado, "message": "Empleados obtenidos correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error al conectar con la base de datos", "error": str(e)}), 500


#Ver Ejercicios para BAJAR DE PESO


@app.route('/verEjerciciosBP', methods=["GET"])
def verEjerciciosBP():
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para obtener todas las personas con rol "Cliente"
        cursor.execute('SELECT * FROM ejercicio WHERE idrutina = %s', ('1',))

        # Obtener todos los resultados de la consulta
        ejercicios = cursor.fetchall()

        # Verificar si no hay personas con rol "Cliente"
        if not ejercicios:
            return jsonify({"message": "No hay Ejercicios en la base de datos"}), 404

        # Crear una lista de diccionarios para representar cada cliente
        resultado = []
        for ejercicio in ejercicios:
            resultado.append({
                'id': ejercicio[0],
                'nombreEjer': ejercicio[1],
                'repeticiones': ejercicio[2],
                'levantamientos': ejercicio[3],
                'idrutina': ejercicio[4],
                
            })

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()

        # Devolver los datos en formato JSON
        return jsonify({"data": resultado, "message": "Ejercicios obtenidos correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error al conectar con la base de datos", "error": str(e)}), 500



#Ver Ejercicios para SUBIR MASA



@app.route('/verEjerciciosSM', methods=["GET"])
def verEjerciciosSM():
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para obtener todas las personas con rol "Cliente"
        cursor.execute('SELECT * FROM ejercicio WHERE idrutina = %s', ('2',))

        # Obtener todos los resultados de la consulta
        ejercicios = cursor.fetchall()

        # Verificar si no hay personas con rol "Cliente"
        if not ejercicios:
            return jsonify({"message": "No hay Ejercicios en la base de datos"}), 404

        # Crear una lista de diccionarios para representar cada cliente
        resultado = []
        for ejercicio in ejercicios:
            resultado.append({
                'id': ejercicio[0],
                'nombreEjer': ejercicio[1],
                'repeticiones': ejercicio[2],
                'levantamientos': ejercicio[3],
                'idrutina': ejercicio[4],
                
            })

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()

        # Devolver los datos en formato JSON
        return jsonify({"data": resultado, "message": "Ejercicios obtenidos correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error al conectar con la base de datos", "error": str(e)}), 500





#ver Tabla Recomendacion Alimentica

@app.route('/verRecoAlimen', methods=["GET"])
def verRecoAlimen():
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para obtener todas las personas con rol "Cliente"
        cursor.execute('SELECT * FROM recomendacionai')

        # Obtener todos los resultados de la consulta
        RecoAlimens = cursor.fetchall()

        # Verificar si no hay personas con rol "Cliente"
        if not RecoAlimens:
            return jsonify({"message": "No hay Ejercicios en la base de datos"}), 404

        # Crear una lista de diccionarios para representar cada cliente
        resultado = []
        for RecoAlimen in RecoAlimens:
            resultado.append({
                'id': RecoAlimen[0],
                'objetivo': RecoAlimen[1],
                'calorias': RecoAlimen[2],
                'proteina': RecoAlimen[3],
                'carbo': RecoAlimen[4],
                
            })

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()

        # Devolver los datos en formato JSON
        return jsonify({"data": resultado, "message": "RecoAlimen obtenidos correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error al conectar con la base de datos", "error": str(e)}), 500





# Acaba ver Tablas --------------------------------------------------------------------------------






# CRUD Tablas --------------------------------------------------------------------------------

@app.route('/api/eliminarEjercicio/<int:id>', methods=['DELETE'])
def eliminarEjercicio(id):
    print(f"Intentando eliminar el ejercicio con id: {id}")  # Para verificar que se pasa el id
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Eliminar el ejercicio de la base de datos usando el nombre correcto del campo (idEjercicio)
        cursor.execute('DELETE FROM ejercicio WHERE idEjercicio = %s', (id,))

        # Verificar si se eliminó algún registro
        if cursor.rowcount == 0:
            return jsonify({"error": "Ejercicio no encontrado"}), 404

        # Confirmar la transacción
        connection.commit()

        # Cerrar la conexión
        cursor.close()
        connection.close()

        return jsonify({"message": f"Ejercicio con id {id} eliminado exitosamente"}), 200

    except Exception as e:
        print(f"Error al eliminar el ejercicio: {e}")
        return jsonify({"error": "Hubo  un problema al eliminar el ejercicio"}), 500







@app.route('/api/eliminarRecoAlimen/<int:id>', methods=['DELETE'])
def eliminarRecoAlimen(id):
    print(f"Intentando eliminar el RecoAlimen con id: {id}")  # Para verificar que se pasa el id
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Eliminar el ejercicio de la base de datos usando el nombre correcto del campo (idEjercicio)
        cursor.execute('DELETE FROM recomendacionai WHERE idRA = %s', (id,))

        # Verificar si se eliminó algún registro
        if cursor.rowcount == 0:
            return jsonify({"error": "RecoAlimen no encontrado"}), 404

        # Confirmar la transacción
        connection.commit()

        # Cerrar la conexión
        cursor.close()
        connection.close()

        return jsonify({"message": f"RecoAlimen con id {id} RecoAlimen exitosamente"}), 200

    except Exception as e:
        print(f"Error al eliminar el RecoAlimen: {e}")
        return jsonify({"error": "Hubo  un problema al eliminar el RecoAlimen"}), 500

def get_user(user_id):
    
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    # Get rows as dictionaries
    cursor.execute("SELECT nombre,usuario,correo,edad, persona_imagen FROM persona WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    
    cursor.close()
    connection.close()

    if user:
        print(user)
        return jsonify(user)
    else:
        print(f"User with ID {user_id} not found.")
        return jsonify({"error": "User not found"}), 404
    
@app.route('/api/upload', methods=['POST'])
def upload_profile():
    conn = None
    try:
        # Get user data from the form
        user_id = request.form.get("userId")
        nombre = request.form.get("nombre")
        usuario = request.form.get("usuario")
        correo = request.form.get("correo")
        edad2 = request.form.get("edad")
        print(request.form)
        edad = int(edad2)
        
        

        if not user_id:
            return jsonify({"error": "User ID is required"}), 400

        # Connect to the database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Check if the user exists
        cursor.execute("SELECT * FROM persona WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Update user data in the database
        update_query = """
            UPDATE persona
            SET nombre = %s, usuario = %s, correo = %s, edad = %s
            WHERE id = %s
        """
        cursor.execute(update_query, (nombre, usuario, correo, edad, user_id))

        # Handle the file upload
        if 'file' in request.files:
            file = request.files['file']
            if file:
                # Secure the filename and save to public/images
                filename = secure_filename(file.filename)
                filepath = os.path.join(PUBLIC_IMAGES_FOLDER ,filename)
                file.save(filepath)

                # Store the relative path (e.g., "images/filename.jpg")
                relative_path = os.path.relpath(filepath, start='./images')

                # Update profile_image in the database
                cursor.execute(
                    "UPDATE persona SET persona_imagen = %s WHERE id = %s",
                    (filename, user_id)
                )

        # Commit the changes
        conn.commit()

        # Fetch the updated user data
        cursor.execute("SELECT * FROM persona WHERE id = %s", (user_id,))
        updated_user = cursor.fetchone()
        conn.close()
        return jsonify({"message": "Profile updated successfully", "user": updated_user}), 200
        

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred while updating the profile"}), 500

    finally:
        if conn:
            cursor.close()
            conn.close() 









@app.route('/api/eliminarUsuario/<int:id>', methods=['DELETE'])
def eliminarUsuario(id):
    print(f"Intentando eliminar Persona con id: {id}")  # Para verificar que se pasa el id
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Eliminar el ejercicio de la base de datos usando el nombre correcto del campo (idEjercicio)
        cursor.execute('DELETE FROM persona WHERE id = %s', (id,))

        # Verificar si se eliminó algún registro
        if cursor.rowcount == 0:
            return jsonify({"error": "id no encontrado"}), 404

        # Confirmar la transacción
        connection.commit()

        # Cerrar la conexión
        cursor.close()
        connection.close()

        return jsonify({"message": f"id con id {id} id exitosamente"}), 200

    except Exception as e:
        print(f"Error al eliminar el id: {e}")
        return jsonify({"error": "Hubo  un problema al eliminar el id"}), 500





# --------------------------------------------------------------------------------



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

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# Define the upload folder path
PUBLIC_IMAGES_FOLDER = os.path.join(BASE_DIR, 'public', 'images')

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    # Get rows as dictionaries
    cursor.execute("SELECT nombre,usuario,correo,edad, persona_imagen FROM persona WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    
    cursor.close()
    connection.close()

    if user:
        print(user)
        return jsonify(user)
    else:
        print(f"User with ID {user_id} not found.")
        return jsonify({"error": "User not found"}), 404
    
@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/get_exercises', methods=['GET'])
def get_exercises():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)  # Fetch results as dictionaries

    cursor.execute("SELECT * FROM ejercicio")
    exercises = cursor.fetchall()
    print(exercises)
    
    cursor.close()
    connection.close()

    return jsonify(exercises)

if __name__ == '__main__':
    app.run(debug=True)


# --------------------------------------------------------------------------------

 #no poner nada debajo de esto sino no funciona




