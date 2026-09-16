import css from './page.module.css';
import { Title } from '../medicine-store/components/Title/Title';
import LocationsList from './components/LocationsList/LocationsList';


export default function LocationsPage() {

    return (
        <section className={css.locationsSection}>
            <Title>Find a Store Near You</Title>
            <LocationsList />
        </section>
    )
}