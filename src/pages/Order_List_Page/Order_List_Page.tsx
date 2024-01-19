import { FC, useEffect, useState } from "react"
import { Container, Row,Button } from 'react-bootstrap'
import { useAuth } from '../../hooks/useAuth';
import { useSsid } from '../../hooks/useSsid';
import Loader from '../../components/Loader/Loader.tsx';
import axios from 'axios';
import OrderFilter from "../../components/OrderFilter/OrderFilter.tsx";
import { useStore,useDispatch } from 'react-redux';
import { saveAct,saveDec,saveApr } from "../../store/OrderStatusFilter.ts";
import { saveEnd,saveStart } from "../../store/OrderDateFilter.ts";
import OrderFilterMod from "../../components/OrderFilterMod/OrderFilterMod.tsx";
import { useNavigate } from "react-router-dom"
import My_Navbar_Without_Cart from "../../components/Navbar/Navbar.tsx";
import Table from 'react-bootstrap/Table';
import { useQuery } from "react-query";

interface Response {
    order_id: number,
    status: string,
    start_date: string | undefined,
    in_work: string | undefined,
    full_name_mod: string,
    full_name_creator: string,
    count_of_imo:string,
}

type Filter = {
    Active: boolean;
    Decline: boolean;
    Aprove: boolean;
}

