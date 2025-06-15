import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20 py-10">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center text-gray-500 font-medium text-sm select-none">
        <p>
          &copy; {new Date().getFullYear()} Wulu. All rights reserved.
        </p>
        {/* Optional social links or other footer content can go here */}
      </div>
    </footer>
  );
}
