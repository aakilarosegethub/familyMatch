import { API_BASE_URL, API_KEY } from '../../config';

export const fetchQuestions = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/new-question`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

export const submitAnswers = async (answers) => {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_KEY
            },
            body: JSON.stringify(answers)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting answers:', error);
        throw error;
    }
}; 