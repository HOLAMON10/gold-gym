import React, { useState, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import NavBarClient from "../Components/NavigationMenuClient";

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

  useEffect(() => {
    const userId = sessionStorage.getItem("id");

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log("User data fetched:", data);
          setPreview(data.persona_imagen);
        } else {
          console.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      alert("Invalid file. Please upload an image less than 5 MB.");
    }
  };

  const onCropChange = (newCrop) => setCrop(newCrop);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleSave = async () => {
    const userId = sessionStorage.getItem("id");
    if (!userId) {
      alert("User not logged in.");
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
        // Use the original file's name when appending the cropped image
        const originalFileName = originalFile.name;  // Get the original filename
        const fixedPath = originalFileName.replace(/^(\.\.\/)+/, '/');
        formData.append("file", croppedImage, fixedPath);  // Append with original filename
      }
      
    }

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        alert("Profile updated successfully.");
        setUserData(updatedUser);
        setPreview(updatedUser.persona_imagen);
        console.log("Updated preview value:");
      } else {
        alert("Failed to save user information.");
      }
    } catch (error) {
      console.error("Error saving user information:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="bg-gray-100">
      <NavBarClient />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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
              className="text-sm text-indigo-600 hover:text-indigo-800"
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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.nombre}
                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.usuario}
                onChange={(e) => setUserData({ ...userData, usuario: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={userData.correo}
                onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
    </div>
  );
};

export default UserProfile;
