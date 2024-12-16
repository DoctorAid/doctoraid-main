import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './assets/pages/HomePage.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './assets/layouts/RootLayout.jsx'


const router = createBrowserRouter(
  [{
    element:<RootLayout/>,
    children:[
        { path:"/",
          element:<App/>
        },
        
    ]
  }]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
      <RouterProvider router={router}/>
 
  </React.StrictMode>,
)
