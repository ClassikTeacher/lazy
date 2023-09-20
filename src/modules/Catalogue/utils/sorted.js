import { useMemo } from "react"
import moment from "moment"

export const sorted = (sort, dataItems) => {
    if(sort === ''){
        return [...dataItems]
    }

    
        if(sort === 'new'){
           [...dataItems].sort((b, a) => {
                const dateA =  new Date(a.date);
                const dateB = new Date(b.date)
             return dateA-dateB
            })
           return [...dataItems].sort((b, a) => {
            const dateA =  new Date(a.date);
            const dateB = new Date(b.date)
         return dateA-dateB
        })  
        } else if(sort === 'small'){
            return [...dataItems].sort((a, b) => (a.width*a.height) - (b.width*b.height)) 
        }
         else if(sort === 'big') {
            return [...dataItems].sort((b, a) => (a.width*a.height) - (b.width*b.height)) 
        } else {
            return [...dataItems]
        }
       

    
}


export const useSort = (sort, dataItems) => {
    const sortedData = useMemo(() => {
        return sorted(sort, dataItems)
    },[sort, dataItems])
    return sortedData
}