import React, { useState } from 'react';
import { Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from '../../../images/ss-track-logo.svg';
import { setLogout } from "../../../store/timelineSlice";
import NewHeaderOptions from './components/NewHeaderOptions';

const NewHeader = ({ language, handleToggleLanguage, show }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const location = useLocation();
    const [showDrawer, setShowDrawer] = useState(false);

    function logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("cachedData");
        dispatch(setLogout());
        navigate('/');
        window.location.reload();
    }

    function goToDashboard() {
        navigate('/dashboard');
    }

    const redirectToDashboard = () => {
        navigate('/dashboard'); // Redirect to the /dashboard route
    };

    const navbarBackground = location.pathname === "/" ? "transparent" : "linear-gradient(90deg, #0D4873, #0A304B, #071F2D, #0C364F, #0D4873)";

    return (
        <>
            <Navbar expand="lg" style={{ background: navbarBackground }} className="py-2">
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img className="logo" src={logo} alt="Logo" width={150} />
                    </Navbar.Brand>

                    <Button
                        variant="outline-light"
                        className="d-lg-none"
                        onClick={() => setShowDrawer(true)}
                        style={{
                            position: 'fixed',
                            top: '10px',
                            right: '10px',
                            zIndex: 1051, // Higher than Offcanvas
                        }}
                    >
                        ☰
                    </Button>
                    <Navbar.Collapse id="navbarNav" className="d-none d-lg-flex justify-content-end">
                        <Nav className="ms-auto d-flex flex-lg-row align-items-center">
                            {!show && (
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label={language === 'en' ? 'English' : 'العربية'}
                                    checked={language === 'ar'}
                                    onChange={handleToggleLanguage}
                                    className="text-white mx-3"
                                />
                            )}
                            {/* <NewHeaderOptions language={language} /> */}
                            <div className='align-items-center' style={{ marginTop: '-20px' }}>
                                <NewHeaderOptions language={language} />
                            </div>
                            <div className="d-lg-block d-none">
                                {/* <Button style={{ marginRight: token ? 10 : 50 }} onClick={() => navigate('/download')} className="signUpButton" type="button">Download</Button> */}
                                {!token ? (
                                    <>
                                        <Button onClick={() => navigate('/download')} className="signUpButton" type="button" style={{
                                            marginRight: '20px',
                                            fontWeight: '400', // Sinkin Sans weight
                                            fontSize: '0.8rem',
                                            fontFamily: "'Sinkin Sans', sans-serif",

                                        }}>{language === "en" ? "Download" : "تحميل"}</Button>
                                        <Button onClick={() => navigate('/signin')} className="btn loginButton1" type="button" style={{
                                            marginRight: '10px',
                                            fontWeight: '400', // Sinkin Sans weight
                                            fontSize: '0.8rem',  // Text size
                                            fontFamily: "'Sinkin Sans', sans-serif",
                                            borderColor: '#8CCA6B', // Border color
                                            borderWidth: '1px',    // Optional for a visible border
                                        }}>{language === "en" ? "Log In" : "تسجيل الدخول"}</Button>

                                    </>
                                ) : (
                                    <>
                                        <Button onClick={() => redirectToDashboard()} className="btn signUpButton" style={{
                                            marginRight: '0.8rem',
                                            fontWeight: '400', // Sinkin Sans weight
                                            fontSize: '0.8rem',  // Text size

                                        }} type="button"> {language === "en" ? "Dashboard" : "لوحة القيادة"}</Button>


                                        <Button onClick={() => logOut()} className="btn loginButton1" style={{
                                            marginRight: '10px',
                                            fontWeight: '400', // Sinkin Sans weight
                                            fontSize: '0.8rem',   // Text size
                                            borderColor: '#8CCA6B', // Border color
                                            borderWidth: '1px',    // Optional for a visible border
                                        }} type="button">{language === "en" ? "Log out" : "تسجيل الخروج"}
                                        </Button>
                                    </>
                                )}
                            </div>
                            {/* {!token ? (
                                <>
                                    <Button onClick={() => navigate('/download')} className="btn btn-success mx-2 my-1">{language === "en" ? "Download" : "تحميل"}</Button>
                                    <Button onClick={() => navigate('/signin')} className="btn btn-outline-light mx-2 my-1">{language === "en" ? "Log In" : "تسجيل الدخول"}</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={goToDashboard} className="btn btn-primary mx-2 my-1">{language === "en" ? "Dashboard" : "لوحة القيادة"}</Button>
                                    <Button onClick={logOut} className="btn btn-outline-danger mx-2 my-1">{language === "en" ? "Log Out" : "تسجيل الخروج"}</Button>
                                </>
                            )} */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* {showDrawer && <div className="custom-backdrop" onClick={() => setShowDrawer(false)}></div>} */}

            <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="start" className="d-lg-none full-screen-drawer" // Add full-screen-drawer class
                style={{
                    background: 'linear-gradient(90deg, #0D4873, #0A304B, #071F2D, #0C364F, #0D4873)',
                    color: 'white',
                    zIndex: 1052,  // Above backdrop but below button
                    // height: '200vh',
                    // maxHeight: '150vh'
                    // Higher than backdrop
                }} // Lower than Navbar
            >
                <Offcanvas.Header >
                    <img className="logo" src={logo} alt="Logo" width={150} />
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowDrawer(false)}
                        style={{ color: 'white', filter: 'invert(1)' }} // Makes 'X' white
                    ></button>

                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Nav className="d-flex flex-column align-items-start">
                        {!show && (
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={language === 'en' ? 'English' : 'العربية'}
                                checked={language === 'ar'}
                                onChange={handleToggleLanguage}
                                className="mb-3"
                            />
                        )}
                        <NewHeaderOptions language={language} showVertical={true} />
                        {!token ? (
                            <>
                                <Button onClick={() => navigate('/download')}
                                    style={{
                                        marginTop: '40px',
                                        marginRight: '20px',
                                        fontWeight: '400', // Sinkin Sans weight
                                        fontSize: '0.8rem',
                                        fontFamily: "'Sinkin Sans', sans-serif",
                                        backgroundColor: '#8CCA6B',
                                        borderWidth: '0px',
                                    }}
                                >{language === "en" ? "Download" : "تحميل"}</Button>
                                <Button onClick={() => navigate('/signin')}
                                    style={{
                                        marginTop: '20px',
                                        backgroundColor: 'transparent',
                                        marginRight: '10px',
                                        fontWeight: '400', // Sinkin Sans weight
                                        fontSize: '0.8rem',  // Text size
                                        fontFamily: "'Sinkin Sans', sans-serif",
                                        borderColor: '#8CCA6B', // Border color
                                        borderWidth: '1px',    // Optional for a visible border
                                    }}
                                >{language === "en" ? "Log In" : "تسجيل الدخول"}</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={goToDashboard}
                                    style={{
                                        marginTop: '40px',
                                        marginRight: '20px',
                                        fontWeight: '400', // Sinkin Sans weight
                                        fontSize: '0.8rem',
                                        fontFamily: "'Sinkin Sans', sans-serif",
                                        backgroundColor: '#8CCA6B',
                                        borderWidth: '0px',
                                    }}
                                >{language === "en" ? "Dashboard" : "لوحة القيادة"}</Button>
                                <Button onClick={logOut}
                                    style={{
                                        marginTop: '20px',
                                        backgroundColor: 'transparent',
                                        marginRight: '10px',
                                        fontWeight: '400', // Sinkin Sans weight
                                        fontSize: '0.8rem',  // Text size
                                        fontFamily: "'Sinkin Sans', sans-serif",
                                        borderColor: '#8CCA6B', // Border color
                                        borderWidth: '1px',    // Optional for a visible border
                                    }}
                                >{language === "en" ? "Log Out" : "تسجيل الخروج"}</Button>
                            </>
                        )}
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default NewHeader;