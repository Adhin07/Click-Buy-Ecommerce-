import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Kart. All rights reserved.
        </p>

        <div className="flex justify-center space-x-4 mt-2">
          {[["https://facebook.com", FaFacebookF, "blue-500"],
            ["https://twitter.com", FaTwitter, "blue-300"],
            ["https://instagram.com", FaInstagram, "pink-500"],
            ["https://linkedin.com", FaLinkedinIn, "blue-700"]].map(([url, Icon, color], index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-${color} transition-all`}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
