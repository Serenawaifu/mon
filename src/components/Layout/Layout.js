import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import ThemeSwitcher from "./ThemeSwitcher";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// PropTypes for type checking
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
