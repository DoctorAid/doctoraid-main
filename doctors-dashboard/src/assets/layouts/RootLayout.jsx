import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import { useState } from "react";


function RootLayout(params) {
    
    return(
       
        <main>

            <div className="flex px-8 py-8 ">
            <Navigation/>
            <Outlet/>
            </div>
            
          
            
            
        </main>
      
    )
}
export default RootLayout