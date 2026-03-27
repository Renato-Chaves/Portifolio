import Link from "next/link";

const Navbar = () => {
    return (
        // Navbar content including links and logo
        <nav className="fixed w-full h-16 bg-gray-800 flex items-center justify-between px-4 z-10">
            <div className="text-white font-bold">My Portfolio</div>
            <div className="flex space-x-4">
                <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                <Link href="/softwares" className="text-gray-300 hover:text-white">Softwares</Link>
                <Link href="/projects" className="text-gray-300 hover:text-white">Projects</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            </div>
        </nav>
    );
}

export default Navbar;