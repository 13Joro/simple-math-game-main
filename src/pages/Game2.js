// import { useEffect, useState } from "react";
// import { Container, Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";


// export default function Game(){
//     let playerName = localStorage.getItem("playerName");
//     const navigate = useNavigate();


//      const [randomNum1, setRandomNum1] = useState(0);
//      const [randomNum2, setRandomNum2] = useState(0);
//      const [answer, setAnswer] = useState(0);
//      let [stage, setStage] = useState(1);
//      let [score, setScore] = useState(0);
//      let [nextBtn, setNextBtn] = useState(true);
//      let [checkBtn, setCheckBtn] = useState(false);
//      let [operation, setOperation] = useState("+");


//      useEffect(() => {
//          if(playerName == null || playerName == ""){
//              navigate("/"); // Navigate to the welcome page if no player name is found
//          }


//          generateRandomNum();
//      }, [randomNum1, randomNum2]);


//      if(playerName == null || playerName == "") {
//          return null;
//      }


//      function generateRandomNum(){
//          let num1 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500; // Random number between 500 and 1000
//          setRandomNum1(num1);
   
//          let num2 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500; // Random number between 500 and 1000
//          setRandomNum2(num2);


//          // Set the operation based on stage
//          if (stage <= 3) {
//              setOperation("+");
//          } else if (stage <= 6) {
//              setOperation("-");
//          } else if (stage <= 8) {
//              setOperation("*");
//          } else {
//              setOperation("/");
//          }
//      }


//      function checkAnswer(){
//          let correctAnswer;
//          if (operation === "+") {
//              correctAnswer = randomNum1 + randomNum2;
//          } else if (operation === "-") {
//              correctAnswer = randomNum1 - randomNum2;
//          } else if (operation === "*") {
//              correctAnswer = randomNum1 * randomNum2;
//          } else if (operation === "/") {
//              correctAnswer = randomNum1 / randomNum2;
//          }


//          if(Number(answer) === correctAnswer){
//              Swal.fire({
//                  title: "CORRECT!",
//                  message: "Keep it up!",
//                  icon: "success"
//              })
//              setAnswer("");
//              setStage(stage + 1);
//              setScore(score + 5);


//              if(stage === 10){
//                  Swal.fire({
//                      title: "YOU MADE IT!",
//                      message: "Keep it up!",
//                      icon: "success"
//                  })
//                  setNextBtn(false);
//                  setCheckBtn(true);
//              } else {
//                  generateRandomNum();
//              }
//          } else {
//              Swal.fire({
//                  title: "OOPS!",
//                  message: "Try again!",
//                  icon: "error"
//              })
//          }
//      }


//      return(
//          <Container fluid className="d-flex flex-column m-0 p-0 bg-warning p-5">
//              {/* PLAYER NAME */}
//              <Container fluid className="d-flex">
//                  <h1 className="me-auto">Welcome, {playerName}!</h1>
//                  <h1>SCORE {score}</h1>
//              </Container>


//              <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
//                  <Container fluid className="row d-flex align-items-center justify-content-center">
//                      <Container className="col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow" data-aos="flip-left">
//                          <h1 className="display-6 fw-bold mb-4">STAGE {stage}</h1>

//                          <Container className="col-5 d-flex align-items-center justify-content-center gap-1">
//                              {/* Left Number */}
//                              <Container className="col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
//                                  <h1 className="display-3 fw-bold">{randomNum1}</h1>
//                              </Container>


//                              {/* Operation between the numbers */}
//                              <Container className="col-2 d-flex align-items-center justify-content-center p-5">
//                                  <h1 className="display-3 fw-bold">{operation}</h1>
//                              </Container>


//                              {/* Right Number */}
//                              <Container className="col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
//                                  <h1 className="display-3 fw-bold">{randomNum2}</h1>
//                              </Container>
//                          </Container>


//                          <Form className="mt-5">
//                              <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">
//                                  <Form.Control type="number" placeholder="TYPE YOUR ANSWER"
//                                      value={answer} onChange={e => setAnswer(e.target.value)}  className="rounded-pill" size="lg"/>
                               
