// Function to store selected movie details and navigate to booking page
function selectMovie(title, poster) {
    localStorage.setItem("selectedMovie", title);
    localStorage.setItem("selectedPoster", poster);  // Store only filename
    window.location.href = "booking.html";  // Redirect to seat selection page
}

// Function to handle seat selection on booking page
document.addEventListener("DOMContentLoaded", function () {
    let movieTitle = localStorage.getItem("selectedMovie");
    let moviePoster = localStorage.getItem("selectedPoster");

    // Check if we are on booking.html
    if (document.getElementById("movieTitle")) {
        if (movieTitle) {
            document.getElementById("movieTitle").innerText = movieTitle;
        }

        if (moviePoster) {
            document.getElementById("moviePoster").src = "images/" + moviePoster;
        }

        // Generate seats dynamically
        let seatsContainer = document.querySelector(".seats");
        for (let i = 1; i <= 50; i++) {
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.innerText = i; // Seat number
            seat.addEventListener("click", function () {
                seat.classList.toggle("selected"); // Toggle selection
            });
            seatsContainer.appendChild(seat);
        }
    }

    // Check if we are on ticket.html
    if (document.getElementById("ticketMovieTitle")) {
        let selectedSeats = localStorage.getItem("selectedSeats") || "None";
        if (movieTitle) {
            document.getElementById("ticketMovieTitle").innerText = movieTitle;
        }
        if (moviePoster) {
            document.getElementById("ticketPoster").src = "images/" + moviePoster;
        }
        document.getElementById("ticketSeats").innerText = selectedSeats;
    }
});

// Function to confirm booking and redirect to ticket page
function confirmBooking() {
    let selectedSeats = [...document.querySelectorAll(".seat.selected")].map(seat => seat.innerText);

    if (selectedSeats.length === 0) {
        alert("Please select at least one seat!");
        return;
    }

    localStorage.setItem("selectedSeats", selectedSeats.join(", ")); // Store selected seats
    window.location.href = "ticket.html"; // Redirect to ticket page
}