import React from 'react';
import WardenItems from "./WardenItems";
import './css/Style.css'

const WardenDropdown = ({ submenus, dropdown, depthLevel}) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dd-submenu" : "";
    return (
      <ul className={`dd ${dropdownClass} ${dropdown ? "show" : ""}`}>
        {submenus.map((submenu, index) => (
          <WardenItems 
            items={submenu} 
            key={index} 
            depthLevel={depthLevel} 
          />
        ))}
      </ul>
    );
  };
  
  export default WardenDropdown;