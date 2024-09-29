export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Your Game Platform</h3>
            <p className="mt-2 text-gray-300">Experience the thrill of sports</p>
          </div>
          <div>
            <ul className="flex flex-wrap justify-center space-x-4">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 Your Game Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}