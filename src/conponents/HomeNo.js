import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHome from "../elements/navbarHome";
import HomeNoUser from "./HomeNoUser";

function NavbarComp() {
  return (
    <div>
      <NavbarHome />
      <HomeNoUser />
    </div>
  );
}

export default NavbarComp;
