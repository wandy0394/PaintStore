import { useCallback, useEffect } from "react";

export default function useDebounce(func:Function, dependencies:any[], delay:number) {
    const callback = useCallback(func, dependencies)
    useEffect(()=>{
        const timeout = setTimeout(callback, delay)
        return () => clearTimeout(timeout)
    }, [callback, delay])
}