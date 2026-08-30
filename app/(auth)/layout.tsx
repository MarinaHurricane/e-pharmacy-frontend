import css from './layout.module.css';
import Image from 'next/image';
import Container from '../components/Container/Container';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={css.registerPage}>
      <Container>
        <Image
          src="/images/logo2.svg"
          alt="E-Pharmacy"
          className={css.logo}
          width={134}
          height={32}
        />

<div className={css.contentWrapper}>
        <h1 className={css.title}>
          Your medication{' '}
          <span className={css.imageWrapper}>
            <Image
              src="/images/pill.png"
              alt=""
              className={css.pillImage}
              width={95}
              height={93}
            />
          </span>{' '}
          delivered. Say goodbye to all{' '}
          <span className={css.boldText}>your healthcare</span> worries with us
        </h1>

        {children}
        </div>
      </Container>

      <Image
        className={css.decoration}
        src="/images/decoration.svg"
        alt=""
        width={200}
        height={200}
      />
    </section>
  );
}
