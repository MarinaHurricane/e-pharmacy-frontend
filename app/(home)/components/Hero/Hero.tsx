import Header from '@/app/components/Header/Header';
import css from './Hero.module.css';
import mobile1x from '@/public/images/mobile1x.png';
import mobile2x from '@/public/images/mobile2x.png';
import tablet1x from '@/public/images/tablet1x.png';
import tablet2x from '@/public/images/tablet2x.png';
import desktop1x from '@/public/images/desktop1x.png';
import desktop2x from '@/public/images/desktop2x.png';
import Container from '@/app/components/Container/Container';
import { ButtonLink } from '@/app/components/ButtonLink/ButtonLink';
import { Icon } from '@/app/components/Icon/Icon';

export default function Hero() {
  return (
    <>
      <section className={css.hero}>
        <Container>
          <Header variant="home" />
  

   
        <div className={css.imageBox}>
               <h1 className={css.mainTitle}>Your vitamins delivered</h1>
        <p className={css.mainText}>
        Say goodbye to all your healthcare worries with us
        </p>
          <picture>
            <source
            media="(min-width: 1440px)"
            srcSet={`${desktop1x} 1x, ${desktop2x} 2x`}
          />

            <source
              media="(min-width: 768px)"
              srcSet={`${tablet1x.src} 1x, ${tablet2x.src} 2x`}
            />

            <source
              media="(min-width: 375px)"
              srcSet={`${mobile1x.src} 1x, ${mobile2x.src} 2x`}
            />

            <img
              className={css.homeImg}
              src={mobile1x.src}
              alt="girl with a dog"
            />
          </picture>
        </div>

        <ButtonLink href="/medicine" className={css.button}>
          Shop now
          <Icon name="icon-arrow-right" width={22} height={22} className={css.icon}/>
        </ButtonLink>
              </Container>
      </section>
    </>
  );
}
