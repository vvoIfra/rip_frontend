import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Ship, get_Ship } from '../../modules/getDataFromAPI'
import Ship_Info, {Param} from '../../components/Ship_Info/Ship_Info'
import "./Ship_Page.css"
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Container, Row } from 'react-bootstrap';
import { getBase } from '../../../path_config.ts';

const Ship_Page: FC = () => {
    const { id } = useParams();

    const [ship, setShip] = useState<Ship>();
    const [parameters, setParameters] = useState<Param[]>([]);

    const getParams = (source: Ship) => {
        let params: Param[] = []
        source.description && params.push({key: "Описание", value: source.description})
        source.type && params.push({key: "Тип", value: source.type})
        source.stuff &&  params.push({key: "Кол-во экипажа", value: source.stuff})
        source.rang && params.push({key: "Ранг", value: source.rang})
        source.project && params.push({key: "Проект", value: source.project})
        return params
    }

    useEffect(() => {
        id && get_Ship(id)
            .then((response) => {
                setShip(response);
                setParameters(getParams(response));
            })
            .then(() => {
                console.log(ship);
                console.log(parameters);
            })
    }, [id]);

    return (
        <Container>
            <Row>
                {id && ship && <Breadcrumbs pages={[ { link: `${getBase()}/classes_of_ships/${id}/`, title: `${ship.name}` } ]} />}
            </Row>
            <Row>
                {ship && parameters && id && <Ship_Info ship_id={parseInt(id)} description={ship.description} parameters={parameters} photo_data={ship.photo_data} />}
            </Row>
        </Container>
    )
}

export default Ship_Page;