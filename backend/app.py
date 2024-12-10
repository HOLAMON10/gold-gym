# backend/app.py
from flask import Flask, request, jsonify,render_template,session,redirect,url_for,Blueprint,send_from_directory
import json
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from flask_session import Session
from ConexionDB.database import get_db_connection

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)
CORS(app, supports_credentials=True)






#-------------------------------------CRUDS------------------------------------------


# METODOS PARA AGREGAR --------------------------------------------------------------

# Registrar Usuarios
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    nombre = data.get('nombre')
    cedula = data.get('cedula')
    rol = data.get('rol')
    print(f"Rol recibido desde la solicitud: {rol}")
    usuario = data.get('usuario')
    contra = data.get('contra')
    correo = data.get('correo')
    edad = data.get('edad')

    # Validación de campos requeridos
    if not nombre or not cedula or not rol or not usuario or not contra or not correo or not edad:
        return jsonify({"message": "Todos los campos son requeridos"}), 400

    # Conectar a la base de datos
    connection = get_db_connection()
    cursor = connection.cursor()

    try:

       

        # Insertar el usuario en la tabla persona
        cursor.execute("""
            INSERT INTO persona (nombre, cedula, rol, usuario, contra, correo, edad)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (nombre, cedula, rol, usuario, contra, correo, edad))

        # Obtener el ID de la persona recién insertada
        person_id = cursor.lastrowid  
        print("Id de persona insertado: " + str(person_id))

        # Verificar el rol de la persona recién insertada
        cursor.execute('SELECT rol FROM persona WHERE id = %s', (person_id,))
        result = cursor.fetchone()

        # Verificar si el resultado contiene un rol válido
        if result:
            rol_en_base = result[0]  # El rol se encuentra en el primer elemento de la tupla
            print(f"Rol en base de datos: {rol_en_base}")

            # Dependiendo del rol, insertar en la tabla correspondiente
            if rol_en_base == 'Cliente':
                
                
                print(f"Insertando cliente con idpersona: {person_id}")
                cursor.execute("""
                    INSERT INTO cliente (idpersona) VALUES (%s)
                """, (person_id,))

                client_id = cursor.lastrowid
                print("id de cliente: " + str(client_id))

                cursor.execute("""
                    INSERT INTO estadocuenta (idCli, fecha, estado) VALUES (%s, NOW(), %s)
                """, (client_id, 'Aprobado'))
                

              # Enviar correo al usuario con los datos de registro
                send_email(correo, usuario, contra)



            elif rol_en_base == 'Empleado':
                # Insertar en la tabla empleado
                
               
                send_email(correo, usuario, contra)


            else:
                print("Rol no válido o no se cumple ninguna condición")
        else:
            print("No se encontró el rol para la persona")

        # Confirmar la transacción
        connection.commit()
        return jsonify({"message": "Usuario registrado exitosamente"}), 201

    except Exception as e:
        print(f"Error: {e}")
        connection.rollback()  # Hacer rollback en caso de error
        return jsonify({"message": "Error al registrar usuario", "error": str(e)}), 500

    finally:
        cursor.close()
        connection.close()






#Registrar Ejercicios 
@app.route('/api/agregarEjercicio', methods=['POST'])
def agregarEjercicio():
    # Get form data
    nombreEjer = request.form.get('nombreEjer')
    repeticiones = request.form.get('repeticiones')
    levantamientos = request.form.get('levantamientos')
    objetivo = request.form.get('objetivo')
    descripcion = request.form.get('descripcion')
    
    # Get the image file
    imagen_ejercicio = request.files.get('file')

    # If there is an image, save it to the public/images folder
    if imagen_ejercicio:
        filename = secure_filename(imagen_ejercicio.filename)
        filepath = os.path.join(PUBLIC_IMAGES_FOLDER, filename)
        imagen_ejercicio.save(filepath)
    else:
        filename = None

    # Connect to the database
    connection = get_db_connection()
    cursor = connection.cursor()

    # Insert the exercise data into the database
    cursor.execute("""
        INSERT INTO ejercicio (nombreEjer, repeticiones, levantamientos, objetivo, descripcion, imagen_ejercicio)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (nombreEjer, repeticiones, levantamientos, objetivo, descripcion, filename))

    # Commit the transaction and close the connection
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Ejercicio registrado exitosamente", "imagen_ejercicio": filename}), 201






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







