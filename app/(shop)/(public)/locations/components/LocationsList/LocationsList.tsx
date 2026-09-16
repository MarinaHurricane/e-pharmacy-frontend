import css from './LocationsList.module.css';
import LocationItem from '../LocationItem/LocationItem';
import { getServerLocations } from '@/app/lib/api/server/serverLocations';

export default async function LocationsList() {
  const locations = await getServerLocations();

  return (
    <ul className={css.locationsList}>
      {locations?.map((location) => (
        <LocationItem key={location.id} location={location} />
      ))}
    </ul>
  );
}