//                                  <Button className="rounded-pill mt-5 w-100" disabled={checkBtn} onClick={checkAnswer}>CHECK</Button>


//                                  <Button className="rounded-pill mt-1 w-100" disabled={nextBtn}>NEXT</Button>
//                              </Form.Group>
//                          </Form>
//                      </Container>
//                  </Container>
//              </Container>
//          </Container>
//      )
//  }

import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Game() {
    let playerName = localStorage.getItem("playerName");
    const navigate = useNavigate();

    const [randomNum1, setRandomNum1] = useState(0);
    const [randomNum2, setRandomNum2] = useState(0);
    const [answer, setAnswer] = useState("");
    const [stage, setStage] = useState(1);
    const [score, setScore] = useState(0);
    const [operation, setOperation] = useState("+");

    useEffect(() => {
        if (playerName == null || playerName === "") {
            navigate("/"); // Navigate to the welcome page if no player name is found
        }

        generateRandomNum(); // Initial number generation
    }, []); // This effect only runs once when the component mounts

    // Function to generate random numbers and set the operation based on the stage
    function generateRandomNum() {
        let num1 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        let num2 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

        setRandomNum1(num1);
        setRandomNum2(num2);

        // Change the operation based on the stage
        if (stage <= 3) setOperation("+");
        else if (stage <= 6) setOperation("-");
        else if (stage <= 8) setOperation("*");
        else setOperation("/");
    }

    function checkAnswer() {
        let correctAnswer;
        if (operation === "+") correctAnswer = randomNum1 + randomNum2;
        else if (operation === "-") correctAnswer = randomNum1 - randomNum2;
        else if (operation === "*") correctAnswer = randomNum1 * randomNum2;
        else if (operation === "/") correctAnswer = randomNum1 / randomNum2;

        if (Number(answer) === correctAnswer) {
            Swal.fire({
                title: "CORRECT!",
                text: "Keep it up!",
                icon: "success",
            });

            // Reset the answer and move to the next stage after a delay
            setAnswer("");
            setTimeout(() => {
                setStage((prevStage) => prevStage + 1);
                setScore((prevScore) => prevScore + 10);

                // Generate new numbers only if the stage is less than 10
                if (stage < 10) {
                    generateRandomNum(); // Generate new random numbers for the next stage
                } else {
                    Swal.fire({
                        title: "YOU MADE IT!",
                        text: "Congratulations!",
                        icon: "success",
                    });
                }
            }, 1000); // 1-second delay to simulate lazy loading
        } else {
            Swal.fire({
                title: "OOPS!",
                text: "Try again!",
                icon: "error",
            });
        }
    }

    // Return early if playerName is not available
    if (playerName == null || playerName === "") {
        return null;
    }

    return (
        <Container fluid className="d-flex flex-column m-0 p-0 bg-warning p-5">
            <Container fluid className="d-flex">
                <h1 className="me-auto">Welcome, {playerName}!</h1>
                <h1>SCORE {score}</h1>
            </Container>

            <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
                <Container fluid className="row d-flex align-items-center justify-content-center">
                    <Container className="col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow" data-aos="flip-left">
                        <h1 className="display-6 fw-bold mb-4">STAGE {stage}</h1>
                        <Container className="col-5 d-flex align-items-center justify-content-center gap-1">
                            <Container className="col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                                <h1 className="display-3 fw-bold">{randomNum1}</h1>
                            </Container>
                            <Container className="col-2 d-flex align-items-center justify-content-center p-5">
                                <h1 className="display-3 fw-bold">{operation}</h1>
                            </Container>
                            <Container className="col-12 bg-light d-flex align-items-center justify-content-center p-5 rounded-3">
                                <h1 className="display-3 fw-bold">{randomNum2}</h1>
                            </Container>
                        </Container>

                        <Form className="mt-5">
                            <Form.Group className="mb-3 d-flex flex-column justify-content-center align-items-center" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    type="number"
                                    placeholder="TYPE YOUR ANSWER"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="rounded-pill"
                                    size="lg"
                                />
                                <Button className="rounded-pill mt-5 w-100" onClick={checkAnswer}>
                                    CHECK
                                </Button>
                            </Form.Group>
                        </Form>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}