# Editar Registros  -------------------------------------------------------------

@app.route('/api/actualizarEjercicio/<int:id>', methods=['PATCH'])
def actualizarEjercicio(id):
    conn = None
    try:
        # Obtener los datos del formulario
        nombreEjer = request.form.get("nombreEjer")
        repeticiones = request.form.get("repeticiones")
        levantamientos = request.form.get("levantamientos")
        objetivo = request.form.get("objetivo")
        descripcion = request.form.get("descripcion")


        if not nombreEjer:
            return jsonify({"error": "El nombre del ejercicio es requerido"}), 400

        # Conectar a la base de datos
        conn = get_db_connection()
        cursor = conn.cursor()

        # Si hay un archivo de imagen en la solicitud, guardarlo en el servidor
        if 'imagen_ejercicio' in request.files:
            file = request.files['imagen_ejercicio']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                print(filename)
                print(PUBLIC_IMAGES_FOLDER)
                filepath = os.path.join(PUBLIC_IMAGES_FOLDER, filename)
                file.save(filepath)
                  # Usamos el nombre del archivo guardado

        # Actualizar el ejercicio en la base de datos
        cursor.execute('''
            UPDATE ejercicio
            SET nombreEjer = %s, repeticiones = %s, levantamientos = %s, objetivo = %s, descripcion = %s, imagen_ejercicio = %s
            WHERE idEjercicio = %s
        ''', (nombreEjer, repeticiones, levantamientos, objetivo, descripcion, filename, id))

        conn.commit()
        cursor.close()
        conn.close()

        # Retornar una respuesta de éxito, incluyendo el nombre de la imagen
        return jsonify({"message": "Ejercicio actualizado correctamente", "imagen_ejercicio": filename}), 200

    except Exception as e:
        print(f"Error al actualizar el ejercicio: {e}")
        return jsonify({"error": "Hubo un problema al actualizar el ejercicio"}), 500




#Actualizar Recomendaciones Alimenticias
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







#Actualizar  Usuario
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






#METODOS PARA ELIMINAR REGITROS---------------------------------------------------------------

#ELIMINAR USUARIO
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






#ELIMINAR RECOMENDACIONES ALIMENTICIAS
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








#ELIMINAR USUARIO
@app.route('/api/eliminarUsuario/<int:id>', methods=['DELETE'])
def eliminarUsuario(id):
    print(f"Intentando eliminar Persona con id: {id}")  
    try:
   
        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute('SELECT idCliente FROM cliente WHERE idpersona = %s', (id,))
        cliente = cursor.fetchone()  # Obtener el resultado de la consulta
        client_id = cliente[0] if cliente else None
        print(f"Id de cliente: {client_id}")

        # Verificar si el id pertenece a un empleado
        cursor.execute('SELECT idpersona FROM empleado WHERE idpersona = %s', (id,))
        empleado = cursor.fetchone()

        if cliente:  # Si es un cliente
            # Primero, eliminar los registros en estadocuenta
            cursor.execute('DELETE FROM estadocuenta WHERE idCli = %s', (client_id,))

            # Luego, eliminar el cliente
            cursor.execute('DELETE FROM cliente WHERE idpersona = %s', (id,))

        elif empleado:  # Si es un empleado
            # Eliminar el empleado
            cursor.execute('DELETE FROM empleado WHERE idpersona = %s', (id,))

        else:
            return jsonify({"error": "Usuario no encontrado en cliente ni empleado"}), 404

        # Eliminar la persona (después de cliente o empleado)
        cursor.execute('DELETE FROM persona WHERE id = %s', (id,))

        # Confirmar la transacción
        connection.commit()

        # Cerrar la conexión
        cursor.close()
        connection.close()

        return jsonify({"message": f"Usuario con id {id} eliminado exitosamente"}), 200

    except Exception as e:
        print(f"Error al eliminar el usuario: {e}")
        return jsonify({"error": "Hubo un problema al eliminar el usuario"}), 500








