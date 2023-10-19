import Image from "next/image";
import styles from "./styles.module.css";

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <a href="#home" className={styles.navlogo}>
                <Image
                    className={styles.logo}
                    src="/cpp_logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                /> 
                Título Grande</a>
            <a href="#link1" className="navtitle">Título 1</a>
            <a href="#link2" className="navtitle">Título 2</a>
        </div>
    );
}
