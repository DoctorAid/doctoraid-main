import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './assets/layouts/RootLayout.jsx'
import SchedulePage from './assets/pages/SchedulePage.jsx'
import MessagePage from './assets/pages/MessagePage.jsx'
import MedicinesPage from './assets/pages/MedicinesPage.jsx'


const router = createBrowserRouter(
  [{
    element:<RootLayout/>,
    children:[
        { path:"/",
          element:<App/>
        },
        { path:"/schedule",
          element:<SchedulePage/>
        },
        { path:"/messages",
          element:<MessagePage/>
        },
        { path:"/medicines",
          element:<MedicinesPage/>
        },
        
    ]
  }]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <RouterProvider router={router}/>
 
  </React.StrictMode>,
)