#-----------------------------------------------------------------------------------------------------

# FUNCIONAMIENTO LOGIN--------------------------------------------------------------------------------


#LOGIN
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM persona WHERE usuario = %s AND contra = %s', (username, password))
    
    record = cursor.fetchone()
    print(f"Registro encontrado: {record}")

    if record:
        # Verificar si el usuario es un cliente
        if record[3] == 'Cliente':  # Asumiendo que el rol 'cliente' está en la columna 3
            # Obtener el idCliente relacionado con la persona
            cursor.execute('SELECT idCliente FROM cliente WHERE idpersona = %s', (record[0],))
            client_id = cursor.fetchone()
            print(f"ID Cliente encontrado: {client_id}")

            if client_id:
                cursor.execute('SELECT estado FROM estadocuenta WHERE idCli = %s', (client_id[0],))
                estado_cuenta = cursor.fetchone()
                print(f"Estado de cuenta encontrado: {estado_cuenta}")
                
                if estado_cuenta:
                    if estado_cuenta[0] == 'Denegado':
                        response = {
                            'message': 'Estado de cuenta denegado por falta de pago',
                            'loggedin': False
                        }
                        connection.close()
                        return jsonify(response), 403  # Forbidden

        # Si todo está bien, iniciar sesión
        session['loggedin'] = True
        session['username'] = record[5]
        session['role'] = record[3]  # Suponiendo que el rol está en la columna 3
        session['id'] = record[0]
        response = {
            'message': 'Login exitoso',
            'username': session['username'],
            'role': session['role'],
            'id': session['id'],
            'loggedin': True
        }
        connection.close()
        return jsonify(response), 200

    else:
        # Login fallido
        response = {
            'message': 'Usuario o Contraseña incorrectos. Intente de nuevo.',
            'loggedin': False
        }
        return jsonify(response), 401  # Unauthorized

 
 








#LOGOUT
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





#ACTUALIZAR ESTADOS DE CUENTAS PARA EL LOGIN
def validar_estados_al_inicio():
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        
        cursor.execute("""
            UPDATE estadocuenta
            SET estado = 'Denegado'
            WHERE estado = 'Aprobado'
            AND DATEDIFF(NOW(), fecha) > 30;
        """)
        connection.commit()
        print("Estados actualizados exitosamente al iniciar el servidor.")
    except Exception as e:
        print(f"Error al actualizar estados al inicio del servidor: {e}")
        connection.rollback()
    finally:
        cursor.close()
        connection.close()





#-----------------------------------------------------------------------------------------------------
# VISUALCION DE TABLAS--------------------------------------------------------------------------------
 

#VER TABLA PERSONAS QUE SEAN CLIENTES  
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



 
# VER PERSONAS EMPLEADAS
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






#VER EJERCICIOS
@app.route('/verEjercicios', methods=["GET"])
def verEjercicios():
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta para obtener todas las personas con rol "Cliente"
        cursor.execute('SELECT * FROM ejercicio')

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
                'objetivo': ejercicio[4],
                'descripcion': ejercicio[5],
                'imagen_ejercicio': ejercicio[6]
                
            })

        # Cerrar cursor y conexión
        cursor.close()
        connection.close()

        # Devolver los datos en formato JSON
        return jsonify({"data": resultado, "message": "Ejercicios obtenidos correctamente"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": "Error al conectar con la base de datos", "error": str(e)}), 500








#VER RECOMENDACIONES ALIMENTICIAS
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











#-------------------------------------------------------------------------------------------------------------------------
#METODOS DE FUNCIONALIDAD-------------------------------------------------------------------------------------------------

#DAR DATOS DEL USUARIO CON SU ID
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
    





#EDITAR CUENTA
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







#COMIDA
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







#DAR DATOS DEL CLIENTE POR SU ID
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
    









def send_email(to_email, username, password):
    from_email = "flexf9095@gmail.com"  # CORREO DE FLEXXFITNESS
    from_password = "vfxu ppit pmum nkgd"  # CONTRASENA

    # Configuración del servidor SMTP de Gmail
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(from_email, from_password)

    # Crear el mensaje con HTML y estilos
    subject = "Gracias por registrarte en Flex Fitness"
    
    body = f"""
    <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }}
                .container {{
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }}
                h1 {{
                    color: #4CAF50;
                    font-size: 2em;
                }}
                p {{
                    font-size: 1.1em;
                    color: #333;
                }}
                .info {{
                    font-weight: bold;
                    color: #333;
                }}
                .button {{
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                    display: inline-block;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>¡Gracias por registrarte en Flex Fitness!</h1>
                <p>Hola <span class="info">{username}</span>,</p>
                <p>¡Bienvenido a Flex Fitness! Tu registro ha sido exitoso.</p>
                <p>A continuación están tus detalles de acceso:</p>
                <p><strong>Usuario:</strong> {username}</p>
                <p><strong>Contraseña:</strong> {password}</p>
                <a href="https://youtube.com" class="button">Ir al sitio</a>
                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            </div>
        </body>
    </html>
    """

    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'html'))

    # Enviar el correo
    server.sendmail(from_email, to_email, msg.as_string())
    server.quit()







