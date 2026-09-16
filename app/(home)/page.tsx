import css from './page.module.css';

import Container from "../components/Container/Container";
import Hero from "./components/Hero/Hero";
import { BenefitsTicker } from "./components/BenefitssTicker/BenefitsTicker";
import { Icon } from "../components/Icon/Icon";
import { Title } from '../(shop)/(public)/medicine-store/components/Title/Title';
import LocationsList from '../(shop)/(public)/locations/components/LocationsList/LocationsList';

export default function HomePage() {
    return (

        <>
        <Hero/>
        <BenefitsTicker/>
  <section className={css.stores}>
    <Title className={css.storesTitle}>Your Nearest Store</Title>
    <LocationsList/>
  </section>
        </>
        
        
     
    )
}