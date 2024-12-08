import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import './MenuAdmin.css';

function FormCrearEjercicio() {
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

  const handleSaveExercise = async () => {
    const nombreEjer = document.getElementById("nombreEjer").value;
    const repeticiones = document.getElementById("repeticiones").value;
    const levantamientos = document.getElementById("levantamientos").value;
    const objetivo = document.getElementById("objetivo").value;
    const descripcion = document.getElementById("descripcion").value;

    const formData = new FormData();
    formData.append("nombreEjer", nombreEjer);
    formData.append("repeticiones", repeticiones);
    formData.append("levantamientos", levantamientos);
    formData.append("objetivo", objetivo);
    formData.append("descripcion", descripcion);

    if (preview) {
      formData.append("file", originalFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/agregarEjercicio", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Ejercicio registrado exitosamente");
      } else {
        alert("Error al registrar ejercicio.");
      }
    } catch (error) {
      alert("Error al registrar ejercicio.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-small-container">
      <h2>Agregar Ejercicio</h2>
      <input type="text" id="nombreEjer" placeholder="Nombre Ejercicio" className="inputs-Crear" />
      <input type="number" id="repeticiones" placeholder="Repeticiones" className="inputs-Crear" />
      <input type="number" id="levantamientos" placeholder="Levantamientos" className="inputs-Crear" />
      <select id="objetivo" className="inputs-Crear">
        <option value="">Selecciona el objetivo</option>
        <option value="Pecho">Pecho</option>
        <option value="Espalda">Espalda</option>
        <option value="Piernas">Piernas</option>
      </select>
      <input type="text" id="descripcion" placeholder="Descripción" className="inputs-Crear" />

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
      <button onClick={handleSaveExercise} className="btn-crear-usuario">
        Agregar ejercicio
      </button>
    </div>
  );
}

export default FormCrearEjercicio;
