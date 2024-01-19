import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Ship_Card.css'
interface Props {
    ship_id: Number,
    name: string,
    description: string,
    photo_data: string,
}
interface Props_Add {
    ship_id: Number,
    name: string,
    description: string,
    photo_data: string,
	add_to_cart: Function
}
// "data:image/jpeg;base64,"+
export const Ship_Card: FC<Props> = ({ ship_id, name, description, photo_data }) => (
    <Card style={{ width: '20rem',height: '24rem',  marginRight: '2rem', marginTop: '2em'  }}>
	    <Card.Body>
	    	<Card.Title>{name}</Card.Title>
	    	<Card.Img variant="top" src={`data:image/jpeg;base64,${photo_data}`} height={150} width={200} />
		    <Card.Text>
		          {description}
		    </Card.Text>
	    	<Button href={"/classes_of_ships/" + ship_id.toString()} variant="primary">Подробнее</Button>
	    </Card.Body>
    </Card>
)

export const Ship_Card_with_Cart: FC<Props_Add> = ({ ship_id, name, description, photo_data,add_to_cart }) => (
    <Card style={{ width: '20rem',height: '24rem',  marginRight: '2rem', marginTop: '2em'  }}>
	    <Card.Body>
	    	<Card.Title>{name}</Card.Title>
	    	<Card.Img variant="top" src={`data:image/jpeg;base64,${photo_data}`} height={150} width={200} />
		    <Card.Text>
		          {description}
		    </Card.Text>
	    	<Button style={{margin:"5px"}} href={"/classes_of_ships/" + ship_id.toString()} variant="primary">Подробнее</Button>
			<Button style={{margin:"5px"}} variant="primary" onClick={() => {add_to_cart(ship_id)}}>Добавить в корзину</Button>
	    </Card.Body>
    </Card>
)

