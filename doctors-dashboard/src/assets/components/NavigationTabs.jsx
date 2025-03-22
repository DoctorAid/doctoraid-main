import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Calendar, Users, Settings, Pill } from 'lucide-react';

function NavigationTabs() {
  const location = useLocation();
  const currentPath = location.pathname.slice(1) || 'dashboard';
  
  const [activeItem, setActiveItem] = useState(
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
  );

  const menuItems = [
    { name: 'Dashboard', icon: <Layout size={18} /> },
    { name: 'Schedule', icon: <Calendar size={18} /> },
    { name: 'Patients', icon: <Users size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> },
    { name: 'Medicines', icon: <Pill size={18} /> }
  ];

  return (
    <div className='flex flex-col gap-3 px-4'>
      {menuItems.map((item, index) => (
        <Link
          key={item.name}
          className={`flex h-12 items-center text-start pl-6 cursor-pointer transition-all duration-300 rounded-l-2xl hover:translate-x-1 ${
            activeItem === item.name 
              ? 'bg-[#FAFAF9] text-[#295567] font-medium shadow-md' 
              : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setActiveItem(item.name)}
          to={`/${item.name.toLowerCase()}`}
          style={{
            animationName: 'slideRight',
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
            animationDelay: `${index * 0.1}s`
          }}
        >
          <span className="mr-3">{item.icon}</span>
          <p className="font-medium">{item.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default NavigationTabs;