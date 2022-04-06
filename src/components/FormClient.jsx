import React from 'react';
import { ErrorsForm } from './ErrorsForm';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from'yup';
import { Spinner } from './Spinner';

export const FormClient = ({client, loading}) => {

    const navigate = useNavigate();

    const newClientSchema = Yup.object().shape({
        name: Yup.string()
                    .min(3, "El Nombre es muy corto")
                    .max(20, "El Nombre es muy largo")
                    .required('El Nombre es obligatorio'),
        company: Yup.string()
                    .required('La Empresa es obligatorio'),
        email: Yup.string()
                    .required('El Email es obligatorio'),
        phone: Yup.number()
                    .positive("Numero no valido")
                    .typeError("Caracter no válido")
                    .integer("Numero no válido")

    })

    const handleSubmit = async (values) => {
        try {
            let resp;
            if(client.id) {
                //Editando registro
                const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
                resp = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })


            }else {
                //Nuevo registro
                const url = import.meta.env.VITE_API_URL;

                resp = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await resp.json();
            
            navigate('/clients');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        loading ? <Spinner /> : (
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center"
                >{client?.name ? "Editar Cliente" : "Agregar Cliente"}</h1>

                <Formik
                    initialValues={{
                        name: client?.name ?? '',
                        company: client?.company ?? '',
                        email: client?.email ?? '',
                        phone: client?.phone ?? '',
                        notes: client?.notes ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={ async (values, {resetForm}) => {
                        await handleSubmit(values);

                        resetForm();
                    }}
                    validationSchema={newClientSchema}
                >
                    {({errors, touched}) => {

                        return (

                    <Form className="mt-10">
                        <div className="mb-4">
                            <label 
                                className="text-gray-800"
                                htmlFor="name"
                            >Nombre:</label>
                            <Field 
                                id="name"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del Cliente"
                                name="name"
                            />
                            {errors.name && touched.name ? (
                                <ErrorsForm>{errors.name}</ErrorsForm>
                            ): null}
                        </div>
                        
                        <div className="mb-4">
                            <label 
                                className="text-gray-800"
                                htmlFor="company"
                            >Empresa:</label>
                            <Field 
                                id="company"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Empresa del Cliente"
                                name="company"
                            />
                            {errors.company && touched.company ? (
                                <ErrorsForm>{errors.company}</ErrorsForm>
                            ): null}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="text-gray-800"
                                htmlFor="email"
                            >Email:</label>
                            <Field 
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Email del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <ErrorsForm>{errors.email}</ErrorsForm>
                            ): null}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="text-gray-800"
                                htmlFor="phone"
                            >Telefono:</label>
                            <Field 
                                id="phone"
                                type="tel"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Telefono del Cliente"
                                name="phone"
                            />
                            {errors.phone && touched.phone ? (
                                <ErrorsForm>{errors.phone}</ErrorsForm>
                            ): null}
                        </div>

                        <div className="mb-4">
                            <label 
                                className="text-gray-800"
                                htmlFor="notes"
                            >Notas:</label>
                            <Field
                                as="textarea"
                                id="notes"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                placeholder="Notas del Cliente"
                                name="notes"
                            />
                        </div>

                        <input 
                            type="submit" 
                            value={client?.name ? "Editar Cliente" : "Agregar Cliente"}
                            className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                            />
                    </Form>
                    )}}
                </Formik>
            </div>
        )
    )
}

FormClient.defaultProps = {
    client: {},
    loading: false
}
