import React, { useState, useEffect, useRef } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenuEmpAdmin";
import FormCrearEjercicio from "./FormCrearEjercicio";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";

function MenuEjercicioAdmin() {
    const [ejercicio, setEjercicios] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);  // Controlar si mostrar o no la ventana emergente
    const [selectedEjercicio, setSelectedEjercicio] = useState(null);  // Guardar el ejercicio seleccionado para editar
    const [nombreEjer, setNombreEjercicio] = useState('');
    const [repeticiones, setRepeticiones] = useState('');
    const [levantamientos, setLevantamientos] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagen_ejercicio, setImagen] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [preview, setPreview] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    // Obtener los datos de los Ejercicios para bajar peso
    useEffect(() => {
        fetch('http://localhost:5000/verEjercicios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setEjercicios(data.data);  // Asigna los datos de los ejercicios
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta");
                }
            })
            .catch(error => console.error('Error al obtener datos de ejercicios BP:', error));
    }, []);


    // Función para eliminar ejercicio
    const handleEliminarEjercicio = (id) => {
        fetch(`http://localhost:5000/api/eliminarEjercicio/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Mensaje de éxito
                    // Actualizar el estado de los ejercicios
                    setEjercicios(prevEjercicios => prevEjercicios.filter(ejercicio => ejercicio.id !== id));
                } else {
                    alert(data.error); // Mensaje de error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al eliminar el ejercicio');
            });
    };

    //-------------------------------------

    // Función para abrir el popup y cargar los datos del ejercicio seleccionado
    const handleEditarEjercicio = (ejercicio) => {
        setSelectedEjercicio(ejercicio);
        setNombreEjercicio(ejercicio.nombreEjer);  // Cargar los datos actuales del ejercicio
        setRepeticiones(ejercicio.repeticiones);
        setLevantamientos(ejercicio.levantamientos);
        setObjetivo(ejercicio.objetivo);
        setDescripcion(ejercicio.descripcion);
        setImagen(ejercicio.imagen_ejercicio);
        setShowEditPopup(true);  // Mostrar la ventana emergente
    };

    // Función para cerrar el popup
    const handleClosePopup = () => {
        setShowEditPopup(false);
        setSelectedEjercicio(null);
    };

    // Función para enviar las actualizaciones al servidor
    const handleActualizarEjercicio = () => {
        // Create a FormData object to send the form data and the file
        const formData = new FormData();

        // Append the fields to FormData
        formData.append('nombreEjer', nombreEjer);
        formData.append('repeticiones', repeticiones);
        formData.append('levantamientos', levantamientos);
        formData.append('objetivo', objetivo);
        formData.append('descripcion', descripcion);

        // Check if there is a new image and append it to the form data
        if (fileInputRef.current.files[0]) {
            formData.append('imagen_ejercicio', fileInputRef.current.files[0]);
        }

        // Send the request to the backend
        fetch(`http://localhost:5000/api/actualizarEjercicio/${selectedEjercicio.id}`, {
            method: 'PATCH',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Ejercicio actualizado correctamente');
                    setShowEditPopup(false);  // Close the popup
                    // Update the exercise list with the new details
                    setEjercicios(prevEjercicios => prevEjercicios.map(ej => ej.id === selectedEjercicio.id ? { ...ej, nombreEjer, repeticiones, levantamientos, imagen_ejercicio: data.imagen_ejercicio } : ej));
                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Error al actualizar el ejercicio:', error);
                alert('Hubo un error al actualizar el ejercicio');
            });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
            setImage(URL.createObjectURL(file));
            setOriginalFile(file);
        } else {

        }
    };

    const onCropChange = (newCrop) => setCrop(newCrop);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    return (
        <div>
            <NavigationMenu />
            <div id="menu-admin-container">
                <br />
                <h2 style={{ color: 'Black', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Ejercicios para bajar de peso</h2>

                <table id="ejercicio">
                    <thead>
                        <tr>
                            <th>Nombre Ejercicio</th>
                            <th>Repeticiones</th>
                            <th>Levantamientos</th>
                            <th>Objetivo</th>
                            <th>Descripcion</th>
                            <th>FOTO</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ejercicio.length > 0 ? (
                            ejercicio.map(ejercicio => (
                                <tr key={ejercicio.id}>
                                    <td>{ejercicio.nombreEjer}</td>
                                    <td>{ejercicio.repeticiones}</td>
                                    <td>{ejercicio.levantamientos}</td>
                                    <td>{ejercicio.objetivo}</td>
                                    <td>{ejercicio.descripcion}</td>
                                    <td>
                                        {ejercicio.imagen_ejercicio ? (
                                            <img
                                                src={`/images/${ejercicio.imagen_ejercicio}`}
                                                alt={ejercicio.nombreEjer}
                                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td></td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEditarEjercicio(ejercicio)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEliminarEjercicio(ejercicio.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay ejercicios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <br />
                <FormCrearEjercicio />

                {/* Ventana emergente de edición */}
                {showEditPopup && (
                    <div className="popup-overlay">
                        <div className="bg-[#1F1F1F] rounded-lg shadow-lg p-4 sm:p-6 mb-6">
                            <div className="popup-container">
                                <h3>Editar Ejercicio</h3>

                                {/* Cropper Section at the top */}
                                <div className="flex flex-col items-center mb-4">
                                    {image ? (
                                        <div className="relative w-full" style={{ height: "300px" }}>
                                            <Cropper
                                                image={image}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={1}
                                                onCropChange={onCropChange}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={(newZoom) => setZoom(newZoom)}
                                            />
                                        </div>
                                    ) : (
                                        <button onClick={() => fileInputRef.current.click()}>
                                            <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-300 rounded-full mb-4 overflow-hidden">
                                                {imagen_ejercicio ? (
                                                    <img
                                                        src={`/images/${imagen_ejercicio}`}
                                                        alt="Current Exercise Image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <img
                                                        src="/images/genericpp.png"
                                                        alt="Profile Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </div>
                                        </button>
                                    )}

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                {/* Form fields for exercise details */}
                                <div>
                                    <div>
                                        <label htmlFor="nombreEjer">Nombre Ejercicio</label>
                                        <input
                                            type="text"
                                            id="nombreEjer"
                                            value={nombreEjer}
                                            onChange={(e) => setNombreEjercicio(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="repeticiones">Repeticiones</label>
                                        <input
                                            type="text"
                                            id="repeticiones"
                                            value={repeticiones}
                                            onChange={(e) => setRepeticiones(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="levantamientos">Levantamientos</label>
                                        <input
                                            type="text"
                                            id="levantamientos"
                                            value={levantamientos}
                                            onChange={(e) => setLevantamientos(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="objetivo">Objetivo</label>
                                        <input
                                            type="text"
                                            id="objetivo"
                                            value={objetivo}
                                            onChange={(e) => setObjetivo(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="descripcion">Descripción</label>
                                        <input
                                            type="text"
                                            id="descripcion"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Buttons to update or cancel */}
                                <div className="mt-4">
                                    <button
                                        className="popup-button update"
                                        onClick={() => handleActualizarEjercicio(imagen_ejercicio)}  // Send only the image name
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        className="popup-button cancel"
                                        onClick={handleClosePopup}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>

        </div>

    );
}

export default MenuEjercicioAdmin;