#TRAER LOS EJERCICIO
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






#SELECCIONAR EJERCICIO FAVORITO
@app.route('/api/favorite_exercise', methods=['POST'])
def favorite_exercise():
    data = request.json
    id_cliente = data.get('id_cliente')
    id_ejercicio = data.get('id_ejercicio')
    print(id_cliente)
    print(id_ejercicio)


    # Check if the exercise is already in favorites
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM rutinapersonalizada WHERE id_persona = %s AND id_ejercicio = %s", (id_cliente, id_ejercicio))
    result = cursor.fetchone()

    if result:
        # If the exercise is already in favorites, delete it
        cursor.execute("DELETE FROM rutinapersonalizada WHERE id_persona = %s AND id_ejercicio = %s", (id_cliente, id_ejercicio))
        connection.commit()
        return jsonify({"message": "Exercise removed from favorites"}), 200
    else:
        # If the exercise is not in favorites, add it
        cursor.execute("INSERT INTO rutinapersonalizada (id_persona, id_ejercicio) VALUES (%s, %s)", (id_cliente, id_ejercicio))
        connection.commit()
        return jsonify({"message": "Exercise added to favorites"}), 201





# Actualizar Suscripcion
@app.route('/api/actualizarSuscripcion/<int:id>', methods=['PATCH'])
def actualizarSuscripcion(id):
    try:
        # Conectar a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Imprimir el id recibido para depuración
        print(f"ID del cliente recibido: {id}")
        
        # Obtener el idCliente correspondiente al idPersona
        cursor.execute('SELECT idCliente FROM cliente WHERE idpersona = %s', (id,))
        result = cursor.fetchone()

        if result:
            idcliente = result[0]

            # Obtener el estado de la cuenta
            cursor.execute('SELECT estado FROM estadocuenta WHERE idCli = %s', (idcliente,))
            estado = cursor.fetchone()

            if estado is None:
                # No se encontró ningún estado para este cliente
                return jsonify({"error": "No se encontró el estado de la cuenta"}), 404

            if estado[0] == 'Denegado':  # Comparar con el valor de estado
                # Actualizar el estado de la cuenta a 'Aprobado'
                cursor.execute('''
                    UPDATE estadoCuenta
                    SET fecha = NOW(), estado = 'Aprobado'
                    WHERE idCli = %s
                ''', (idcliente,))

                # Confirmar la transacción
                connection.commit()

                return jsonify({"message": "Suscripción actualizada correctamente"}), 200
            else:
                # Si el estado no es 'Denegado'
                return jsonify({"error": "La suscripcion aun sigue activa"}), 400
        else:
            # No se encontró el cliente asociado a la persona
            return jsonify({"error": "No se encontró el cliente asociado"}), 404

    except Exception as e:
        # Imprimir el error para depuración
        print(f"Error al actualizar la suscripción: {e}")
        return jsonify({"error": "Hubo un problema al actualizar la suscripción"}), 500

    finally:
        # Cerrar la conexión y el cursor
        if cursor:
            cursor.close()
        if connection:
            connection.close()



