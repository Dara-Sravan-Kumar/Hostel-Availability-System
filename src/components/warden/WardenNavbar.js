import React from 'react';
import WardenItems from './WardenItems';
import './css/Style.css'

const WardenNavbar = ({menuItems}) => {
  return (
    <nav>
      <ul className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return (
            <WardenItems
              items={menu}
              key={index}
              depthLevel={depthLevel}
            />
          );
        })}
      </ul>
    </nav>
  );
};
  
  export default WardenNavbar;