import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Ship, get_Ship_List } from '../../modules/getDataFromAPI'
import Ship_Card from '../../components/Ship_Card/Ship_Card';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import "./Ship_List_Page.css"
import { Filter }  from '../../components/Filter/Filter';

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// TODO
// 5. Navbar из списка базовых страниц
// 7. Развернуть фронтенд на Github Pages
// 8. ТЗ

const ProductListPage: FC = () => {
    const [ships, setProducts] = useState<Ship[]>([]);


    const location = useLocation();
    const request = new URLSearchParams(location.search);
    const requestName = request.get('name_filter');

    const title = (requestName ? requestName : '');
    useEffect(() => {
     get_Ship_List(title)
            .then((response) => {
                setProducts(response);
            });
    },[]);
    return (
        <Container>

            <Row>
            <Col style={{ width: "22%", margin: "30px" }}>
                    <Filter
                        title={title}
                    />
                </Col>
                <Breadcrumbs pages={[]} />
            </Row>
            <Row style={{ display: "flex" }}>
                <Col style={{ marginBottom: "30px", marginLeft: "10px" }}>
                    <div id="box">
                        {ships && ships.map((ship) => (
                            <Ship_Card key={ship.ship_id.toString()}
                                ship_id={ship.ship_id}
                                name={ship.name}
                                description={ship.description}
                                photo_data={ship.photo_data}/>
                        ))}
                    </div>
                </Col>
            </Row>
            </Container>
    );
}

export default ProductListPage