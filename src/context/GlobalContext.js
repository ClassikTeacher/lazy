import * as React from "react"

export const defaultState = {
    urlStrapi: process.env.GATSBY_STRAPI_API_URL,
    cursorX: 0,
    cursorY: 0,
    isLoading: true,
    setIsLoding: ()=>{
      defaultState.isLoading = false  
    },
    isVisiblePopup: false,
    setIsVisiblePopup: ()=>{},
    color: 'green',
    setColors: (col)=>{
      defaultState.color = col  

        
    },
}
export const GlobalContext = React.createContext(defaultState)

export const GlobalProvider = ({ children }) => {
    const [isVisiblePopup, setIsVisiblePopup] = React.useState(false);
    const [color, setColor] = React.useState(defaultState.color);
    const [elem, setElem] = React.useState(<></>);
    const [isLoading, setIsLoading] = React.useState(true);
    const changePopup = () => {
        setIsVisiblePopup(!isVisiblePopup);
    };
    const changeLoading = () => {
      setIsLoading(false);
  };
    const changeColor = (col) => {
        setColor(col);
    };
    const changeElemPopup = (el) => {
      setElem(el);
  };
  
    return (
      <GlobalContext.Provider
        value={{
            isLoading,
            changeLoading,
            isVisiblePopup,
            changePopup,
            color,
            changeColor,
            elem,
            changeElemPopup
        }}
      >
        {children}
      </GlobalContext.Provider>
    );
  };


export const GlobalContextProvider = GlobalContext.Provider;

export const useGlobalContext = () => React.useContext(GlobalContext);