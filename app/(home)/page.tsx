import css from './page.module.css';
import { Suspense } from 'react';
import Container from '../components/Container/Container';
import Hero from './components/Hero/Hero';
import { BenefitsTicker } from './components/BenefitssTicker/BenefitsTicker';
import { Title } from '../components/Title/Title';
import LocationsList from '../(shop)/(public)/locations/components/LocationsList/LocationsList';
import { Loader } from '../components/Loader/Loader';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsTicker />
      <section className={css.stores}>
        <Title className={css.storesTitle}>Your Nearest Store</Title>
        <Container>
          <Suspense fallback={<Loader />}>
          <LocationsList />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
