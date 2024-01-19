import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import Ship_List_Page from './pages/Ship_List_Page/Ship_List_Page.tsx';
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import OrderPage from "./pages/OrderPage/OrderPage.tsx";
import Order_List_Page from "./pages/Order_List_Page/Order_List_Page.tsx";
import Ship_Page from "./pages/Ship_Page/Ship_Page.tsx";
import EditPage from "./pages/EditPage/EditPage.tsx";
import LogoutPage from "./pages/LogoutPage/LogoupPage.tsx";
import './main.css'
import Ship_List_Page_Table from "./pages/Ship_List_Page/Ship_List_Page_Table.tsx";

import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from "./store/store.ts";

import { Container, Row } from "react-bootstrap";
import "./main.css";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={ queryClient }>
        <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <Container>
                    <Row>
                        <Routes>
                            <Route path="classes_of_ships/"        element={ <Ship_List_Page /> } />
                            <Route path="/table/classes_of_ships/"        element={ <Ship_List_Page_Table /> } />
                            <Route path="login/"        element={ <LoginPage /> } />
                            <Route path="logout/"        element={ <LogoutPage /> } />
                            <Route path="register/"        element={ <RegistrationPage /> } />
                            <Route path="register/"        element={ <RegistrationPage /> } />
                            <Route path="orders/:id"        element={ <OrderPage /> } />
                            <Route path="classes_of_ships/:id"        element={ <Ship_Page /> } />
                            <Route path="orders"        element={ <Order_List_Page /> } />
                            <Route path="edit/:identifier"        element={ <EditPage /> } />
                        </Routes>
                    </Row>
                </Container>
            </BrowserRouter>
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);