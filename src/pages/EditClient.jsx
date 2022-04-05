import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FormClient } from '../components/FormClient';

export const EditClient = () => {

    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const getClientApi = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const resp = await fetch(url);
                const result = await resp.json();

                setClient(result);
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }

        getClientApi();
    }, [])

    return (
        <>
            {loading == false &&
            <>
                <h1 className="text-4xl text-blue-900 font-black">Editar Cliente</h1>
                <p className="mt-3">Utiliza el formulario para editar el Cliente</p>
            </>}
            
            {client?.name ? (
                <FormClient 
                    client={client}
                    loading={loading}
                />
            ): <p>ID de Cliente no válido</p>}
        </>
    )
}
