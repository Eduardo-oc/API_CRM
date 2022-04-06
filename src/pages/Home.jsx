import React, { useEffect, useState } from 'react'
import { Client } from '../components/Client';

export const Home = () => {

    const [clients, setClients] = useState({});
    useEffect(() => {
        
        const getClientsApi = async () => {
            try {
                const url = import.meta.env.VITE_API_URL;
                const resp = await fetch(url);
                const result = await resp.json();
                setClients(result);
                
            } catch (error) {
                console.log(error);
            }
        }
        getClientsApi();
    }, [])

    const handleDelete = async (id) => {
        const ask = confirm("Desea eliminar este cliente?");

        if(ask){
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const resp = await fetch(url, {
                    method: 'DELETE'
                });
                await resp.json();

                const arrayClients = clients.filter(client => client.id != id);
                setClients(arrayClients);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
        <h1 className="text-4xl text-blue-900 font-black">Clientes</h1>
        <p className="mt-3">Administra tus Clientes</p>

        <table className="w-full mt-5 table-auto shadow bg-white">
            <thead className="bg-blue-800 text-white">
                <tr>
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Contacto</th>
                    <th className="p-2">Empresa</th>
                    <th className="p-2">Acciones</th>
                </tr>
            </thead>

            <tbody className="text-center">
                {clients && clients[0] && clients[0].id && clients.map(client => (
                    <Client
                        key={client.id}
                        client={client} 
                        handleDelete={handleDelete}
                    />
                ))}
            </tbody>
        </table>

        </>
    )
}
