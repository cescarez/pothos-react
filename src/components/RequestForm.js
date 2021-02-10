import React, { useState } from 'react';
import { Form, Button, Container, Card, Col, InputGroup, Alert, Pagination } from 'react-bootstrap'

export default function RequestForm({ onSubmitRequest, sitterPrices }) {
    const [requestFormFields, setRequestFormFields] = useState({
        date_of_service: '',
        services: {
            water_by_plant: 0,
            water_by_time: 0,
            repot_by_plant: 0,
            repot_by_time: 0
        },
        total_cost: 0
    })

    const onRequestFormChange = (event) => {
        const newInput = event.target.name;
        const newValue = event.target.value;

        const newRequestForm = { ...requestFormFields };
        
        if (newInput !== 'date_of_service') {
            newRequestForm.services = {
                ...requestFormFields.services,
                [newInput]: newValue,
            }
            newRequestForm.total_cost = serviceCostEstimate(newRequestForm.services);
        } else {
            newRequestForm[newInput] = newValue;
        }

        setRequestFormFields(newRequestForm);
    }

    function serviceCostEstimate (services) {
        let sum = 0
        Object.entries(sitterPrices).forEach(([service, rate]) => {
            sum += (rate * parseInt(services[service]))
        })
        console.log(`estimated service cost: ${sum}`)
        return(
            sum
        )
    }

    return (
        <Container fluid >
            <Form >
                <Form.Group>
                    <Form.Row>
                        <Form.Label>Date for Plant Services</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" name='date_of_service' value={requestFormFields.date_of_service.date} onChange={onRequestFormChange} />
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <Form.Label column sm={5} className='text-right request-form__form-label'>Watering / Plant</Form.Label>
                        <Col sm={5}>
                            <Form.Control size='sm' name='water_by_plant' value={requestFormFields.services.water_by_plant} onChange={onRequestFormChange} type='number' min='0' />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm={5} className='text-right request-form__form-label'>Watering / 30 min</Form.Label>
                        <Col sm={5}>
                            <Form.Control size='sm' type='number' name='water_by_time' value={requestFormFields.services.water_by_time} onChange={onRequestFormChange} min='0' />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm={5} className='text-right  request-form__form-label'>Repotting / Plant</Form.Label>
                        <Col sm={5}>
                            <Form.Control size='sm' type='number' name='repot_by_plant' value={requestFormFields.services.repot_by_plant} onChange={onRequestFormChange} min='0' />
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label column sm={5} className='text-right  request-form__form-label'>Repotting / 30 min</Form.Label>
                        <Col sm={5}>
                            <Form.Control size='sm' type='number' name='repot_by_time' value={requestFormFields.services.repot_by_time} onChange={onRequestFormChange} min='0' />
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Row>
                        <InputGroup className="mb-3">
                            <Form.Label column sm={5} className='test-right font-weight-bold'>Estimated Cost</Form.Label>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type='text' name='total_cost' value={requestFormFields.total_cost.toFixed(2)} disabled placeholder='Total' />
                        </InputGroup>
                    </Form.Row>
                </Form.Group>
                <Button variant='primary' type="submit" value="submit" className='d-inline-block w-100' onClick={()=>onSubmitRequest(requestFormFields)}>
                    Submit Request
                </Button>
            </Form>
        </Container>
    )
}
