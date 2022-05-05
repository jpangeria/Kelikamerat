import { gql } from '@apollo/client';

export const GET_CAMERAS = gql`
  query GetAllCameras { 
    weatherCameras {
      cameraId
      name
      lat
      lon
      nearestWeatherStationId
      presets {
        presetId
        presentationName
        imageUrl
        measuredTime
      }
    }
    weatherStations {
      weatherStationId
      measuredTime
      sensorValues {
        roadStationId
        name
        sensorValue
        sensorUnit
      }
    }
  }
`;
