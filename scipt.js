// GridGuard AI - Frontend Logic

// IMPORTANT:
// Replace this URL later with your actual deployed FastAPI endpoint.
const API_URL = "https://grid-guard-ai.onrender.com/predict";

// Get elements from the dashboard
const conditionElement = document.getElementById("aiStatus");
const reasonElement = document.getElementById("reason");
const recommendationElement = document.getElementById("recommendation");
// Update dashboard with AI response
function updateDashboard(data) {

    if (conditionElement) {
        conditionElement.textContent = data.status || "N/A";
    }

    if (confidenceElement) {
        confidenceElement.textContent =
            data.confidence !== undefined
                ? `${data.confidence}%`
                : "N/A";
    }

    if (healthScoreElement) {
        healthScoreElement.textContent =
            data.health_score !== undefined
                ? data.health_score
                : "N/A";
    }

    if (riskElement) {
        riskElement.textContent = data.risk_level || "N/A";
    }

    if (recommendationElement) {
        recommendationElement.textContent =
            data.recommendation || "No recommendation available.";
    }
}

// Test the AI backend
async function getPrediction(sensorData) {

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(sensorData)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        console.log("GridGuard AI Response:", data);

        updateDashboard(data);

    } catch (error) {

        console.error("GridGuard API Error:", error);

        if (conditionElement) {
            conditionElement.textContent = "API Offline";
        }

        if (recommendationElement) {
            recommendationElement.textContent =
                "Unable to connect to GridGuard AI backend.";
        }
    }
}


// Sample transformer data
// We will replace this with your real API-connected data.
const sampleSensorData = {

    temperature: 82,
    voltage: 10.9,
    current: 45,
    load: 92,
    vibration: 6.5,
    humidity: 75,
    oil_temperature: 88

};


// Run a test prediction
// REMOVE OR MODIFY THIS AFTER API CONNECTION IS CONFIRMED.
function testGridGuardAI() {

    console.log("Sending test data to GridGuard AI...");

    getPrediction(sampleSensorData);
}
