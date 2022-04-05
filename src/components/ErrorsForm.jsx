import React from 'react';

export const ErrorsForm = ({children}) => {
    return (
            <div className="text-center text-red-600 font-bold p-2 uppercase">
                {children}
            </div>
    )
}
