import React, { createContext, useState, useContext } from "react";

interface IFilter {
    collection: string;
    date: string;
    order: string;
    take: string;
}

interface IHandleSearch {
    searchText: string;
    filterData: IFilter;
    changeFilter: (data: IFilter) => void;
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
    
    const [filterData, setFilterData] = useState<IFilter>({
        collection: "",
        date: "",
        order: "",
        take: "100"
    });

    const changeOpen = (searchText: string) => { 
        setIsOpen(searchText.length > 0);
    };
    
    const changeSearchText = (searchText: string) => { 
        setSearchText(searchText);
    };

    const changeFilter = (data: IFilter) => {
        setFilterData(data);
    };

    const close = () => {
        if(isOpen){
            setIsOpen(prev => !prev);
        } else {
            setIsOpen(false);
        }
        setSearchText('');
    };

    return (
        <Context.Provider value={{ searchText, isOpen, changeSearchText, changeOpen, close, filterData, changeFilter }}>
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
