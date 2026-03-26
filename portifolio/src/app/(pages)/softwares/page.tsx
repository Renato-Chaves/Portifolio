import HeroScroller from "@/app/components/HeroScroller/HeroScroller";

const SoftwarePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {/* Hero Section */}
            <HeroScroller />
            
            <h1 className="text-4xl font-bold mb-4">Software Projects</h1>
            <p className="text-lg text-gray-600 mb-8">
                Here are some of my software projects.
            </p>
            {/* Add your software project cards or links here */}
        </div>
    );
}

export default SoftwarePage;