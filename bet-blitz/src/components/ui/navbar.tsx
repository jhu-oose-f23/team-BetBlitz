import { UserButton } from "@clerk/nextjs";
import { Badge } from "~/components/ui/badge";

export function Navbar() {
    return (
        
<nav className="bg-black">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-between">
    <div className="flex flex-shrink-0 items-center">
        <a href="#" className="flex items-center text-2xl font-semibold whitespace-nowrap text-white">
            <img src="https://hineon.com/wp-content/uploads/2023/08/HN-PAT-FLASH-W-2000x2000-2.jpg" className="h-8 mr-3" alt="BetBlitz Logo" style={{ width: '3rem', height: '3rem' }} />
            BetBlitz
        </a>
    </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-4">    
            <a href="odds" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Odds</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Page 2</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Page 3</a>
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-5">
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">View notifications</span>
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </div>
</nav>


    )
}
