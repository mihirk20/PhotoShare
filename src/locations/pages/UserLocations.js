import React, { useEffect, useState } from "react";
import LocationsList from "../components/LocationsList"
import { useParams } from "react-router-dom";
const UserLocations = (props) => {
    // const USER_LOCATIONS = [
    //     {
    //         id: "loc1",
    //         title: "Red Fort",
    //         desc: "The Red Fort or Lal Qila (Hindustani: [laːl qiːlaː]) is a historic fort in the Old Delhi neighbourhood of Delhi, India",
    //         pic: "https://media-cdn.tripadvisor.com/media/photo-s/21/59/70/42/caption.jpg",
    //         address: "52HC+VFH, Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003",
    //         userid: "u1"
    //     },
    //     {
    //         id: "loc2",
    //         title: "Jaigarh Fort",
    //         desc: "Jaigarh Fort is situated on the promontory called the Cheel ka Teela (Hill of Eagles) of the Aravalli range",
    //         pic: "https://www.trawell.in/admin/images/upload/151648856Jaipur_Jaigarh_Fort_Main.jpg",
    //         address: "Devisinghpura, Amer, Jaipur, Rajasthan 302028",
    //         userid: "u1"
    //     },
    //     {
    //         id: "loc1",
    //         title: "Red Fort",
    //         desc: "The Red Fort or Lal Qila (Hindustani: [laːl qiːlaː]) is a historic fort in the Old Delhi neighbourhood of Delhi, India",
    //         pic: "https://media-cdn.tripadvisor.com/media/photo-s/21/59/70/42/caption.jpg",
    //         address: "52HC+VFH, Agra Fort, Rakabganj, Agra, Uttar Pradesh 282003",
    //         userid: "u2"
    //     }
    // ];
    const userid = useParams().userid;
    const [error, setError] = useState();
    const [saveLocations, setSavedLocations] = useState();
    useEffect(() => {
        const sendRequest = async () => {
            try {
                const response = await (`http://localhost:5000/api/locations/users/${userid}`)
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message)

                }
                setSavedLocations(responseData.message);
            } catch (err) {
                alert(err.message, () => {
                    setError(null);
                });
                setError(err.message);
            }

        }
        sendRequest();
    }, [userid])

    // const FILTERED_LOCATIONS = USER_LOCATIONS.filter(location => location.userid === userid);
    return (
        < React.Fragment>{saveLocations && <LocationsList items={saveLocations} />}</React.Fragment>)

};

export default UserLocations;