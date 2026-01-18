import React from "react";

function Footer({ currentYear }: { currentYear: number }) {
  return (
    <footer className="text-center text-sm text-gray-500 py-6">
      © {currentYear} Prayer Mawere. All rights reserved.
    </footer>
  );
}

export default Footer;
