import { FC } from 'react'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../Ship_Card/Ship_Card.css'

interface Props {
    ship_id: Number,
    name: string,
    description: string,
    photo_data: string,
    imo?: string,
    delete_from_cart:Function,
    add_to_cart:Function,
	status:string


}

// "data:image/jpeg;base64,"+
const Ship_Card_Cart: FC<Props> = ({ ship_id, name, description, photo_data,imo,delete_from_cart,add_to_cart,status}) => (
    <Card style={{ width: '20rem',height: '27rem',  marginRight: '2rem', marginTop: '2em'  }}>
	    <Card.Body>
	    	<Card.Title>{name}</Card.Title>
	    	<Card.Img variant="top" src={`data:image/jpeg;base64,${photo_data}`} height={150} width={200} />
		    <Card.Text>
		          {description}
		    </Card.Text>
		    <Card.Text>
		          IMO: {imo}
		    </Card.Text>
			{(status == "Forming") && <div>
			<Button style={{margin:"5px"}} onClick={() => {delete_from_cart(ship_id)}} variant="primary">Удалить из корзины</Button>
            <Button style={{margin:"5px"}} onClick={() => {add_to_cart(ship_id)}} variant="primary">Добавить еще один</Button> </div>}

	    </Card.Body>
    </Card>
)

export default Ship_Card_Cart