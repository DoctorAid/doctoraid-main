import { useState } from 'react';

function NavigationTabs() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = ['Dashboard', 'Schedule', 'Patients', 'Messages', 'Medicines'];

  return (
    <div className='flex flex-col gap-8 items-end text-white justify-end'>
      {menuItems.map((item) => (
        <div
          key={item}
          className={`flex h-10 w-64 items-center text-start justify-center cursor-pointer rounded-l-2xl ${
            activeItem === item ? 'bg-white text-[#295567]' : 'bg-[#295567]'
          }`}
          onClick={() => setActiveItem(item)}
        >
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default NavigationTabs;
