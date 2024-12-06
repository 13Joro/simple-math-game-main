import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Game3() {
    let playerName = localStorage.getItem("playerName");
    const navigate = useNavigate();

    const [randomNum1, setRandomNum1] = useState(0);
    const [randomNum2, setRandomNum2] = useState(0);
    const [answer, setAnswer] = useState("");
    const [stage, setStage] = useState(1);
    const [score, setScore] = useState(0);
    const [operation, setOperation] = useState("+");
    const [timer, setTimer] = useState(10); // Timer starts at 10 seconds
    const [isTimerActive, setIsTimerActive] = useState(true); // Timer activity state

    useEffect(() => {
        if (!playerName) {
            navigate("/"); // Redirect to the welcome page if no player name
        }

        generateRandomNum(); // Initialize the first numbers
    }, []); // Run only once on mount

    useEffect(() => {
        let interval;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev === 1) {
                        clearInterval(interval);
                        handleTimeUp(); // Timer ends
                        return 10; // Reset timer
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval); // Cleanup on unmount
    }, [isTimerActive]);

    const generateRandomNum = () => {
        const num1 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        const num2 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;

        setRandomNum1(num1);
        setRandomNum2(num2);

        // Adjust operation based on stage
        if (stage <= 3) setOperation("+");
        else if (stage <= 6) setOperation("-");
        else if (stage <= 8) setOperation("*");
        else setOperation("/");

        // Reset timer
        setTimer(10);
        setIsTimerActive(true);
    };

    const handleTimeUp = () => {
        setIsTimerActive(false);
        Swal.fire({
            title: "TIME'S UP!",
            text: "You didn't answer in time.",
            icon: "error",
        }).then(() => {
            moveToNextStage();
        });
    };

    const checkAnswer = () => {
        let correctAnswer;
        switch (operation) {
            case "+":
                correctAnswer = randomNum1 + randomNum2;
                break;
            case "-":
                correctAnswer = randomNum1 - randomNum2;
                break;
            case "*":
                correctAnswer = randomNum1 * randomNum2;
                break;
            case "/":
                correctAnswer = randomNum1 / randomNum2;
                break;
            default:
                return;
        }

        if (Number(answer) === correctAnswer) {
            Swal.fire({
                title: "CORRECT!",
                text: "Well done!",
                icon: "success",
            }).then(() => {
                setScore((prev) => prev + 10);
                moveToNextStage();
            });
        } else {
            Swal.fire({
                title: "WRONG!",
                text: "Try again!",
                icon: "error",
            }).then(() => {
                moveToNextStage();
            });
        }
    };

    const moveToNextStage = () => {
        if (stage < 10) {
            setStage((prev) => prev + 1);
            setAnswer(""); // Reset input field
            generateRandomNum(); // Generate new numbers
        } else {
            Swal.fire({
                title: "GAME OVER!",
                text: "You completed all stages!",
                icon: "success",
            });
            retryGame();
        }
    };

    const retryGame = () => {
        setScore(0);
        setStage(1);
        setAnswer("");
        setTimer(10);
        setIsTimerActive(true);
        generateRandomNum();
    };

    return (
        <Container fluid className="d-flex flex-column m-0 p-0 bg-warning p-5">
            {/* Header */}
            <Container fluid className="d-flex">
                <h1 className="me-auto">Welcome, {playerName}!</h1>
                <h1>SCORE {score}</h1>
            </Container>

            {/* Game Content */}
            <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
                <Container fluid className="row d-flex align-items-center justify-content-center">
                    <Container className="col-6 d-flex align-items-center justify-content-center flex-column border border-dark p-5 rounded-3 shadow" data-aos="flip-left">
                        {/* Stage Display */}
                         {/* Timer with Progress Bar */}
                         <Container className="mt-4" style={{ position: 'absolute', width: '15%', height: '100%', marginLeft: '600px' }}>
                            <CircularProgressbar
                                value={timer}
                                maxValue={10}
                                text={`${timer}s`}
                                styles={buildStyles({
                                    textSize: "16px",
                                    pathColor: `rgba(62, 152, 199, ${timer / 10})`,
                                    textColor: "#3e98c7",
                                    trailColor: "#d6d6d6",
                                    backgroundColor: "#f8f9fa",
                                })}
                            />
                        </Container>
                        <h1 className="display-6 fw-bold mb-4">STAGE {stage}</h1>

                        {/* Numbers and Operation */}
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

                       

                        {/* Answer Input */}
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
                                <Button className="rounded-pill mt-1 w-100" onClick={retryGame}>
                                    RETRY
                                </Button>
                            </Form.Group>
                        </Form>
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}
