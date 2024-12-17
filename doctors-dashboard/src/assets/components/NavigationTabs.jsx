import { useState } from 'react';

function NavigationTabs() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = ['Dashboard', 'Schedule', 'Patients', 'Messages', 'Medicines'];

  return (
    <div className='flex flex-col gap-8 items-center text-white justify-end'>
      {menuItems.map((item) => (
        <div
          key={item}
          className={`flex h-10 w-40 items-center justify-center cursor-pointer rounded-md ${
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
