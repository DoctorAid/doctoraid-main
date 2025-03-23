import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './assets/pages/DashboardPage.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './assets/layouts/RootLayout.jsx'
import SchedulePage from './assets/pages/SchedulePage.jsx'
import SettingsPage from './assets/pages/SettingsPage.jsx'
import PatientsPage from './assets/pages/PatientsPage.jsx'
import SignInPage from './assets/pages/Auth/SignInPage.jsx'
import ErrorPage from './assets/pages/ErrorPage.jsx'
import { ClerkProvider,useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")

  
}

const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/" replace />;
  }

  return children;
};


const router = createBrowserRouter(
  [{
    element:<RootLayout/>,
    children:[
        { path:"/",
          element:<SignInPage/>
        },
        { path:"/dashboard",
          element: (
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          ),
        },
        { path:"/schedule",
          element:(
            <ProtectedRoute>
              <SchedulePage/>
            </ProtectedRoute>
          ),
        },
        { path:"/patients",
          element:(
            <ProtectedRoute>
              <PatientsPage/>
            </ProtectedRoute>),
        },
        { path:"/settings",
          element:(
            <ProtectedRoute>
              <SettingsPage/>
            </ProtectedRoute>),
        },
       
        
        
    ]
  }]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
