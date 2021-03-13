import React, { useState, useContext } from 'react'
import sublinks from './data'


const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [isSidebarOPen, setIsSidebarOpen] = useState(true);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(true);


    const openSidebar = () => {
        setIsSidebarOpen(true);
    }
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    const openSubmenu = () => {
        setIsSubmenuOpen(true);
    }

    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    }
    return <AppContext.Provider value={{
        isSubmenuOpen, isSidebarOPen, openSubmenu, openSidebar, closeSubmenu, closeSidebar
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };