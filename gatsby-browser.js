import React from "react"
import './src/styles/index.css'

import { GlobalProvider, defaultState, Ready, useGlobalContext} from "./src/context/GlobalContext"

export const wrapRootElement = ({ element }) => (
  <GlobalProvider>{element}</GlobalProvider>
)
export const onClientEntry = () => {
 
}