import { FC } from 'react'
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


export interface FilterData {
    title: string,
    count: number,
    send: Function
}

export const Filter: FC<FilterData> = ({ title,count,send}) => {
    const [inputTitle, setInputTitle] = useState(title);


    return (
        <Container id="filter">
                    <Row style={{ display: "flex" }}>
                        <input className="filter-input" name="name_filter" type="text" size={30} placeholder="Введите название" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} /> 
                        <input type="button" onSubmit={()=>{send(count+1)}}>Поиск</input>   
                    </Row>
        </Container>
    )
}