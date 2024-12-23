import React, { useState, useEffect, useRef } from 'react';
import './MenuAdmin.css';
import NavigationMenu from "../Components/NavigationMenuEmpAdmin";
import FormCrearRecoAlimen from './FormCrearRecoAlimen';
import Cropper from "react-easy-crop";
function MenuRecoAlimenAdmin() {
    const [RecoAlimen, setRecoAlimen] = useState([]);
    const [showEditPopup, setShowEditPopup] = useState(false);  // Controlar si mostrar o no la ventana emergente
    const [SelectedRecoAlimen, setSelectedRecoAlimen] = useState(null);  // Guardar el ejercicio seleccionado para editar
    const [objetivo, setObjetivo] = useState('');
    const [calorias, setCalorias] = useState('');
    const [proteina, setProteina] = useState('');
    const [carbo, setCarbo] = useState('');
    const [imagen_recom, setImagen] = useState('');
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [preview, setPreview] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);


    // Obtener los datos de los Recomendaciones Alimenticias
    useEffect(() => {
        fetch('http://localhost:5000/verRecoAlimen', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verifica qué datos se reciben
                if (data && data.data) {
                    setRecoAlimen(data.data);  // Asigna los datos de las recomendaciones alimenticias
                } else {
                    console.log("No se encontró la propiedad 'data' en la respuesta de recomendaciones alimenticias");
                }
            })
            .catch(error => console.error('Error al obtener datos de recomendaciones alimenticias:', error));
    }, []);



    // Función para eliminar recomendación alimenticia
    const handleEliminarRecoAlimen = (id) => {
        fetch(`http://localhost:5000/api/eliminarRecoAlimen/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); // Mensaje de éxito
                    // Actualizar el estado de las recomendaciones alimenticias
                    setRecoAlimen(prevRecoAlimen => prevRecoAlimen.filter(item => item.id !== id));
                } else {
                    alert(data.error); // Mensaje de error
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al eliminar la recomendación alimenticia');
            });
    };




    // Función para abrir el popup y cargar los datos del ejercicio seleccionado
    const handleEditarRecoAlimen = (reco) => {
        setSelectedRecoAlimen(reco);
        setObjetivo(reco.objetivo);  // Cargar los datos actuales del ejercicio
        setCalorias(reco.calorias);
        setProteina(reco.proteina);
        setCarbo(reco.carbo);
        setImagen(reco.imagen_recom);
        setShowEditPopup(true);  // Mostrar la ventana emergente
    };



    // Función para cerrar el popup
    const handleClosePopup = () => {
        setShowEditPopup(false);
        setSelectedRecoAlimen(null);
    };


    // Función para enviar las actualizaciones al servidor
    const handleActualizarRecoAlimen = () => {
        const formData = new FormData();

        // Append the fields to FormData
        formData.append('calorias', calorias);
        formData.append('carbo', carbo);
        formData.append('proteina', proteina);
        formData.append('objetivo', objetivo);


        if (fileInputRef.current.files[0]) {
            formData.append('imagen_recom', fileInputRef.current.files[0]);
        }

        fetch(`http://localhost:5000/api/actualizarRecoAlimen/${SelectedRecoAlimen.id}`, {
            method: 'PATCH',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Recomendacion actualizado correctamente');
                    setShowEditPopup(false);  // Cerrar el popup
                    // Actualizar la tabla de ejercicios con los nuevos datos
                    setRecoAlimen(prevRecoAlimen => prevRecoAlimen.map(ej => ej.id === SelectedRecoAlimen.id ? { ...ej, objetivo: objetivo, calorias, proteina, carbo, imagen_recom: data.imagen_imagen_recom } : ej));

                } else {
                    alert(data.error);
                }
            })
            .catch(error => {
                console.error('Error al actualizar la recomendacion:', error);
                alert('Hubo un error al actualizar el recomendacion');
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

            <div id="menu-admin-container" className="bg-[#292929] min-h-screen"
                style={{
                    backgroundColor: '#292929',
                    backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '10px 10px',
                }}>

                <br />
                <h2 style={{ color: 'white', fontSize: '36px', fontFamily: 'Arial, sans-serif' }}>Recomendación Alimenticia</h2>

                <table id="RecoAlimen">
                    <thead>
                        <tr>
                            <th>Objetivo</th>
                            <th>Calorías</th>
                            <th>Proteína</th>
                            <th>Carbohidratos</th>
                            <th>Imagen</th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {RecoAlimen.length > 0 ? (
                            RecoAlimen.map(reco => (
                                <tr key={reco.id}>
                                    <td>{reco.objetivo}</td>
                                    <td>{reco.calorias}</td>
                                    <td>{reco.proteina}</td>
                                    <td>{reco.carbo}</td>


                                    <td>
                                        {reco.imagen_recom ? (
                                            <img
                                                src={`/images/${reco.imagen_recom}`}
                                                alt={reco.objetivo}
                                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>

                                    <td>
                                        <button
                                            style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEditarRecoAlimen(reco)}
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            style={{ backgroundColor: '#f44336', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                                            onClick={() => handleEliminarRecoAlimen(reco.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No hay recomendaciones alimenticias</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <br />
                <FormCrearRecoAlimen />

                {/* Ventana emergente de edición */}
                {showEditPopup && (
                    <div className="popup-overlay">
                        <div className="popup-container">
                            <h3>Editar Recomendacion</h3>
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
                                    <button
                                        onClick={() => {fileInputRef.current.click()}}
                                    >
                                        <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-300 rounded-full mb-4 overflow-hidden">
                                            {imagen_recom ? (
                                                <img
                                                    src={`/images/${imagen_recom}`}
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
                                <label htmlFor="calorias">Calorias</label>
                                <input
                                    type="text"
                                    id="calorias"
                                    value={calorias}
                                    onChange={(e) => setCalorias(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="proteina">Proteina</label>
                                <input
                                    type="text"
                                    id="proteina"
                                    value={proteina}
                                    onChange={(e) => setProteina(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="carbo">Carbohidratos</label>
                                <input
                                    type="text"
                                    id="carbo"
                                    value={carbo}
                                    onChange={(e) => setCarbo(e.target.value)}
                                />
                            </div>
                            <div>
                                <button
                                    className="popup-button update"
                                    onClick={handleActualizarRecoAlimen}
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
                )}

            </div>
        </div>
    );
}

export default MenuRecoAlimenAdmin;
