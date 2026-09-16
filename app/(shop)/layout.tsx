import Container from '../components/Container/Container';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="shop" />

      <main>
        <section>
          <Container>{children}</Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
