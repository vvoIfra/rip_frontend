import { FC } from 'react'
import { Link } from "react-router-dom";
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
    parameters: Param[],
}

// "data:image/jpeg;base64,"+
const Ship_Info: FC<Props> = ({ ship_id, description, photo_data , parameters}) => (
    <div className="product">
        <div className="product-info" key={ship_id.toString()}>
            <div className="product-image-wrap">
                <img src={`data:image/jpeg;base64,${photo_data}`} alt="картинка" className="product-image" />
            </div>
            <div className="product-bar">
                <label htmlFor="product-params" className="product-params-text">{description}</label>
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
            <Link to={'/rip_frontend/'} style={{ textDecoration: "None" }} className='breadcrumb-name'>Подробнее</Link>
        </div>
    </div>
)

export default Ship_Info