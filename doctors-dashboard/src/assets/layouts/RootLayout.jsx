import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import { useState } from "react";


function RootLayout(params) {
    
    return(
       
        <main>

            <div className="flex px-2 py-2">
            <Navigation/>
            <Outlet/>
            </div>
            
          
            
            
        </main>
      
    )
}
export default RootLayout