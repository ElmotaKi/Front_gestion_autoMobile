import React from 'react'

const IconButton = (props) => (
    <button onClick={props.onClick} className="icon-button" style={{color:props.color}}>
      {props.children}
    </button>
  );
  
  export default IconButton;