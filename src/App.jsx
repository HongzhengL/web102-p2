import React, { useRef, useState } from "react";
import { BookOpen, ArrowRight, Shuffle, ArrowLeft } from "lucide-react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FlashCard from "./component/FlashCard";

const flashcardSets = {
    title: "Computer Science Trivia",
    description:
        "Test your knowledge of computer science concepts and history!",
    cards: [
        {
            id: 1,
            question: "Who is considered the first computer programmer?",
            answer: "Ada Lovelace",
            category: "History",
            difficulty: "Medium",
        },
        {
            id: 2,
            question: "What does CPU stand for?",
            answer: "Central Processing Unit",
            category: "Hardware",
            difficulty: "Easy",
        },
        {
            id: 3,
            question: "What programming paradigm is React based on?",
            answer: "Functional Programming",
            category: "Web Development",
            difficulty: "Medium",
        },
        {
            id: 4,
            question: "What is the time complexity of binary search?",
            answer: "O(log n)",
            category: "Algorithms",
            difficulty: "Hard",
        },
        {
            id: 5,
            question: "What year was JavaScript created?",
            answer: "1995",
            category: "History",
            difficulty: "Medium",
        },
        {
            id: 6,
            question: "What does HTML stand for?",
            answer: "HyperText Markup Language",
            category: "Web Development",
            difficulty: "Easy",
        },
        {
            id: 7,
            question: "What is the most widely used version control system?",
            answer: "Git",
            category: "Tools",
            difficulty: "Easy",
        },
        {
            id: 8,
            question: "What is the purpose of a firewall in computer networks?",
            answer: "To monitor and filter incoming and outgoing network traffic",
            category: "Networking",
            difficulty: "Medium",
        },
    ],
};

function App() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const { title, description, cards } = flashcardSets;
    const userInput = useRef();
    const [firstAttempt, setFirstAttempt] = useState(true);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRandomCard = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * cards.length);
        } while (randomIndex === currentCardIndex && cards.length > 1);

        setCurrentCardIndex(randomIndex);
        setIsFlipped(false);
        setFirstAttempt(true);
        setAnswerIsCorrect(false);
        userInput.current.value = "";
    };

    const handlePrevCard = () => {
        setCurrentCardIndex(prev => (prev - 1 + cards.length) % cards.length);
        setIsFlipped(false);
        setFirstAttempt(true);
        setAnswerIsCorrect(false);
        userInput.current.value = "";
    }

    const handleNextCard = () => {
        setCurrentCardIndex((prev) => (prev + 1) % cards.length);
        setIsFlipped(false);
        setFirstAttempt(true);
        setAnswerIsCorrect(false);
        userInput.current.value = "";
    }

    const checkAnswer = (e) => {
        e?.preventDefault();

        setFirstAttempt(false);

        if (userInput.current.value.toLowerCase() === cards[currentCardIndex].answer.toLowerCase()) {
            setAnswerIsCorrect(true);
        } else {
            setAnswerIsCorrect(false);
        }
    }

    return (
        <div className="bg-light py-4" style={{ minHeight: "100vh" }}>
            <Container>
                <Row className="mb-4 text-center">
                    <Col>
                        <h1 className="display-5 fw-bold d-flex align-items-center justify-content-center gap-2">
                            <BookOpen size={32} color="#0d6efd" />
                            {title}
                        </h1>
                        <p className="lead">{description}</p>
                        <p className="text-muted">
                            Total cards: {cards.length}
                        </p>
                    </Col>
                </Row>

                <Row className="justify-content-center mb-4">
                    <Col xs={12} md={8} lg={6}>
                        <FlashCard
                            card={cards[currentCardIndex]}
                            isFlipped={isFlipped}
                            onClick={handleFlip}
                            difficulty={cards[currentCardIndex].difficulty}
                        />
                    </Col>
                </Row>

                <Form onSubmit={checkAnswer}>
                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Form.Label column sm="2" className="mb-3" htmlFor="answer">
                            Guess the answer here:
                        </Form.Label>
                        <Col sm="4">
                            {
                                firstAttempt ? (
                                    <Form.Control
                                        type="text"
                                        className="mb-3"
                                        placeholder="Enter your answer"
                                        style={{ border: "3px solid lightgray" }}
                                        ref={userInput}
                                    />
                                ) : (
                                    answerIsCorrect ? (
                                        <Form.Control
                                            type="text"
                                            className="mb-3"
                                            placeholder="Enter your answer"
                                            style={{ border: "3px solid blue" }}
                                            ref={userInput}
                                        />
                                    ) : (
                                        <Form.Control
                                            type="text"
                                            className="mb-3"
                                            placeholder="Enter your answer"
                                            style={{ border: "3px solid red" }}
                                            ref={userInput}
                                        />
                                    )
                                )
                            }
                        </Col>
                        <Col sm="2">
                            <Button variant="primary" type="submit" className="mb-4">
                                Check Answer
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>

                <Row className="justify-content-center">
                    <Col
                        xs={12}
                        md={8}
                        lg={6}
                        className="d-flex justify-content-center gap-3"
                    >
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handlePrevCard}
                            className="d-flex align-items-center gap-2"
                        >
                            <ArrowLeft size={18} />
                            Previous Card
                        </Button>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleNextCard}
                            className="d-flex align-items-center gap-2"
                        >
                            Next Card
                            <ArrowRight size={18} />
                        </Button>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={handleRandomCard}
                            className="d-flex align-items-center gap-2"
                        >
                            Random Card
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="text-center">
                        <small className="text-muted">
                            Card {currentCardIndex + 1} of {cards.length}
                        </small>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