const Order_List_Page: FC = () => {
    const [ loading, setLoading ] = useState<boolean> (true)
    const { session_id } = useSsid()
    const navigate = useNavigate()
    const { is_authenticated, is_moderator } = useAuth()
    const [ response, setResponse ] = useState<Response[]> ()
    const [ moder_search, setModer_search] = useState<string> ('')
    const dispatch = useDispatch()
    const [ filterSendCount, setFilterSendCount ] = useState<number> (0)
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
    const [filter, setFilter] = useState<Filter> ({
        Active: useStore().getState().filter_status.Active,
        Decline: useStore().getState().filter_status.Decline,
        Aprove: useStore().getState().filter_status.Aprove,
    });
    const [ startDate, setStartDate ] = useState(useStore().getState().filter_date.start_date)
    const [ endDate, setEndDate ] = useState(useStore().getState().filter_date.end_date)

    const getFilterStatusParams = () => {
        let result = ''
        if (filter.Active) {
            result += 'Active,'
        }
        if (filter.Decline) {
            result += 'Decline,'
        }
        if (filter.Aprove) {
            result += 'Aprove,'
        }
        return result
    }

    const getOrders = async () => {
        try {
            console.log(`begin_of_int = ${startDate}`)
            console.log(`end_of_int = ${endDate}`)
            const { data } = await axios(`/api/orders/`, {
                method: "GET",
                headers: {
                    'authorization': session_id
                },
                params: {
                    'status': getFilterStatusParams(),
                    'begin_of_int': startDate,
                    'end_of_int': endDate,
                }
            })
            dispatch(saveAct(filter.Active))
            dispatch(saveApr(filter.Aprove))
            dispatch(saveDec(filter.Decline))
            dispatch(saveEnd(endDate))
            dispatch(saveStart(startDate))
            console.log(data)
            if (moder_search == ''){
            setResponse(data)}else{
                setResponse(data.filter(function (el) { return el.full_name_creator.startsWith(moder_search) }))
            }
        } catch {
            console.log("Что-то пошло не так")
        }
    }
    const aprove = async (id:number) => {
        try {
            await axios(`/api/orders/${id}/approve_or_decline_order/`, {
                method: "PUT",
                headers: {
                    'authorization': session_id
                },
                data:{
                    'status':'Aprove'
                }
            })
            setFilterSendCount(filterSendCount+1)
        } catch (error) {
            console.log(error)
        }
    }
    const decline = async (id:number) => {
        try {
            await axios(`/api/orders/${id}/approve_or_decline_order/`, {
                method: "PUT",
                headers: {
                    'authorization': session_id
                },
                data:{
                    'status':'Decline'
                }
            })
            setFilterSendCount(filterSendCount+1)
        } catch (error) {
            console.log(error)
        }
    }
    useQuery('orders', getOrders, { refetchInterval: 4000 });
    useEffect(() => {
        getOrders().then(() => {
            setLoading(false)
            

        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }, [filterSendCount])

    if (!is_authenticated && !loading) {
        return (
            <Container style={{ marginLeft: "30px" }}>
                <h1 className="cart-help-text">Войдите в аккаунт, чтобы посмотреть список заказов</h1>
            </Container>
        )
    }

    const getTextStatus = (status: string) => {
        if (status === 'Active') {
            return 'отправлен'
        } else if (status === 'Aprove') {
            return 'принят'
        } else if (status == 'Decline') {
            return 'отклонён'
        }
        return ''
    }
    if (!is_moderator){
    return (
        <> {loading ? <Loader /> :
        <Container>
            <My_Navbar_Without_Cart/>
            <Row>
                <OrderFilter
                    state={filter}
                    setFilter = {setFilter}
                    start_date={startDate}
                    setStartDate={setStartDate}
                    end_date = {endDate}
                    setEndDate={setEndDate}
                    send={setFilterSendCount}
                    />
            </Row>
            <Row>
            <Table striped bordered hover variant="white" style={{width:"95%",marginInline:'auto'}}>
                        <thead>
                            <tr>
                                <th> Номер заявки</th>
                                <th> Дата и время отправки</th>
                                <th> Статус</th>
                                <th> Просмотр</th>
                            </tr>
                        </thead>
                        <tbody>
                        {response.map((order) => (
                            <tr>
                                <td>{order.order_id}</td>
                                <td>{new Date(order.in_work).toLocaleString("ru", options)}</td>
                                <td>{getTextStatus(order.status)}</td>
                                <td><Button href={`/orders/${order.order_id}`}>Просмотр</Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
            </Row>
        </Container>
        }</>
    )}
    else{
        return (
            <> {loading ? <Loader /> :
            <Container>
                <My_Navbar_Without_Cart/>
                <Row>
                    <OrderFilterMod
                        state={filter}
                        setFilter = {setFilter}
                        start_date={startDate}
                        setStartDate={setStartDate}
                        end_date = {endDate}
                        setEndDate={setEndDate}
                        moder_search = {moder_search}
                        setModer_search={setModer_search}
                        send={setFilterSendCount}
                        />
                </Row>
                <Row>
                <Table striped bordered hover variant="white" style={{width:"95%",marginInline:'auto'}}>
                        <thead>
                            <tr>
                                <th> Номер заявки</th>
                                <th> Дата и время отправки</th>
                                <th> Статус</th>
                                <th> Создатель</th>
                                <th> Кол-во кораблей с IMO</th>
                                <th> Просмотр</th>
                                <th> Подтверждение</th>
                                <th> Отклонение</th>
                            </tr>
                        </thead>
                        <tbody>
                        {response.map((order) => (
                            <tr>
                                <td>{order.order_id}</td>
                                <td>{new Date(order.in_work).toLocaleString("ru", options)}</td>
                                <td>{getTextStatus(order.status)}</td>
                                <td>{order.full_name_creator}</td>
                                <td>{order.count_of_imo}</td>
                                <td><Button href={`/orders/${order.order_id}`}>Просмотр</Button></td>
                                {order.status == "Active" && 
                                <td><Button onClick={() => {aprove(order.order_id)}}>Подтверждение</Button></td>}
                                {order.status == "Active" && 
                                <td><Button onClick={() => {decline(order.order_id)}}>Отклонение</Button></td> 
                                }
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            }</>
        )

    }
}

///                    {is_moderator && <Col>
///<button className="send-button" onClick={aprove}>Подтвердить заказ</button>
///<button className="delete-button" onClick={decline}>Отказать</button>
///</Col>}
export default Order_List_Page