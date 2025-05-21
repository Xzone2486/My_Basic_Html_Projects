// Detect current location and set in input field
document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.querySelector("input[placeholder='Jabalpur']");
    const detectBtn = document.querySelector(".sc-cNnxps");

    if (detectBtn) {
        detectBtn.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                            .then(response => response.json())
                            .then(data => {
                                locationInput.value = data.address.city || data.address.town || "Location detected";
                            })
                            .catch(() => {
                                locationInput.value = "Unable to fetch city";
                            });
                    },
                    (error) => {
                        alert("Location access denied.");
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        });
    }
});
