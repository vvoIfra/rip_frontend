import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
// import ProductForm, { ProductFormData } from "../../components/ProductForm/ProductForm";
import { Ship } from "../Ship_List_Page/Ship_List_Page";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSsid } from "../../hooks/useSsid";
import Form from 'react-bootstrap/Form';
import My_Navbar_Without_Cart from "../../components/Navbar/Navbar";
import { Button, Container, FloatingLabel,Row } from "react-bootstrap";
import './EditPAge.css'

export interface ShipFormData {
        name: string,
        type: string,
        description:string,
        stuff:number,
        rang: number,
        status: string,
        project?: string,
        photo_data?: string,
    }

const toFormData = (ship: Ship) => {
    return {
        name: ship.name,
        type: ship.type,
        description: ship.description,
        stuff: ship.stuff,
        rang: ship.rang,
        status: ship.status,
        project: ship.project,
        photo_data: ship.photo_data,
    }
}

const emptyShip: Ship = {
    ship_id: -1,
    name: '',
    type: '',
    description:'',
    stuff:'',
    rang: '',
    status: '',
    project: '',
    photo_data: '',
}

const EditPage: FC = () => {
    let { identifier } = useParams()
    const id = parseInt(identifier)
    console.log(typeof(id))
    const navigate = useNavigate()
    const { session_id } = useSsid()
    const pageTitle = (id ? 'Изменение класса корабля' : 'Добавление класса корабля')
    const [ values, setValues ] = useState<ShipFormData> (toFormData(emptyShip))
    const [ image, setImage ] = useState<File | undefined> ()

    const getProduct = async () => {
        const response = await axios(`/api/classes_of_ships/${id}`, { method: "GET" })
        setValues(toFormData(response.data))
    }

    useEffect(() => {
        id && getProduct()
    }, [])
    
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            console.log(reader.result)
            const { name } = e.target;
            setValues((prevValues) => ({
                ...prevValues,
                [name]: reader.result,
            }))}
        };

    const sendData = async () => {
        id ?
        await axios(`/api/classes_of_ships/${id}/change/`, {
            method: 'PUT',
            data: values,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': session_id
            }
        })
        :
        await axios(`/api/classes_of_ships/add/`, {
            method: 'POST',
            data: values,
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': session_id
            }
        })
    }

    const sendForm = async () => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                values.photo_data = btoa(reader.result as string)
                sendData()
            }
            reader.readAsBinaryString(image)
        } else {
            sendData()
        }
        setTimeout(() => { navigate('/classes_of_ships'); }, 1000);
        console.log(values)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        sendForm();
    };

    return (
        <Container s>
        <Row>
            <My_Navbar_Without_Cart />
            <h1>{pageTitle}</h1>
            <Form onSubmit={handleSubmit} style={{width:"95%",marginInline:'auto'}}>
            <Form.Group controlId="name">
                    <FloatingLabel label='Название' className="mb-3">
                    <Form.Control required type="text" name = 'name' placeholder="" value={values.name} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="rang">
                    <FloatingLabel label='Ранг' className="mb-3">
                    <Form.Control required type="number" name = 'rang' placeholder="" value={values.rang} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="project">
                    <FloatingLabel label='Проект' className="mb-3">
                    <Form.Control required type="text" name = 'project' placeholder="" value={values.project} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="type">
                    <FloatingLabel label='Тип' className="mb-3">
                    <Form.Control  required type="text" name = 'type' placeholder="" value={values.type} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="stuff">
                    <FloatingLabel label='Кол-во членов экипажа' className="mb-3">
                    <Form.Control required type="number" name = 'stuff' placeholder="" value={values.stuff} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="description">
                    <FloatingLabel label='Описание' className="mb-3">
                    <Form.Control required as="textarea" name = 'description' placeholder="" value={values.description} onChange={handleChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="photo_data">
                    <FloatingLabel label='Фото корабля' className="mb-3">
                    <Form.Control type="file" name = 'photo_data' onChange={handleFileChange}/>
                    </FloatingLabel>
            </Form.Group>
            <Button type="submit">Сохранить</Button>
            </Form>
        </Row>
        </Container>
            )
}

export default EditPage