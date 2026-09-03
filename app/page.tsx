'use client';

import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Home() {
  return (
    <Container>
      <Header variant="home" />

      <div>MAIN</div>

      <Footer />
    </Container>
  );
}
