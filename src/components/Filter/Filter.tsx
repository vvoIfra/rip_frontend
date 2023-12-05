import { FC } from 'react'
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export interface FilterData {
    title: string
}

export const Filter: FC<FilterData> = ({ title, stuff_min, stuff_max}) => {
    const [inputTitle, setInputTitle] = useState(title);


    return (
        <Container id="filter">
            <form action="" method="get" id="filter-form">
                    <Row style={{ display: "flex" }}>
                        <input className="filter-input" name="name_filter" type="text" size={30} placeholder="Введите название" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} /> 
                        <input type="submit" hidden />   
                    </Row>
            </form>
        </Container>
    )
}