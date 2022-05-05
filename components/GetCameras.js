import { useQuery } from '@apollo/client';
import { GET_CAMERAS } from '../GraphQL/Queries';

export const useCameras = () => {
  const { error, data, loading } = useQuery(GET_CAMERAS);

  return {
    error,
    data,
    loading,
  };
};