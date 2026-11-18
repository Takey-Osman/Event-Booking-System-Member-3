
// Booking Dummy Data

const bookings = [

    {
        id: "BK101",
        attendee: "Rahim Ahmed",
        event: "Music Festival 2026",
        seat: "VIP",
        tickets: 2,
        amount: 4000,
        status: "Confirmed"
    },

    {
        id: "BK102",
        attendee: "Nusrat Jahan",
        event: "Tech Fest 2026",
        seat: "Regular",
        tickets: 1,
        amount: 500,
        status: "Confirmed"
    },

    {
        id: "BK103",
        attendee: "Tanvir Hasan",
        event: "Face of Twelve",
        seat: "Premium",
        tickets: 2,
        amount: 2000,
        status: "Pending"
    },

    {
        id: "BK104",
        attendee: "Sadia Islam",
        event: "Art Exhibition",
        seat: "Regular",
        tickets: 3,
        amount: 1200,
        status: "Confirmed"
    },

    {
        id: "BK105",
        attendee: "Fahim Ahmed",
        event: "Tech Fest 2026",
        seat: "VIP",
        tickets: 1,
        amount: 2000,
        status: "Confirmed"
    }

];


// Display Booking Table

let bookingTable = document.getElementById("bookingTable");

let totalTickets = 0;
let totalSales = 0;
let confirmedCount = 0;

bookings.forEach(function(booking) {

    let row = document.createElement("tr");

    let statusClass = booking.status === "Confirmed"
        ? "confirmed"
        : "pending";

    row.innerHTML = `
        <td>${booking.id}</td>
        <td>${booking.attendee}</td>
        <td>${booking.event}</td>
        <td>${booking.seat}</td>
        <td>${booking.tickets}</td>
        <td>৳${booking.amount.toLocaleString()}</td>
        <td><span class="status ${statusClass}">
            ${booking.status}
        </span></td>
    `;

    bookingTable.appendChild(row);


    // Calculate confirmed bookings only

    if (booking.status === "Confirmed") {

        totalTickets += booking.tickets;

        totalSales += booking.amount;

        confirmedCount++;

    }

});


// Update Statistics Cards

document.getElementById("totalBookings").textContent =
    bookings.length;

document.getElementById("totalTickets").textContent =
    totalTickets;

document.getElementById("totalSales").textContent =
    "৳" + totalSales.toLocaleString();

document.getElementById("confirmedBookings").textContent =
    confirmedCount;


// Event Sales Summary Data

const salesSummary = [

    {
        event: "Music Festival 2026",
        tickets: 2,
        revenue: 4000
    },

    {
        event: "Tech Fest 2026",
        tickets: 2,
        revenue: 2500
    },

    {
        event: "Art Exhibition",
        tickets: 3,
        revenue: 1200
    }

];


// Display Sales Summary Table

let salesTable = document.getElementById("salesTable");

salesSummary.forEach(function(sale) {

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${sale.event}</td>
        <td>${sale.tickets}</td>
        <td>৳${sale.revenue.toLocaleString()}</td>
    `;

    salesTable.appendChild(row);

});
