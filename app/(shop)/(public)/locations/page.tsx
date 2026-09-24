import css from './page.module.css';
import LocationsList from './components/LocationsList/LocationsList';
import { Title } from '@/app/components/Title/Title';

export default function LocationsPage() {
  return (
    <section className={css.locationsSection}>
      <Title>Find a Store Near You</Title>
      <LocationsList />
    </section>
  );
}
