import { useEffect, useState } from "react";

const useOnline = ()=>{
    const[offline,setOffline]=useState(false);
    useEffect(()=>{
        const handleOnline = ()=>{setOffline(false)};
        const handleOffline = ()=>{setOffline(true)};
        window.addEventListener("online",handleOnline);
        window.addEventListener("offline",handleOffline);

        return ()=>{
            window.removeEventListener("online",handleOnline);
            window.removeEventListener("online",handleOffline);
        }
    },[])
    return offline;
}

export default useOnline;