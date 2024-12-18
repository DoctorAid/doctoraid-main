import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import { useState } from "react";


function RootLayout(params) {
    
    return(
       
        <main>

            <div className="flex h-[53.75rem]">
            <Navigation/>
            <Outlet/>
            </div>
            
          
            
            
        </main>
      
    )
}
export default RootLayout