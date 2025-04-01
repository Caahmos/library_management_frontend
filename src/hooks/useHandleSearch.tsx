import React, { createContext, useState, useContext } from "react";

interface IHandleSearch {
    searchText: string;
    changeSearchText: (search: string) => void;
    changeOpen: (search: string) => void;
    close: () => void;
    isOpen: boolean;
}

interface IHandleProviderProps {
    children: React.ReactNode;
}

const Context = createContext<IHandleSearch | undefined>(undefined);

const HandleSearchProvider: React.FC<IHandleProviderProps> = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const changeOpen = (searchText: string) => { 
        setIsOpen(searchText.length > 0);
    };
    
    const changeSearchText = (searchText: string) => { 
        setSearchText(searchText);
    };

    const close = () => {
        if(isOpen){
            setIsOpen( prev => !prev);
        }else{
            setIsOpen( false );
        }
        setSearchText('');
    };

    return (
        <Context.Provider value={{ searchText, isOpen, changeSearchText, changeOpen, close }}>
            {children}
        </Context.Provider>
    );
};

const useHandleSearch = (): IHandleSearch => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useHandleSearch deve ser usado dentro de um HandleSearchProvider");
    }
    return context;
};

export { useHandleSearch, HandleSearchProvider };
