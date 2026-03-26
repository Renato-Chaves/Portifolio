const Navbar = () => {
    return (
        // Navbar content including links and logo
        <nav className="fixed w-full h-16 bg-gray-800 flex items-center justify-between px-4 z-10">
            <div className="text-white font-bold">My Portfolio</div>
            <div className="flex space-x-4">
                <a href="/" className="text-gray-300 hover:text-white">Home</a>
                <a href="/softwares" className="text-gray-300 hover:text-white">Softwares</a>
                <a href="/projects" className="text-gray-300 hover:text-white">Projects</a>
                <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
            </div>
        </nav>
    );
}

export default Navbar;