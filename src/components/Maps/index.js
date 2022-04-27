import React, { useEffect, useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

import classNames from 'classnames';
import { makeStyles } from '@mui/styles';

import { removeHypen } from 'src/helpers/helper';
import { BASE_URL } from 'src/redux/services';

const useStyles = makeStyles({
  card: {
    padding: '10px',
    display: 'flex',
    fontSize: '10px',
    minWidth: '25em',
    height: '12em',
  },
  img: {
    width: '8em',
    height: '8em',
    borderRadius: '50%',
    objectFit: 'cover',
    position: 'relative',
  },
  profile_text: {
    marginLeft: '2em',
    marginTop: '1em',
  },
  h1: {
    fontSize: '2.6em',
  },
  title: {
    marginLeft: '3em',
    textAlign: 'center',
    fontSize: '2em',
  },
  status: {
    width: '2em',
    height: '2em',
    borderRadius: '50%',
    position: 'absolute',
    top: '8.3em',
    left: '8em',
    backgroundColor: 'green',
  },
  online: {
    color: 'green',
  },
  offline: {
    color: 'red',
  },
});

const Maps = () => {
  const [data, setData] = useState([]);
  const classes = useStyles();
  const getLocation = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}users/get-location`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setData(data);
      }
    } catch (e) {
      // return
    }
  };
  useEffect(() => {
    getLocation();
    return () => setData(null);
  }, []);

  const mapData = {
    fieldInfo: [
      {
        id: 1,
        person: 'Ishaq',
        role: 'Manager',
        place: 'habibi i8',
        task: 'Eating :P',
        coordinates: { lat: 33.5755705, lng: 73.1514001 },
      },
      {
        id: 2,
        person: 'Asad',
        role: 'Manager',
        place: 'Office i8',
        task: 'waiting for abu bakar to bring kachnaar :D',
        coordinates: { lat: 33.66628291980237, lng: 73.0837012487894 },
      },
      {
        id: 2,
        person: 'Abu Bakar',
        role: 'Field Inspector',
        place: 'Kachnar Park',
        task: 'assigned to collect kachnaar from park without getting arrested',
        coordinates: { lat: 33.67012247649609, lng: 73.08160912574313 },
      },
    ],
  };
  const [selectedPark, setSelectedPark] = useState(null);
  const [center, setCenter] = useState({ lat: 29.902275015162225, lng: 69.22886571192434 });
  return (
    <GoogleMap defaultZoom={5} defaultCenter={center}>
      {data.map((park) => (
        <Marker
          key={park.id}
          position={{
            lat: park?.record.current_location?.lat,
            lng: park?.record.current_location?.lng,
          }}
          onClick={() => {
            setSelectedPark(park);
            setCenter({
              lat: selectedPark?.record.current_location?.lat,
              lng: selectedPark?.record.current_location?.lng,
            });
            setZoom(12);
          }}
          icon={{
            // url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark?.record.current_location.lat,
            lng: selectedPark?.record.current_location.lng,
          }}
        >
          <>
            <div className={classes.card}>
              <div className={classes.profile}>
                <img
                  className={classes.img}
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
                />
                <div className={classNames(selectedPark?.task_title ? classes.status : '')}></div>
              </div>
              <div className={classes.profile_text}>
                <h1 className={classes.h1}>{selectedPark?.record.name.toUpperCase()}</h1>
                <h2 style={{ margin: '7px 0px' }}>{removeHypen(selectedPark?.record.role)}</h2>
                <h2>{selectedPark?.task_title?.toUpperCase()}</h2>
              </div>
            </div>
          </>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};
const WrappedMap = withScriptjs(withGoogleMap(Maps));

export default WrappedMap;
