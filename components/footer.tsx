import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-orange-500 mt-40">
      <div className="container py-6 px-4 mx-auto">
        <div className="flex flex-wrap gap-14 md:justify-center">
            <div className="flex justify-between gap-x-4 text-white">
                <h1>Hotel Apps</h1>
                <h1>Jl. Serta Negara No XX</h1>
                <h1>Phone Number : 08282881288</h1>
            </div>
         </div> 
      </div>
    </footer>
  );
};
