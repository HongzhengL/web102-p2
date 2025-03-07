import React from "react";
import { Card, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FlashCard = ({ card, isFlipped, onClick, difficulty }) => {
    // Set different background and border styles based on difficulty
    const getDifficultyVariant = (difficulty) => {
        if (difficulty === "Easy") {
            return "success";
        }
        if (difficulty === "Medium") {
            return "warning";
        }
        if (difficulty === "Hard") {
            return "danger";
        }
        return "light";
    };

    const variant = getDifficultyVariant(difficulty);

    // Custom styles for the card
    const cardStyle = {
        minHeight: "200px",
        cursor: "pointer",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
    };

    const contentStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "20px",
        textAlign: "center",
    };

    return (
        <Card
            bg={`${variant}-subtle`}
            border={variant}
            style={cardStyle}
            onClick={onClick}
            className="mb-4 shadow"
        >
            <Card.Body style={contentStyle}>
                <div className="position-absolute top-0 end-0 m-2">
                    <Badge bg="secondary" className="me-1">
                        {card.category}
                    </Badge>
                    <Badge bg={variant}>{card.difficulty}</Badge>
                </div>

                <div className="my-4">
                    <h3 className="fs-4 fw-medium">
                        {isFlipped ? card.answer : card.question}
                    </h3>
                </div>

                <small className="text-muted mt-3">
                    {isFlipped
                        ? "Click to see question"
                        : "Click to see answer"}
                </small>
            </Card.Body>
        </Card>
    );
};

export default FlashCard;
