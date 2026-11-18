
document.addEventListener("DOMContentLoaded", function () {

    // Get Form
    const form = document.getElementById("eventForm");

    // Get Form Fields
    const eventName = document.getElementById("eventName");
    const category = document.getElementById("category");
    const description = document.getElementById("description");
    const eventDate = document.getElementById("eventDate");
    const eventTime = document.getElementById("eventTime");
    const venue = document.getElementById("venue");

    // Seat Type Checkboxes
    const regular = document.getElementById("regular");
    const premium = document.getElementById("premium");
    const vip = document.getElementById("vip");

    // Regular Seat Information
    const regularPrice = document.getElementById("regularPrice");
    const regularSeats = document.getElementById("regularSeats");

    // Premium Seat Information
    const premiumPrice = document.getElementById("premiumPrice");
    const premiumSeats = document.getElementById("premiumSeats");

    // VIP Seat Information
    const vipPrice = document.getElementById("vipPrice");
    const vipSeats = document.getElementById("vipSeats");

    const result = document.getElementById("result");


    // Check Form
    if (!form) {
        console.error("Event form not found.");
        return;
    }


    // Clear All Errors
    function clearErrors() {

        document.querySelectorAll(".error").forEach(function (error) {
            error.textContent = "";
        });

        document.querySelectorAll(
            "input, select, textarea"
        ).forEach(function (field) {

            field.classList.remove("errorBorder");
            field.classList.remove("successBorder");

        });

    }


    // Show Error Message
    function showError(field, errorId, message) {

        field.classList.add("errorBorder");
        field.classList.remove("successBorder");

        document.getElementById(errorId).textContent = message;

    }


    // Show Success Border
    function showSuccess(field) {

        field.classList.remove("errorBorder");
        field.classList.add("successBorder");

    }


    // Validate Seat Information
    function validateSeat(checkbox, price, seats, errorId, name) {

        if (!checkbox.checked) {
            return null;
        }

        let errors = [];
        let seatValid = true;

        const priceValue = price.value.trim();
        const seatValue = seats.value.trim();


        // Price Validation
        if (priceValue === "") {

            price.classList.add("errorBorder");
            price.classList.remove("successBorder");

            errors.push(name + " price is required.");

            seatValid = false;

        } else if (
            !Number.isFinite(Number(priceValue)) ||
            Number(priceValue) < 0
        ) {

            price.classList.add("errorBorder");
            price.classList.remove("successBorder");

            errors.push("Enter a valid " + name + " price.");

            seatValid = false;

        } else {

            showSuccess(price);

        }


        // Available Seats Validation
        if (seatValue === "") {

            seats.classList.add("errorBorder");
            seats.classList.remove("successBorder");

            errors.push(name + " seat quantity is required.");

            seatValid = false;

        } else if (
            !Number.isInteger(Number(seatValue)) ||
            Number(seatValue) < 1
        ) {

            seats.classList.add("errorBorder");
            seats.classList.remove("successBorder");

            errors.push("Enter a valid " + name + " seat quantity.");

            seatValid = false;

        } else {

            showSuccess(seats);

        }


        // Display Seat Errors
        document.getElementById(errorId).textContent =
            errors.join(" ");

        if (!seatValid) {
            return null;
        }


        // Return Seat Information
        return {

            name: name,

            price: Number(priceValue),

            seats: Number(seatValue)

        };

    }


    // Form Submit Event
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        result.textContent = "";

        let valid = true;


        // Event Name Validation
        if (eventName.value.trim() === "") {

            showError(
                eventName,
                "eventNameError",
                "Event name is required."
            );

            valid = false;

        } else {

            showSuccess(eventName);

        }


        // Category Validation
        if (category.value === "") {

            showError(
                category,
                "categoryError",
                "Please select a category."
            );

            valid = false;

        } else {

            showSuccess(category);

        }


        // Description Validation
        if (description.value.trim() === "") {

            showError(
                description,
                "descriptionError",
                "Description is required."
            );

            valid = false;

        } else {

            showSuccess(description);

        }


        // Event Date Validation
        if (eventDate.value === "") {

            showError(
                eventDate,
                "dateError",
                "Please select an event date."
            );

            valid = false;

        } else {

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const selectedDate = new Date(
                eventDate.value + "T00:00:00"
            );

            if (selectedDate < today) {

                showError(
                    eventDate,
                    "dateError",
                    "Event date cannot be in the past."
                );

                valid = false;

            } else {

                showSuccess(eventDate);

            }

        }


        // Event Time Validation
        if (eventTime.value === "") {

            showError(
                eventTime,
                "timeError",
                "Please select event time."
            );

            valid = false;

        } else {

            showSuccess(eventTime);

        }


        // Venue Validation
        if (venue.value === "") {

            showError(
                venue,
                "venueError",
                "Please select a venue."
            );

            valid = false;

        } else {

            showSuccess(venue);

        }


        // Seat Type Validation
        if (
            !regular.checked &&
            !premium.checked &&
            !vip.checked
        ) {

            document.getElementById("seatTypeError").textContent =
                "Please select at least one seat type.";

            valid = false;

        }


        // Validate Selected Seat Types
        let seatTypes = [];

        const regularData = validateSeat(
            regular,
            regularPrice,
            regularSeats,
            "regularError",
            "Regular"
        );

        const premiumData = validateSeat(
            premium,
            premiumPrice,
            premiumSeats,
            "premiumError",
            "Premium"
        );

        const vipData = validateSeat(
            vip,
            vipPrice,
            vipSeats,
            "vipError",
            "VIP"
        );


        if (regular.checked) {

            if (regularData === null) {
                valid = false;
            } else {
                seatTypes.push(regularData);
            }

        }

        if (premium.checked) {

            if (premiumData === null) {
                valid = false;
            } else {
                seatTypes.push(premiumData);
            }

        }

        if (vip.checked) {

            if (vipData === null) {
                valid = false;
            } else {
                seatTypes.push(vipData);
            }

        }


        // Final Result
        if (valid) {

            // Create Event Object
            const eventData = {

                id: Date.now().toString(),

                name: eventName.value.trim(),

                category: category.value,

                description: description.value.trim(),

                date: eventDate.value,

                time: eventTime.value,

                venue: venue.value,

                seatTypes: seatTypes

            };


            // Get Previously Saved Events
            let savedEvents = [];

            try {

                const previousEvents =
                    localStorage.getItem("organizerEvents");

                if (previousEvents !== null) {

                    savedEvents = JSON.parse(previousEvents);

                    if (!Array.isArray(savedEvents)) {

                        throw new Error("Invalid saved event data.");

                    }

                }

            } catch (error) {

                result.textContent =
                    "Unable to read saved events.";

                result.style.color = "red";

                console.error(error);

                return;

            }


            // Add New Event
            savedEvents.push(eventData);


            // Save Events in Local Storage
            try {

                localStorage.setItem(
                    "organizerEvents",
                    JSON.stringify(savedEvents)
                );

            } catch (error) {

                result.textContent =
                    "Unable to save event.";

                result.style.color = "red";

                console.error(error);

                return;

            }


            // Show Success Message
            result.textContent =
                "Event created successfully: " + eventData.name;

            result.style.color = "green";


            // Reset Form
            form.reset();

            clearErrors();

        }

    });


    // Reset Button Event
    form.addEventListener("reset", function () {

        setTimeout(function () {

            clearErrors();

        }, 0);

    });

});
