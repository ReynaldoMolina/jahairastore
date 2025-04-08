import React from "react";
import "./MainContent.css";

function MainContent({ children }) {
  return (
    <section className="flx flx-col main-content">
      {children}
    </section>
  )
}

export { MainContent };