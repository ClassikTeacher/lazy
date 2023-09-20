import { useEffect, useRef } from "react"

export const useObserver = (ref, isLoading, visible, callback)=> {
    const observer = useRef()
    useEffect(()=>{
        if(isLoading) return
        if(observer.current) observer.current.disconnect()
        var cb = function(entriesm, observer){
          if(entriesm[0].isIntersecting){
            callback()
          }        
          
        };
        observer.current = new IntersectionObserver(cb)
        observer.current.observe(ref.current)
      },[isLoading])
}

export const useObserverHidden = (ref, isLoading, visible, callback)=> {
    const observer = useRef()
    useEffect(()=>{
        if(isLoading) return
        if(observer.current) observer.current.disconnect()
        var cb = function(entriesm, observer){

          if(!entriesm[0].isIntersecting ){
            callback()
          }
          
          
        };
        observer.current = new IntersectionObserver(cb)
        observer.current.observe(ref.current)
      },[isLoading])
}