import './Footer.css'
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="footerContainer">
            <Link href="https://github.com/Fabrizzio20k/HyperLogLog_Cpp.git">
                <Image src="/github_logo.png" alt="logo" width={30} height={30} />
            </Link>
            <h3>&copy; 2023 Fabrizzio Vilchez. Made with ❤ using</h3>
            <Image src="/nextjs_logo.png" alt="logo" width={30} height={30} />
        </div>
    );
}