import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Govind Hub</h1>
            <p className="text-gray-400">Your one-stop e-commerce solution</p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-teal-500 transition duration-200"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Govind Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
