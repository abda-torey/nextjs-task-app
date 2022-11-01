import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import classes from "./MainNavigation.module.css";
import { Container } from "react-bootstrap";
import Image from "next/image";

function MainNavigation() {
  const { data: session, status } = useSession();
 
  const loading = status === "loading";
 

  function logoutHandler() {
    signOut();
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className={classes.container}>
        <Navbar.Brand>
          <Image
            src="/clock.png"
            width={50}
            height={50}
            //className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={classes.nav}>
          {session && (
              <Link href="/UserTasks" passHref style={{ textDecoration: "none" }}>
                <Nav.Link style={{ color: "white" }}>Tasks</Nav.Link>
              </Link>
            )}
            {session && (
              <Link href="/profile" passHref style={{ textDecoration: "none" }}>
                <Nav.Link style={{ color: "white" }}>Profile</Nav.Link>
              </Link>
            )}

            {!session && (
              <Link href="/auth/login" passHref>
                <Nav.Link style={{ color: "white" }}>Login</Nav.Link>
              </Link>
            )}
            {session && (
              <Nav.Link style={{ color: "white" }} onClick={logoutHandler}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  // return (
  //   <header className={classes.header}>
  //     <div className={classes.logo}>React Meetups</div>
  //     <nav>
  //       <ul>
  //         {session && (
  //           <li>
  //             <Link href="/profile">Profile</Link>
  //           </li>
  //         )}
  //         {!session && !loading && (
  //           <li>
  //             <Link href="/login">Login</Link>
  //           </li>
  //         )}

  //         {session && (
  //           <li>
  //             <button onClick={logoutHandler}>Logout</button>
  //           </li>
  //         )}
  //       </ul>
  //     </nav>
  //   </header>
  // );
}

export default MainNavigation;
