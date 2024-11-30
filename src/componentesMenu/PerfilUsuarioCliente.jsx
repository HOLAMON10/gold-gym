import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import NavBarClient from "../Components/NavigationMenuClient";
import { Alert, Snackbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [preview, setPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [userData, setUserData] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    edad: "",
    imagen: ""
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    const userId = sessionStorage.getItem("id");

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData({
            nombre: data.nombre,
            usuario: data.usuario,
            correo: data.correo,
            edad: data.edad,
            imagen: data.imagen
          });
          console.log("User data fetched:", data);
          setPreview(data.persona_imagen);
        } else {
          setAlertSeverity("error");
          setAlertMessage("Failed to fetch user data.");
          setAlertOpen(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAlertSeverity("error");
        setAlertMessage("An error occurred while fetching user data.");
        setAlertOpen(true);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && file.size < 5 * 1024 * 1024) {
      setImage(URL.createObjectURL(file));
      setOriginalFile(file);
    } else {
      setAlertSeverity("error");
      setAlertMessage("Invalid file. Please upload an image less than 5 MB.");
      setAlertOpen(true);
    }
  };

  const onCropChange = (newCrop) => setCrop(newCrop);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSave = async () => {
    const userId = sessionStorage.getItem("id");
    if (!userId) {
      setAlertSeverity("error");
      setAlertMessage("User not logged in.");
      setAlertOpen(true);

      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("nombre", userData.nombre);
    formData.append("usuario", userData.usuario);
    formData.append("correo", userData.correo);
    formData.append("edad", userData.edad);
  
    if (image && croppedArea) {
      const croppedImage = await getCroppedImg(image, croppedArea);
      if (originalFile) {
        const originalFileName = originalFile.name;  
        const fixedPath = originalFileName.replace(/^(\.\.\/)+/, '/');
        formData.append("file", croppedImage, fixedPath);
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
       
        setUserData(updatedUser);
        if(updatedUser.persona_imagen) setPreview(updatedUser.persona_imagen);
        setUserData(userData)
        setAlertSeverity("success");
        setAlertMessage("User information saved successfully!");
        setAlertOpen(true)

        
      } else {
        setAlertSeverity("error");
        setAlertMessage("Failed to save user information.");
      }
    } catch (error) {
      console.error("Error saving user information:", error);
      setAlertSeverity("error");
      setAlertMessage("An error occurred while saving user information.");
    } finally {
      setAlertOpen(true);
    }
  };

  return (
    <div className="bg-[#333333] min-h-screen">
      <NavBarClient />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-[#1F1F1F] rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            {image ? (
              <div className="relative w-full" style={{ height: "400px" }}>
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
              <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden">
                {preview ? (
                  <img
                    src={`/images/${preview}`}
                    alt="Profile Preview"
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
            )}
            <button
              onClick={() => fileInputRef.current.click()}
              className="text-sm text-[#F7F7F7] hover:text-indigo-800"
            >
              Change Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-[#1F1F1F] rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold  mb-4 text-[#F7F7F7]">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium  mb-1 text-[#F7F7F7]">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#577399] focus:border-[#577399] bg-[#1F1F1F] text-[#F7F7F7]" 
                value={userData.nombre}
                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1 text-[#F7F7F7]">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#577399] bg-[#1F1F1F] text-[#F7F7F7]"
                value={userData.usuario}
                onChange={(e) => setUserData({ ...userData, usuario: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium  mb-1 text-[#F7F7F7]">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#577399] bg-[#1F1F1F] text-[#F7F7F7]"
                value={userData.correo}
                onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-[#F7F7F7]">Age</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-[#577399] bg-[#1F1F1F] text-[#F7F7F7]"
                value={userData.edad}
                onChange={(e) => setUserData({ ...userData, edad: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
      <Snackbar
        open={alertOpen}
        autoHideDuration={600}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        style={{marginTop:'3%'}} 
       
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          icon={<CheckIcon fontSize="inherit" />}
          sx={{
            backgroundColor: alertSeverity === 'success' ? '#169873' : alertSeverity === 'error' ? '#f44336' : '#ff9800', // Custom background colors for success, error, or warning
            color: 'white', // White text for better contrast
            borderRadius: '8px', // Rounded corners
            fontWeight: 'bold', // Bold text
            boxShadow: 2, // Light shadow for elevation effect
            padding: '16px 24px', // Padding for better spacing
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserProfile;
