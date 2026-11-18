
// Final Result
if (valid) {

    // Create event object
    let eventData = {

        id: Date.now().toString(),

        name: eventName.value.trim(),

        category: category.value,

        description: description.value.trim(),

        date: eventDate.value,

        time: eventTime.value,

        venue: venue.value,

        seatTypes: []

    };


    // Save Regular Seat Information
    if (regular.checked) {

        eventData.seatTypes.push({

            name: "Regular",

            price: Number(document.getElementById("regularPrice").value),

            seats: Number(document.getElementById("regularSeats").value)

        });

    }


    // Save Premium Seat Information
    if (premium.checked) {

        eventData.seatTypes.push({

            name: "Premium",

            price: Number(document.getElementById("premiumPrice").value),

            seats: Number(document.getElementById("premiumSeats").value)

        });

    }


    // Save VIP Seat Information
    if (vip.checked) {

        eventData.seatTypes.push({

            name: "VIP",

            price: Number(document.getElementById("vipPrice").value),

            seats: Number(document.getElementById("vipSeats").value)

        });

    }


    // Get previously saved events
    let savedEvents = JSON.parse(
        localStorage.getItem("organizerEvents")
    ) || [];


    // Add new event
    savedEvents.push(eventData);


    // Save events in localStorage
    localStorage.setItem(
        "organizerEvents",
        JSON.stringify(savedEvents)
    );


    // Show success message
    document.getElementById("result").innerHTML =
        "Event created successfully: " + eventData.name;


    // Reset form
    form.reset();

    document.querySelectorAll("input, select, textarea").forEach(function(field) {

        field.classList.remove("successBorder");

        field.classList.remove("errorBorder");

    });

}
