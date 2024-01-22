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
        <table className = 'styled-table' style={{"width":"100%"}}>
        <thead>
            <th>Параметр</th> <th>Значение</th>
        </thead>
        <tbody>
            {parameters && parameters.map((param) => (
                    param.value && <tr>
                <td style={{"width":"20%"}}> {param.key}</td>
                <td style={{"width":"80%"}}> {param.value}</td>
            </tr>))}
        </tbody>

            </table>
            <Link to={'/rip_frontend/'} style={{ textDecoration: "None" }} className='breadcrumb-name'>Назад</Link>
        </div>
    </div>
)

export default Ship_Info