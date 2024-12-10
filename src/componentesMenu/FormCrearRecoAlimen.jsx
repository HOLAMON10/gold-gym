import React,{ useState, useRef }  from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import './MenuAdmin.css';

function FormCrearRecoAlimen() {
    const [image, setImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    const fileInputRef = useRef(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [croppedArea, setCroppedArea] = useState(null);
    const [preview, setPreview] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
            setImage(URL.createObjectURL(file));
            setOriginalFile(file);
            setShowCropper(true); // Open the cropper modal
        } else {
            alert("Invalid file. Please upload an image less than 5 MB.");
        }
    };

    const onCropChange = (newCrop) => setCrop(newCrop);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const handleSaveCrop = async () => {
        if (image && croppedArea) {
            const croppedImage = await getCroppedImg(image, croppedArea);
            setPreview(URL.createObjectURL(croppedImage)); // Show preview of the cropped image
            setShowCropper(false); // Close the cropper modal
        }
    };
    const Agregarclic = async () => {
        const objetivo = document.getElementById("objetivo").value;
        const calorias = document.getElementById("calorias").value;
        const proteina = document.getElementById("proteina").value;
        const carbo = document.getElementById("carbo").value;
    
        // Create a FormData object
        const formData = new FormData();
        formData.append("objetivo", objetivo);
        formData.append("calorias", calorias);
        formData.append("proteina", proteina);
        formData.append("carbo", carbo);
    
        // Add the image file to FormData if available
        if (originalFile) {
            formData.append("imagen_recom", originalFile);
        }
        console.log(originalFile)
        try {
            const response = await fetch("http://localhost:5000/api/agregarRecoAlimen", {
              method: "POST",
              body: formData,
            });
            console.log(response)
            
            if (response.ok) {
              alert("Recomendacion registrado exitosamente");
            } else {
              alert("Error al registrar Recomendacion.");
            }
          } catch (error) {
            alert("Error al registrar Recomendacion.");
            
            console.error("Error:", error);
          }
    };
    

    return (
        <div className="form-small-container">
            <h2>Agregar Recomendacion Alimenticia</h2>
            <input
                type="text"
                id="objetivo"
                placeholder="Ingresa objetivo"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="calorias"
                placeholder="Ingrese cantidad calorias"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="proteina"
                placeholder="Ingrese cantidad proteina"
                className="inputs-Crear"
            />

            <input
                type="number"
                id="carbo"
                placeholder="Ingrese cantidad carbo"
                className="inputs-Crear"
            />
            <div>
                {preview ? (
                    <img src={preview} alt="Cropped Preview" className="w-32 h-32 object-cover rounded-full" />
                ) : (
                    <button>
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center" onClick={() => fileInputRef.current.click()}>
                            <span>Preview</span>
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

            {/* Cropper Modal */}
            {showCropper && (

                <div className="cropper-modal">
                    <div className="cropper-container">
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
                    <button onClick={handleSaveCrop} className="btn-save-crop">
                        Guardar Recorte
                    </button>

                </div>
            )}


            <button onClick={Agregarclic} className="btn-crear-usuario">Agregar</button>
        </div>
    );
}


export default FormCrearRecoAlimen;
