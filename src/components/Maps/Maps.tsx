import React from 'react';
// import {GoogleMap, InfoWindow, MarkerF, useLoadScript} from '@react-google-maps/api';
// import {Box, Button, CircularProgress, Dialog, TextField} from "@mui/material";
// import {useEffect, useState} from "react";
// import {useDeleteMarkerMutation, useGetMarkersMutation, usePostMarkerMutation} from "../../store/auth/authApiSlice";
// import PropTypes from "prop-types";
// import {useDispatch, useSelector} from "react-redux";
// import store from "../../store/store";
// import {addLatLng, addText, clearEverything, setCurrentState} from "../../store/markerSlice";
// import {selectCurrentRole} from "../../store/auth/authSlice";

export default function Maps() {
    // const { isLoaded } = useLoadScript({
    //     googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    // });
    // const role = useSelector(selectCurrentRole);
    //
    // if (!isLoaded) return <CircularProgress />
    // return  <div className="map-wrapper">
    //     <Map/>
    //     {
    //         role === "ADMIN" &&
    //         <div className="edit-marker">
    //             <Edit/>
    //         </div>
    //     }
    // </div>
    return (<></>);
}

// function Map() {
//     const [getMarkers] = useGetMarkersMutation();
//     const [deleteMarkers] = useDeleteMarkerMutation();
//     const [markers, setMarkers] = useState([]);
//     const [userLocation, setUserLocation] = useState({});
//     const [selectedElement, setSelectedElement] = useState(null);
//     const inEdit = store.getState().marker && store.getState().marker.title && store.getState().marker.label;
//     const dispatch = useDispatch();
//     const role = useSelector(selectCurrentRole);
//
//     const changeEditLatLng = e => {
//         dispatch(addLatLng({lat: e.latLng.lat(), lng: e.latLng.lng()}))
//     }
//
//     const deleteMarker = marker => {
//         deleteMarkers(marker);
//         window.location.reload()
//     }
//
//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             position => {
//                 const { latitude, longitude } = position.coords;
//
//                 setUserLocation({
//                     userLocation: { lat: latitude, lng: longitude },
//                     loading: false
//                 });
//             },
//             () => {
//                 alert("Please, allow access to your position to be able to see nearest sport-related places and refresh the page")
//                 setUserLocation({ loading: false });
//             }
//         );
//     }, []);
//
//     useEffect(() => {
//         if (userLocation.userLocation) {
//             getMarkers(userLocation.userLocation).then((res) => {
//                 setMarkers(res.data)
//             })
//         }
//     }, [userLocation.userLocation])
//
//     return userLocation.userLocation ? <GoogleMap zoom = {10} center = {userLocation.userLocation} mapContainerClassName="map-container">
//         {
//             markers ? markers.map((m, idx) => (
//                 <MarkerF
//                     position={m.position}
//                     label={m.label}
//                     key={idx}
//                     onClick={() => {
//                         setSelectedElement(m);
//                     }}
//                 />
//             )) : null
//         }
//         {
//             selectedElement ? (
//                 <InfoWindow
//                     position={selectedElement.position}
//                     onCloseClick={() => {
//                         setSelectedElement(null);
//                     }}
//                 >
//                     <div>
//                         <h1>{selectedElement.title}</h1>
//                         <div style={{ fontSize: "14px"}}>{selectedElement.description}</div>
//                         {
//                             role === "ADMIN" &&
//                             <div style={{
//                                 textAlign: "center"
//                             }}>
//                                 <Button
//                                     type="submit"
//                                     variant="contained"
//                                     onClick={() => deleteMarker(selectedElement)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </div>
//                         }
//                     </div>
//                 </InfoWindow>
//             ) : null
//         }
//         {
//             inEdit ?
//                 <MarkerF position={userLocation.userLocation} draggable={true} label={{text: store.getState().marker.label, color: "black", fontWeight: "bold", fontSize: "16px"}} onDrag={changeEditLatLng}/>
//                 : null
//         }
//     </GoogleMap> : <CircularProgress/>
// }
//
// function Edit() {
//     const [open, setOpen] = useState(false);
//     const currentState = store.getState().marker ? store.getState().marker.currentState : "";
//     const [postMarker] = usePostMarkerMutation();
//     const dispatch = useDispatch();
//
//     const clOpen = () => {
//         setOpen(true);
//     };
//
//     const clClose = () => {
//         setOpen(false);
//     };
//
//     const submit = () => {
//         const toPost = {
//             title: store.getState().marker.title,
//             label: store.getState().marker.label,
//             position: {
//                 lat: store.getState().marker.lat,
//                 lng: store.getState().marker.lng,
//             },
//             description: store.getState().marker.description,
//         }
//         postMarker(toPost);
//         dispatch(clearEverything());
//         window.location.reload()
//     }
//
//     return <>
//         <Button variant="contained" onClick={ currentState ? submit : clOpen }>
//             { currentState ? "Submit" : "Add location" }
//         </Button>
//         <PopUp open={open} onClose={clClose}/>
//     </>
// }
//
// function PopUp({onClose, open}) {
//     const [title, setTitle] = useState("");
//     const [label, setLabel] = useState("");
//     const [description, setDescription] = useState("");
//     const dispatch = useDispatch();
//
//     PopUp.propTypes = {
//         onClose: PropTypes.func.isRequired,
//         open: PropTypes.bool.isRequired,
//     };
//
//     const toMarker = () => {
//         dispatch(addText({title, label, description}));
//         const currentState = "1";
//         dispatch(setCurrentState({currentState}));
//     }
//
//     return <>
//         <Dialog open={open} onClose={onClose}>
//             <Box component="form" onSubmit={toMarker} sx={{
//                 width: "35em",
//                 height: "14em",
//                 padding: "1em"
//             }}>
//                 <TextField
//                     required
//                     fullWidth
//                     type="text"
//                     label="Title"
//                     variant="outlined"
//                     autoComplete="off"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     sx={{
//                         mb: "2em"
//                     }}
//                 />
//                 <TextField
//                     required
//                     fullWidth
//                     type="text"
//                     label="Label"
//                     variant="outlined"
//                     autoComplete="off"
//                     value={label}
//                     onChange={(e) => setLabel(e.target.value)}
//                     sx={{
//                         mb: "2em"
//                     }}
//                 />
//                 <TextField
//                     fullWidth
//                     multiline={true}
//                     rows={5}
//                     type="text"
//                     label="Description"
//                     variant="outlined"
//                     autoComplete="off"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     sx={{
//                         mb: "2em",
//                     }}
//                 />
//                 <div style={{
//                     textAlign: "center"
//                 }}>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         sx={{
//                             width: "50%"
//                         }}
//                     >
//                         Next
//                     </Button>
//                 </div>
//             </Box>
//         </Dialog>
//     </>
// }
