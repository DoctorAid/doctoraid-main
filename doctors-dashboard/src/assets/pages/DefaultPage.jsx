// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// import { useTailwind } from 'tailwind-rn';

// const SessionsScreen = () => {
//   const tw = useTailwind();
  
//   // Sample sessions data array
//   const sessions = [
//     {
//       id: '#2241206',
//       date: '8 April, 2021',
//       time: '04:00 PM',
//       status: 'latest'
//     },
//     {
//       id: '#2241207',
//       date: '8 April, 2021',
//       time: '04:00 PM',
//       status: 'upcoming'
//     },
//     {
//       id: '#2241208',
//       date: '8 April, 2021',
//       time: '04:00 PM',
//       status: 'upcoming'
//     }
//   ];

//   return (
//     <View style={tw('flex-1 bg-black')}>
//       {/* Main Container */}
//       <View style={tw('flex-1 p-6')}>
//         {/* Header */}
//         <Text style={tw('text-4xl font-bold text-blue-400 mb-8')}>Your Sessions</Text>
        
//         {/* Sessions Container */}
//         <View style={tw('bg-white rounded-3xl p-6 flex-1')}>
//           {/* Latest Session Section */}
//           <Text style={tw('text-3xl font-bold text-slate-700 mb-4')}>Latest Session</Text>
          
//           {sessions.map(session => {
//             // Conditional rendering for latest session
//             if (session.status === 'latest') {
//               return (
//                 <View key={session.id} style={tw('bg-blue-50 rounded-xl p-4 mb-8 flex-row justify-between items-center')}>
//                   <View>
//                     <Text style={tw('text-gray-700 font-bold')}>ID: {session.id}</Text>
//                     <Text style={tw('text-gray-600')}>{session.date} | {session.time}</Text>
//                   </View>
//                   <TouchableOpacity style={tw('bg-green-200 px-6 py-2 rounded-full')}>
//                     <Text style={tw('text-green-800 font-bold')}>Start</Text>
//                   </TouchableOpacity>
//                 </View>
//               );
//             }
//             return null;
//           })}
          
//           {/* Upcoming Sessions Section */}
//           <Text style={tw('text-3xl font-bold text-slate-700 mb-4')}>Upcoming Session</Text>
          
//           <ScrollView style={tw('mb-6')}>
//             {sessions.map(session => {
//               // Conditional rendering for upcoming sessions
//               if (session.status === 'upcoming') {
//                 return (
//                   <View key={session.id} style={tw('bg-blue-50 rounded-xl p-4 mb-4')}>
//                     <Text style={tw('text-gray-700 font-bold')}>ID: {session.id}</Text>
//                     <Text style={tw('text-gray-600')}>{session.date} | {session.time}</Text>
//                   </View>
//                 );
//               }
//               return null;
//             })}
//           </ScrollView>
          
//           {/* Create New Session Button */}
//           <TouchableOpacity style={tw('bg-blue-400 rounded-xl py-4 items-center')}>
//             <Text style={tw('text-white font-bold')}>+ Create the New Session</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Illustration on the left side - positioned absolutely */}
//       <View style={tw('absolute top-0 left-0 bottom-0 w-1/2 justify-center items-center')}>
//         <Image
//           source={{ uri: '../assets/images/img.png' }} // You would use your actual image path here
//           style={tw('w-64 h-64')}
//           resizeMode="contain"
//         />
//       </View>
//     </View>
//   );
// };

// export default SessionsScreen;

import React from 'react';

const DefaultPage = () => {
  // Sample sessions data array
  const sessions = [
    {
      id: '#2241206',
      date: '8 April, 2021',
      time: '04:00 PM',
      type: 'latest'
    },
    {
      id: '#2241207',
      date: '8 April, 2021',
      time: '04:00 PM',
      type: 'upcoming'
    },
    {
      id: '#2241208',
      date: '8 April, 2021',
      time: '04:00 PM',
      type: 'upcoming'
    }
  ];

  // Filter sessions by type
  const latestSession = sessions.find(session => session.type === 'latest');
  const upcomingSessions = sessions.filter(session => session.type === 'upcoming');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Left side with illustration */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="relative">
          <img 
            src="/images/analyst-illustration.svg" 
            alt="Data analyst with charts" 
            className="w-96 h-auto"
          />
        </div>
      </div>

      {/* Right side with sessions information */}
      <div className="w-1/2 p-10">
        <h1 className="text-3xl font-bold text-slate-700 mb-8">Your Sessions</h1>
        
        {/* White container */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* Latest Session Section */}
          <h2 className="text-xl font-bold text-slate-700 mb-4">Latest Session</h2>
          
          {latestSession && (
            <div className="bg-blue-50 rounded-xl p-4 mb-8 flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">ID: {latestSession.id}</p>
                <p className="text-gray-500 text-sm">{latestSession.date} | {latestSession.time}</p>
              </div>
              <button className="bg-green-200 hover:bg-green-300 text-green-800 font-medium px-8 py-2 rounded-full transition">
                Start
              </button>
            </div>
          )}
          
          {/* Upcoming Sessions Section */}
          <h2 className="text-xl font-bold text-slate-700 mb-4">Upcoming Session</h2>
          
          <div className="space-y-3 mb-8">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-blue-50 rounded-xl p-4">
                <p className="text-gray-700 font-medium">ID: {session.id}</p>
                <p className="text-gray-500 text-sm">{session.date} | {session.time}</p>
              </div>
            ))}
          </div>
          
          {/* Create New Session Button */}
          <button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-lg transition flex items-center justify-center">
            <span className="mr-1">+</span> Create the New Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefaultPage;
