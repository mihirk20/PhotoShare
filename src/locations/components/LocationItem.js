import React from "react";
import "./LocationItem.css";
import DeleteButton from "../pages/delLocation";
const LocationsItem = (props) => {
  return (
    <li className="locationitem">
      <div className="locationitem-content">
        <div className="locationitem-pic">
          <img src={`http://localhost:5000/${props.pic}`} alt={props.title} />
        </div>
        <div className="locationitem-infor">
          <h2>{props.title}</h2>
          <h3>{props.desc}</h3>
          <p>{props.address}</p>
        </div>
        <div className="locationitem-delete" id="delete">
        {/* document.getElementById("delete").onclick = function()  */}
        {/* <button onClick={DeleteButton}>Delete</button> */}
        <DeleteButton locid={props.id} onDelete={props.onDelete} />
        </div>
      </div>
    </li>
  );
};
export default LocationsItem;
