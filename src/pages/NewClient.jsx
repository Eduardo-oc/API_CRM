import React from 'react'
import { FormClient } from '../components/FormClient'

export const NewClient = () => {

    return (
        <>
            <h1 className="text-4xl text-blue-900 font-black">Nuevo Cliente</h1>
            <p className="mt-3">Llena los siguiente campos para registrar un cliente</p>

            <FormClient />
        </>
    )
}
