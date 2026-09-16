import Container from '@/app/components/Container/Container';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
