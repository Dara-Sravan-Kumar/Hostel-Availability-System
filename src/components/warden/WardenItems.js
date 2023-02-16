import React from 'react';
import WardenDropdown from './WardenDropdown';
import { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import './css/Style.css'

const MenuItems = ({ items, depthLevel }) => {
    const [dropdown, setDropdown] = useState(false);
    const closeDropdown = () => {
      dropdown && setDropdown(false);
    };
    let ref = useRef();
    useEffect(() => {
        const handler = (event) => {
         if (dropdown && ref.current && !ref.current.contains(event.target)) {
          setDropdown(false);
         }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
         // Cleanup the event listener
         document.removeEventListener("mousedown", handler);
         document.removeEventListener("touchstart", handler);
        };
       }, [dropdown]);

    const onMouseEnter = () => {
    window.innerWidth > 960 && setDropdown(true);
    };
    
    const onMouseLeave = () => {
    window.innerWidth > 960 && setDropdown(false);
    };

  return (
    <li 
        className="menu-items" 
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={closeDropdown}
    >
      {items.submenu ? (
        <>
          <button 
            type="button" 
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => setDropdown((prev) => !prev)}
            >
            {items.title}{' '}
            {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow" />}
          </button>
          <WardenDropdown 
            depthLevel={depthLevel}
            dropdown={dropdown}
            submenus={items.submenu} 
            
            
            />
        </>
      ) : (
        <Link to = {items.url}>{items.title} </Link>
      )}
    </li>
  );

};

export default MenuItems;