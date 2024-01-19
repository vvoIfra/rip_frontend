import { FC } from 'react'
import { Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Ship_Info.css'

export interface Param {
    key: string,
    value: string
}

interface Props {
    ship_id: Number,
    description: string,
    photo_data: string,
    name:string,
    parameters: Param[],
}

// "data:image/jpeg;base64,"+
const Ship_Info: FC<Props> = ({ ship_id, description, photo_data ,name, parameters}) => (
    <div className="product">
        <div className="product-info" key={ship_id.toString()} style={{display:"inline-flex"}}>
            <div className="product-image-wrap">
                <img src={`data:image/jpeg;base64,${photo_data}`} alt="картинка" className="product-image" />
            </div>
            <div style={{marginLeft:"20px"}}>
            <div className="product-bar" style={{fontSize:"26px",fontWeight:"bold"}}>
                <label htmlFor="product-params" className="product-params-text">{name}</label>
            </div>
            <div className="product-bar" style={{fontSize:"20px"}}>
                <label htmlFor="product-params" className="product-params-text">{description}</label>
            </div>
            </div>
        </div>
        <table className = 'styled-table'>
        <thead>
            <th>Параметр</th> <th>Значение</th>
        </thead>
        <tbody>
            {parameters && parameters.map((param) => (
                    param.value && <tr>
                <td> {param.key}</td>
                <td> {param.value}</td>
            </tr>))}
        </tbody>

            </table>
        <Button variant="outline-primary" href="/classes_of_ships">Назад</Button>
    </div>
)

export default Ship_Info