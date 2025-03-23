$(document).ready(function () {
    // Your API key
    const apiKey = '7iAQpx+dLyJBwzA1nm95Ow==cOnMBaAFodnPH2d0';

    // Elements
    const getRiddleBtn = $('#getRiddleBtn');
    const riddleText = $('#riddle-text');
    const answerInput = $('#answer-input');
    const feedback = $('#feedback');
    const submitBtn = $('#submitBtn');
    const answerBtn = $('#answerBtn');
    const giveAnotherBtn = $('#giveAnotherBtn');
    const endButton = $('#endButton');

    let currentRiddle;

    // Function to get a random riddle from the API
    function getRiddle() {
        // Display the logo and "Give me a riddle" button on the 1st page
        getRiddleBtn.show();
        riddleText.hide();
        answerInput.hide();
        submitBtn.hide();
        answerBtn.hide();
        giveAnotherBtn.hide();
        endButton.hide();

        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/riddles',
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function (result) {
                // Display the riddle only after clicking "Give me a riddle" button
                currentRiddle = result[0];
                feedback.text('');
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }

    // Initial setup
    getRiddle();

    // "Give me a riddle" button click event
    getRiddleBtn.click(function () {
        // Transition to the 2nd page
        getRiddleBtn.hide();
        riddleText.text(currentRiddle.question).show();
        answerInput.show();
        submitBtn.show();
        answerBtn.show();
        giveAnotherBtn.show();
        endButton.show();
    });

    // "Submit" button click event
    submitBtn.click(submitAnswer);

    // "Answer" button click event
    answerBtn.click(function () {
        feedback.text('Answer: ' + currentRiddle.answer).css('color', '#3498db'); // Blue color for answer feedback
    });

    // "Give me another" button click event
    giveAnotherBtn.click(generateNewRiddle);

    // "End" button click event
    endButton.click(function () {
        // Hide the input elements
        riddleText.hide();
        answerInput.hide();
        submitBtn.hide();
        answerBtn.hide();
        giveAnotherBtn.hide();
        endButton.hide();

        // Reset input, feedback, and riddle text
        answerInput.val('');
        feedback.text('');
        riddleText.hide();

        // Display the logo and "Give me a riddle" button on the 1st page
        getRiddleBtn.show();
    });

    // Enter key functionality
    answerInput.keypress(function (event) {
        if (event.which === 13) {
            submitAnswer();
        }
    });

    // Function to handle submitting the answer
    function submitAnswer() {
        const userAnswer = answerInput.val().toLowerCase();
        const actualAnswer = currentRiddle.answer.toLowerCase();

        // Check the user's answer
        if (userAnswer === actualAnswer) {
            feedback.text('Correct!').css('color', '#4CAF50'); // Green color for correct feedback
        } else {
            feedback.text('Incorrect!').css('color', '#FF0000'); // Red color for incorrect feedback
        }
    }

    // Function to generate a new riddle
    function generateNewRiddle() {
        // Call the API to get a new riddle
        $.ajax({
            method: 'GET',
            url: 'https://api.api-ninjas.com/v1/riddles',
            headers: { 'X-Api-Key': apiKey },
            contentType: 'application/json',
            success: function (result) {
                // Display the new riddle
                currentRiddle = result[0];
                riddleText.text(currentRiddle.question);
                answerInput.val('');
                feedback.text('');
                answerBtn.show(); // Make sure to show the Answer button after giving another riddle
            },
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        });
    }
});
