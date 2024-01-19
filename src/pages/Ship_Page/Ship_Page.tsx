import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Ship_Info, {Param} from '../../components/Ship_Info/Ship_Info'
import "./Ship_Page.css"
import { Container, Row } from 'react-bootstrap';
import axios from 'axios'
import My_Navbar_Without_Cart from '../../components/Navbar/Navbar';

export interface Ship {
    ship_id: number,
    name: string,
    rang?: string,
    stuff?: string,
    status: string,
    type?: string,
    project: string,
    description: string,
    photo_data: string
}

const Ship_Page: FC = () => {
    const { id } = useParams();

    const [ship, setShip] = useState<Ship>();
    const [parameters, setParameters] = useState<Param[]>([]);

    const getParams = (source: Ship) => {
        let params: Param[] = []
        source.type && params.push({key: "Тип", value: source.type})
        source.stuff &&  params.push({key: "Кол-во экипажа", value: source.stuff})
        source.rang && params.push({key: "Ранг", value: source.rang})
        source.project && params.push({key: "Проект", value: source.project})
        return params
    }

    const get_Ship = async () => {
        const {data} = await axios(`/api/classes_of_ships/${id}`, {
            method: "Get",
        })
        setShip(data);
        setParameters(getParams(data));
    }
    useEffect(() => {
        get_Ship()
    }, [id]);

    return (
        <Container>
            <My_Navbar_Without_Cart/>
            <Row>
                {ship && parameters && id && <Ship_Info ship_id={parseInt(id)} description={ship.description} name={ship.name} parameters={parameters} photo_data={ship.photo_data} />}
            </Row>
        </Container>
    )
}

export default Ship_Page;