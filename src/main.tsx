
import ReactDOM from 'react-dom/client'
import {
    createHashRouter,
    RouterProvider
  } from 'react-router-dom';

// import MainPage from './pages/MainPage/MainPage';
import Ship_List_Page from './pages/Ship_List_Page/Ship_List_Page'
import Ship_Page from './pages/Ship_Page/Ship_Page'
import My_Navbar from './components/Navbar/Navbar'
import './main.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const router = createHashRouter([
    // {
    //     path: '/',
    //     element: <MainPage />
    // },
    {
        path: `*/*`,
        element: <Ship_List_Page />
    },
    {
        path: `/#/classes_of_ships/:id/`,
        element: <Ship_Page />
    }
    

])
ReactDOM.createRoot(document.getElementById('root')!).render(
   // <React.StrictMode>
        <Container>
            <Row id="header">
                <My_Navbar />
            </Row>
            <Row>
                <RouterProvider router={router} />
            </Row>
        </Container>
    //</React.StrictMode>,
)
