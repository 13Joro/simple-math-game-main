import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function LevelSelectPage(){
    let playerName = localStorage.getItem("playerName");
    const navigate = useNavigate();

    useEffect(() => {
        if(playerName == null || playerName == ""){
            navigate("/");  // Redirect to the home page if no player name
        }
    }, [playerName, navigate]); // Adding playerName and navigate as dependencies

    if(playerName == null || playerName == "") {
        return null; // Don't render the component if no player name
    }
    
    return(
        <Container fluid className="d-flex flex-column m-0 p-0 bg-warning p-5">
            <h1>Welcome, {playerName}!</h1>
            <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
                <Container fluid className="row d-flex align-items-center justify-content-center">
                    <Container className="col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow" data-aos="flip-left">
                        <h1 className="display-6 fw-bold mb-4">SELECT LEVEL</h1>
                        <Container className="col-5 d-flex align-items-center justify-content-center flex-column">
                            <Button size="lg" className="rounded-pill w-100" as={NavLink} to="/start">EASY</Button>
                            <Button size="lg" className="rounded-pill my-3 w-100" as={NavLink} to="/start2">MEDIUM</Button>
                            <Button size="lg" className="rounded-pill w-100 btn-danger"as={NavLink} to="/start3">HARD</Button>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}
