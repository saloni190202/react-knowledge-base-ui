import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="w-auto h-auto px-auto flex items-center justify-between 
    bg-gradient-to-r from-[#1E1B4B] to-[#4F46E5] text-white">

      
      <div className="flex items-center gap-3">
        
        <img
        src="src\assets\logo.png"
        alt="logo"
        className="w-10 h-10 object-contain"
        />

        
        <span className="font-semibold text-lg">Worcspace</span>

        
        <div className="ml-4 bg-white/20 text-sm cursor-pointer  transition">
          <select className="bg-[#4F46E5] px-2 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-white">
            <option>Worcspace 1</option>
            <option>Worcspace 2</option>
            <option>Worcspace 3</option>
          </select>
        </div>
      </div>

      
      <div className="w-[40%]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-1 rounded-md bg-white/20 placeholder-white 
          focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      
      <div className="flex items-center gap-4">
        
        <Bell className="cursor-pointer hover:scale-110 transition" />

        
        <div className="w-8 h-8 bg-white text-indigo-600 rounded-full flex items-center justify-center font-semibold cursor-pointer">
          GK
        </div>
      </div>
    </div>
  );
}