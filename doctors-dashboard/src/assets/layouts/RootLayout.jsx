import { Outlet } from "react-router-dom"
import Navigation from "../components/Navigation"
import { useState } from "react";


function RootLayout(params) {
    
    return(
       
        <main>
            
            <Navigation/>
            <Outlet/>
            
            
        </main>
      
    )
}
export default RootLayout