import Image from "next/image";
import styles from "./page.module.css";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
    <Container>
      <Header/>
      <div>MAIN</div>
      <Footer/>
    </Container>
    </>
  )


}
