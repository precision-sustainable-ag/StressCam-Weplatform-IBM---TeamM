import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .navbar {
        background-color: #222
    }

    .navbar-brand, .navbar-nav .nav-link{
        color: #bbb;
    }

    &:hover{
        color: white;
    }

`

function Header() {
    return(
        <Styles>
            {/* <header>    
                <h1>Connected Farms</h1>
                <Link style={linkStyle} to="/">Home</Link> | <Link 
                style={linkStyle} to="/about">About</Link> | <Link 
                style={linkStyle} to="/commands">Device Commands</Link>
            </header> */}

            <Navbar expand="lg">    
                <Navbar.Brand href="/">Connected Farms</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" />
                <Nav className='ml-auto'>
                <Nav.Item><Nav.Link href='/'>Home</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href='/about'>About</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href='/commands'>Device Commands</Nav.Link></Nav.Item>
                </Nav>
            </Navbar>
        </Styles>
        
    )
}

// const headerStyle = {
//     background: '#333',
//     color: '#fff',
//     textAlign: 'center',
//     padding: '10px'
// }

// const linkStyle = {
//     color: '#fff',
//     TextDecoration: 'none'
// }

export default Header;