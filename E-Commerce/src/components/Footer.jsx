import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="text-white py-4 sm:py-8 mt-4 w-[95vw] lg:w-[90vw] mx-auto"
    >
      <div className="lg:px-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="">
            <h1 className="text-black text-2xl font-bold">Govind Hub</h1>
            <p className="text-gray-400">Your one-stop e-commerce solution</p>
            <p className="text-gray-400 font-semibold flex sm:gap-1 flex-col sm:flex-row">
              <span className=" text-nowrap">Wanna use this Website for you company?</span>
              <span className=" text-nowrap"> Contact govindnr20122001@gmail.com</span>
            </p>
          </div>
          <div className="flex space-x-4 self-center my-2">
            <a
              href="#"
              className="text-gray-400 hover:text-amber-300 transition duration-200"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-300 transition duration-200"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-300 transition duration-200"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-amber-300 transition duration-200"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-1 sm:pt-4 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Govind Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
