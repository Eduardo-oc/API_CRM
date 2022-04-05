import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export const ShowClient = () => {

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
        loading ? <Spinner /> :
            Object.keys(client).length === 0 ?
             <p>No hay información disponible</p> : 
             (
                <div>
                    <h1 className="text-4xl text-blue-900 font-black mb-5">Ver Cliente: {client.name}</h1>
                    <p className="pt-3 pb-5 mb-5">Información del Cliente</p>

                    <p className="text-2xl text-gray-600 mb-4 mt-5">
                        <span className="text-gray-800 uppercase font-bold">Nombre: </span>
                        {client.name}
                    </p>

                    <p className="text-2xl text-gray-600 mb-4">
                        <span className="text-gray-800 uppercase font-bold">Email: </span>
                        {client.email}
                    </p>

                    <p className="text-2xl text-gray-600 mb-4">
                        <span className="text-gray-800 uppercase font-bold">Empresa: </span>
                        {client.company}
                    </p>
                    
                    <p className="text-2xl text-gray-600 mb-4">
                        <span className="text-gray-800 uppercase font-bold">Tlf: </span>
                        {client.phone ? client.phone : "- Telefono no disponible -"}
                    </p>
                                
                    <p className="text-2xl text-gray-600">
                        <span className="text-gray-800 uppercase font-bold">Notas: </span>
                        {client.notes ? client.notes : ""}
                    </p>
                </div>
        )
    )
}
