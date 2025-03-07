import React, { useState } from "react";
import { BookOpen, ArrowRight, Shuffle } from "lucide-react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
    };

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
                            onClick={handleRandomCard}
                            className="d-flex align-items-center gap-2"
                        >
                            Next Card
                            <ArrowRight size={18} />
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
