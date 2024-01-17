import { FC } from 'react'
import { Card } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";

interface Props {
    ship_id: Number,
    name: string,
    description: string,
    photo_data: string,
}

// "data:image/jpeg;base64,"+
const Ship_Card: FC<Props> = ({ ship_id, name, description, photo_data }) => (
    <Card style={{ width: '20rem',height: '27rem',  marginRight: '2rem', marginTop: '2em'  }}>
	    <Card.Body>
	    	<Card.Title>{name}</Card.Title>
	    	<Card.Img variant="top" src={`data:image/jpeg;base64,${photo_data}`} height={150} width={200} />
		    <Card.Text>
		          {description}
		    </Card.Text>
			<Link to={'/rip_frontend/classes_of_ships/'+ship_id} style={{ textDecoration: "None" }} className='breadcrumb-name'>Подробнее</Link>
	    </Card.Body>
    </Card>
)

export default Ship_Card