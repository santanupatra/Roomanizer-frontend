import React from "react";
import { withScriptjs, Marker, withGoogleMap, InfoWindow, GoogleMap } from 'react-google-maps';
import { compose, withProps } from "recompose";
import { googleMapURL, defaultCenter, defaultZoom, mapTypeId } from "./mapConfig";
import imagePath from '../../../Config/imageConstants';
import { getImageUrl } from "../../../shared/helpers";
const MapContainer = compose(
    withProps({
        // googleMapURL: googleMapURL + "&libraries=geometry,drawing,places",
        loadingElement: <div className="mapheight" />,
        containerElement: <div className="mapSection" />,
        mapElement: <div className="mapheight" />
    }),
    // withScriptjs,
    withGoogleMap
)(props => {
    return (
        <GoogleMap
            defaultZoom={defaultZoom}
            defaultCenter={defaultCenter}
            mapTypeId={mapTypeId}
        >
            { 
                console.log("props.properties",props.properties)
            
            }
            {
                props.properties && props.properties.map(({ _id, latitude, longitude, roomImage,roomName }, index) => {

                    if (latitude !== "" && longitude !== "")
                        return (
                            <Marker
                                key={`marker-${_id}`}
                                title={roomName || 'hh'}
                                //name={property_type || 'yy'}
                                position={{
                                    lat: +latitude,
                                    lng: +longitude
                                }}
                                icon={{ url: imagePath.mapmarkImage }}
                                //onMouseOver={() => props.setActiveInfoWindow(_id)}
                                //onMouseOut={() => props.setActiveInfoWindow('')}
                                onClick={() => props.navToRoomDetailsPage(_id)}
                            >
                                {props.activeInfoWindow === _id && <InfoWindow
                                    key={`infowindow-${_id}`}
                                    visible={true}
                                >
                                    <div className="inmap">
                                        {/* <img src={getImageUrl(property_image[0].image)} alt="inmap" /> */}
                                        {/* <h6 className="pl-2">{(property_type == "elite_outfitter" || property_type == "premier_outfitter")? "Oufitter" : property_type}</h6> */}
                                    </div>
                                </InfoWindow>
                                }

                            </Marker>
                        )
                    return null;
                })
            }
        </GoogleMap>
    )
})
export default MapContainer; 