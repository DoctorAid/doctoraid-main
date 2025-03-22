import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Calendar, Users, Settings, Pill, ChevronRight } from 'lucide-react';

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
    { name: 'Medicines', icon: <Pill size={18} /> },
    { name: 'Settings', icon: <Settings size={18} /> }
  ];

  return (
    <div className='flex flex-col gap-1.5'>
      {menuItems.map((item, index) => (
        <Link
          key={item.name}
          className={`flex h-12 items-center justify-between px-4 cursor-pointer transition-all duration-300 rounded-xl ${
            activeItem === item.name 
              ? 'bg-[#FAFAF9] text-[#295567] font-medium shadow-sm' 
              : 'text-white hover:bg-white/10'
          } hover:translate-x-1`}
          onClick={() => setActiveItem(item.name)}
          to={`/${item.name.toLowerCase()}`}
          style={{
            animationName: 'slideRight',
            animationDuration: '0.5s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'both',
            animationDelay: `${index * 0.08}s`
          }}
        >
          <div className="flex items-center">
            <span className={`mr-3 ${activeItem === item.name ? 'text-[#295567]' : 'text-white/90'}`}>
              {item.icon}
            </span>
            <p className={`${activeItem === item.name ? 'font-medium' : 'font-normal'}`}>
              {item.name}
            </p>
          </div>
          {activeItem === item.name && (
            <ChevronRight size={16} className="text-[#295567] opacity-70" />
          )}
        </Link>
      ))}
    </div>
  );
}

export default NavigationTabs;