import React from "react";
import Mapa from './Mapa'; // Import the Mapa component
import NavBarClient from "../Components/NavigationMenuClient";

const ContactPage = () => {
  // Organization's contact details
  const organizationContact = {
    whatsapp: "+506 7010-1234", // Replace with your actual WhatsApp number
    email: "contact@gym.com", // Replace with your actual email address
  };

  return (
    <div>
      <NavBarClient/>

      <div className="bg-[#333333] min-h-screen py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Contact Us</h1>


        <div className="max-w-screen-lg mx-auto mb-12">
          <Mapa />
        </div>

        {/* Contact Information */}
        <div className="max-w-screen-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-center text-gray-600 mb-6">If you have any questions or want to visit us, feel free to contact us!</p>

          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-800">WhatsApp:</strong>
              <a
                href={`https://wa.me/${organizationContact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {organizationContact.whatsapp}
              </a>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-800">Email:</strong>
              <a
                href={`mailto:${organizationContact.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {organizationContact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
