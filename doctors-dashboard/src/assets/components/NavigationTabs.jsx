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
    { name: 'Dashboard', icon: <Layout size={16} /> },
    { name: 'Schedule', icon: <Calendar size={16} /> },
    { name: 'Patients', icon: <Users size={16} /> },
    { name: 'Medicines', icon: <Pill size={16} /> },
    { name: 'Settings', icon: <Settings size={16} /> }
  ];

  return (
    <div className='flex flex-col gap-2 px-4'>
      {menuItems.map((item, index) => (
        <Link
          key={item.name}
          className={`flex h-11 items-center text-start pl-5 cursor-pointer transition-all duration-300 rounded-l-xl ${
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
          <span className={`mr-3 ${activeItem === item.name ? 'text-[#295567]' : 'text-white/90'}`}>
            {item.icon}
          </span>
          <p className={activeItem === item.name ? 'font-medium' : 'font-normal'}>
            {item.name}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default NavigationTabs;