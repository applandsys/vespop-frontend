import "./globals.css";
import React from "react";
import {Toaster} from "react-hot-toast";

import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-poppins', // Matches the variable name in config
});

export default function RootLayout({ children }) {
  return (
      <html lang="en" className={`${poppins.variable}`}>
      <body>
          <div>
              {children}
              <Toaster position="top-right" reverseOrder={false} />
          </div>
      </body>
    </html>
  );
}
