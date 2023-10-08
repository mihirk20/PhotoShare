import React from "react";
import "./LocationsList.css";
import LocationsItem from "./LocationsItem";
const LocationList=(props)=>{
if (props.items.length==0){
    return(
        <div className="center">
            <h2>No Locations Found</h2>
        </div>
    )
}
return(
    <ul className="locationsList">
        {props.items.map((location)=>{
            return(
                <LocationsItem
                key={location.id}
                id={location.id}
                title={location.title}
                address={location.address}
                desc={location.desc}
                pic={location.pic}
                />
            )
        })}
    </ul>
)
}

export default LocationList;