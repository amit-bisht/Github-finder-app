import React, { useContext } from 'react'
import AlertContext from '../../alert/alert-context'
function Alert() {
    const ctx = useContext(AlertContext)
    return (
        <>
            {ctx.type !== null && <p className="flex items-start mb-4 space-x-2">
                {ctx.type == 'error' && <p className="flex-1 text-base font-semibold leading-7 text-white">
                    <strong>
                        {ctx.message}
                    </strong>
                </p>}
            </p>}
        </>
    )
}

export default Alert