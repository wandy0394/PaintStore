import { useState } from "react";
import { agent } from "../app/api/agent";

export default function Contact() {
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(()=>console.log('Unreachable'))
            .catch(error=> setValidationErrors(error))
    }
    return (
        <>
            <h2>Error Testing</h2>
            <div className='flex items-center justify-center gap-4'>

                <button className='btn' onClick={()=> agent.TestErrors.get400Error().catch(error=>console.error(error))}>Test 400</button>
                <button className='btn' onClick={()=> agent.TestErrors.get401Error().catch(error=>console.error(error))}>Test 401</button>
                <button className='btn' onClick={()=> agent.TestErrors.get404Error().catch(error=>console.error(error))}>Test 404</button>
                <button className='btn' onClick={()=> agent.TestErrors.get500Error().catch(error=>console.error(error))}>Test 500</button>
                <button className='btn' onClick={getValidationError}>Test Validation</button>
            </div>
            {validationErrors.length > 0 && 
                <div>
                    {
                        validationErrors.map(error=>{
                            return (
                                <div key={error}>
                                    {error}
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}