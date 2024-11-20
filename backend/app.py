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


if __name__ == '__main__':
    app.run(debug=True)


# --------------------------------------------------------------------------------

 #no poner nada debajo de esto sino no funciona




