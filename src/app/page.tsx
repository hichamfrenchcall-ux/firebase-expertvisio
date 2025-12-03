import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Expert-View</div>
          <nav>
            <a href="#" className="px-4 text-gray-600 hover:text-gray-800">Features</a>
            <a href="#" className="px-4 text-gray-600 hover:text-gray-800">Pricing</a>
            <a href="#" className="px-4 text-gray-600 hover:text-gray-800">Contact</a>
            <a href="#" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Remote Expertise, Simplified</h1>
            <p className="text-xl text-gray-600 mb-8">Secure, geo-tagged video calls for accounting firms and their clients.</p>
            <a href="#" className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-600">Get Started</a>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <Image src="/globe.svg" alt="Geo-tagged Calls" width={80} height={80} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Geo-tagged Calls</h3>
                <p className="text-gray-600">Ensure the location of your clients with GPS data embedded in every video call.</p>
              </div>
              <div className="text-center">
                <Image src="/window.svg" alt="Record & Download" width={80} height={80} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Record & Download</h3>
                <p className="text-gray-600">All video calls are recorded and can be downloaded for your records.</p>
              </div>
              <div className="text-center">
                <Image src="/file.svg" alt="Secure & Reliable" width={80} height={80} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">Built with security in mind to protect your firm and your clients' data.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2024 Expert-View. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
