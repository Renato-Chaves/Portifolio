import Image from "next/image";

export default function Home() {
  return (
    // Portifolio main page to redirect to softwares projects and games projects
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore my software and game projects below.
      </p>
      <div className="flex space-x-4">
        <a
          href="/softwares"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Software Projects
        </a>
        <a
          href="/games"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Game Projects
        </a>
      </div>
    </main>
    
  );
}
