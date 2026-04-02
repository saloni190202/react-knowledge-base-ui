import {
  Bot,
  Box,
  Library,
  Upload,
  Monitor,
  Layers,
  Zap,
  PlaySquare,
  Shield,
  BookOpen,
  Database,
  Users,
  Puzzle,
} from "lucide-react";

export default function Sidebar() {
  const sections = [
    {
      title: "MY PROJECTS",
      items: [
        { name: "Agents", icon: <Bot size={18} /> },
        { name: "AI Models", icon: <Box size={18} /> },
        { name: "Library", icon: <Library size={18} /> },
      ],
    },
    {
      title: "ORCHESTRATOR",
      items: [
        { name: "Published", icon: <Upload size={18} /> },
        { name: "Machines", icon: <Monitor size={18} /> },
        { name: "Queues", icon: <Layers size={18} /> },
        { name: "Triggers", icon: <Zap size={18} /> },
        { name: "Jobs", icon: <PlaySquare size={18} /> },
        { name: "Executions", icon: <PlaySquare size={18} /> },
        { name: "Vault", icon: <Shield size={18} /> },
        { name: "Knowledge Base", icon: <BookOpen size={18} />, active: true },
        { name: "Key Store", icon: <Database size={18} /> },
      ],
    },
    {
      title: "ADMIN",
      items: [
        { name: "Tenant", icon: <Users size={18} /> },
        { name: "Integrations", icon: <Puzzle size={18} /> },
      ],
    },
  ];

  return (
    <div className="w-64 h-screen bg-[#F9FAFB] border-r p-4">
      {sections.map((section, i) => (
        <div key={i} className="mb-6">
          
          
          <p className="text-xs text-gray-400 font-semibold mb-3">
            {section.title}
          </p>

          
          <ul className="space-y-1">
            {section.items.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer relative
                ${
                  item.active
                    ? "bg-indigo-100 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }
                transition-all`}
              >
               
                {item.active && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-r"></div>
                )}

                
                <span className="text-gray-500">{item.icon}</span>

                
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}