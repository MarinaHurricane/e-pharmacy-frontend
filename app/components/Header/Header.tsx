import css from './Header.module.css';
import logo from './logo2.svg';
import Image from "next/image";




export default function Header () {
    return (
        <>
          <div>Header</div>
       <Image src='/images/logo2.svg' alt="E-Pharmacy" width={150}
        height={40}/>
          </>
      
    )
}