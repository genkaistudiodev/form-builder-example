import React from 'react'
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

export default function Header() {
    return (
        <>
            <MDBRow>
                <MDBCol className='text-center my-4'>
                    <h1>Editor de Formulario</h1>
                </MDBCol>
            </MDBRow>
            <hr />
        </>
    )
}
