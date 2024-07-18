import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Col, Row, Button, Form, Card } from 'react-bootstrap';

const BACKEND_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

const ProjectEdit = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`${BACKEND_ENDPOINT}/projects/${projectId}`);
                setProject(response.data);               
            } catch (error) {
                setError(error);
                const errorMessage = error.response.data.message;

                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Volver'
                })
            }
        };

        fetchProject();
    }, [projectId]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
    <Form className="border border-info align-items-start m-3 py-3 px-4 rounded-4 bg-white">
        
        <Row className="mb-3">
            <Form.Label column xl={1} md={2} className='fw-bold fs-5'>
                Proyecto:
            </Form.Label>
            <Col xl={5} md={7}>
                <Form.Control className='py-2 border-dark' type="text" placeholder="Titulo del proyecto" value={project.titulo}/>
            </Col>
        </Row>

        <Row className="mb-3">
            <Form.Label column xl={1} md={2} className='fw-bold fs-5'>
                Descripción:
            </Form.Label>
            <Col xl={11} md={7}>
                <Form.Control as="textarea" aria-label="With textarea" placeholder="Detalle del puesto" />
            </Col>
        </Row>

        {/* <Form.Group className="mb-3" controlId="">
            <Form.Label className='fw-bold fs-5'>
                Descripción:
            </Form.Label>
          <Form.Control as="textarea" aria-label="With textarea" placeholder="Detalle del puesto" />
        </Form.Group> */}

        {/* <Form.Control as="textarea" aria-label="With textarea" /> */}

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>
  
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>
    );
};

export default ProjectEdit;
