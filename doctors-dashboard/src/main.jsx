import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './assets/layouts/RootLayout.jsx'
import SchedulePage from './assets/pages/SchedulePage.jsx'
import MessagePage from './assets/pages/MessagePage.jsx'
import MedicinesPage from './assets/pages/MedicinesPage.jsx'
import PatientsPage from './assets/pages/PatientsPage.jsx'
import ErrorPage from './assets/pages/ErrorPage.jsx'


const router = createBrowserRouter(
  [{
    element:<RootLayout/>,
    children:[
        { path:"/dashboard",
          element:<App/>
        },
        { path:"/schedule",
          element:<SchedulePage/>
        },
        { path:"/messages",
          element:<MessagePage/>
        },
        { path:"/patients",
          element:<PatientsPage/>
        },
        { path:"/medicines",
          element:<MedicinesPage/>
        },
        {
          path: "/", // Catch all unmatched routes
          element: <App />,
        },
        
    ]
  }]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <RouterProvider router={router}/>
 
  </React.StrictMode>,
)