# SACAR ESCALA 1 A 10 ESTADISTICAS
@app.route('/api/calculoPesoIdeal', methods=['POST'])
def calculoPesoIdeal():
    data = request.json  # Obtener el cuerpo JSON enviado desde React

    # Convertir a los tipos correctos para evitar problemas de tipo
    peso = float(data.get('peso'))  # Convertir el peso a flotante
    altura = int(data.get('altura'))  # Convertir la altura a entero
    edad = int(data.get('edad'))  # Convertir la edad a entero
    sexo = data.get('sexo')
    id_persona = data.get('id_persona')  # ID de la persona

    # Conectar a la base de datos
    connection = get_db_connection()
    cursor = connection.cursor()

    # Convertir altura de cm a metros para el cálculo de IMC
    altura_metros = altura / 100

    # Cálculo de IMC
    IMC = peso / (altura_metros ** 2)

    # Calcular la puntuación por IMC (rango ideal entre 18.5 y 24.9)
    if IMC < 18.5:
        puntuacion_imc = 1  # Muy bajo
    elif 18.5 <= IMC < 22:
        puntuacion_imc = 8  # Ideal para personas jóvenes
    elif 22 <= IMC < 25:
        puntuacion_imc = 10  # Ideal
    elif 25 <= IMC < 30:
        puntuacion_imc = 6  # Sobrepeso
    else:
        puntuacion_imc = 3  # Obesidad

    # Ajuste por edad
    if edad < 30:
        puntuacion_final = puntuacion_imc  # Sin ajuste
    elif 30 <= edad < 50:
        puntuacion_final = puntuacion_imc - 1  # Ajuste leve por edad
    else:
        puntuacion_final = puntuacion_imc - 2  # Ajuste mayor por edad

    # Asegurarse de que la puntuación esté entre 1 y 10
    puntuacion_final = max(1, min(10, puntuacion_final))

    # Insertar en la base de datos
    cursor.execute("""
        INSERT INTO estadisticas (peso, altura, edad, sexo, idPerso, escala, fecha)
        VALUES (%s, %s, %s, %s, %s, %s, NOW())
    """, (peso, altura, edad, sexo, id_persona, puntuacion_final))

    # Confirmar la transacción y cerrar la conexión
    connection.commit()
    cursor.close()
    connection.close()

    return jsonify({"message": "Tu escala 1 al 10 para peso ideal es", "escala": puntuacion_final}), 201





@app.route('/api/escalaPesoIdeal/<int:idPersona>', methods=['GET'])
def obtenerEscalaPesoIdeal(idPersona):
    try:
        # Obtener la conexión a la base de datos
        connection = get_db_connection()
        cursor = connection.cursor()

        # Ejecutar la consulta SQL para obtener las columnas 'escala' y 'fecha' filtradas por idPersona
        cursor.execute('SELECT escala, fecha FROM estadisticas WHERE idPerso = %s ORDER BY fecha ASC', (idPersona,))
        registros = cursor.fetchall()  # Obtener todos los resultados de la consulta

        # Verificar si se encontraron registros
        if registros:
            # Convertir los registros a un formato legible para JSON
            registros_format = [(escala, fecha.strftime('%Y-%m-%d %H:%M:%S')) for escala, fecha in registros]
            
            return jsonify(registros_format), 200  # Devolver los registros como JSON
        else:
            # Si no hay registros para ese idPersona, devolver un error
            return jsonify({"error": "No se encontraron registros para este usuario"}), 404

    except Exception as e:
        # Si ocurre un error, imprimirlo y devolver un error genérico
        print(f"Error al obtener los datos: {e}")
        return jsonify({"error": "Hubo un problema al obtener los datos"}), 500

    finally:
        connection.close()






# ----------------------------------------------------------------------------------
# MAIN (no poner nada debajo de esto sino no funciona) -----------------------------


if __name__ == '__main__':
    validar_estados_al_inicio()
    app.run(debug=True)





