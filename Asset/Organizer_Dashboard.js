
// Wait until the HTML page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Get the date element from HTML
    const dateElement = document.getElementById("currentDate");

    // Get today's date
    const today = new Date();

    // Format the date
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    // Display the date on Dashboard
    dateElement.textContent = today.toLocaleDateString("en-GB", options);

});
