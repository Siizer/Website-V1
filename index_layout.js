
            //---- Reload page on pressing Home 
            const reloadBtn = document.getElementById("headerHome");
            reloadBtn.addEventListener("click", function() {
                location.reload();
                });

            // Check if the visit count exists in localStorage
            if (localStorage.getItem('visitCount')) {
                // Get the current visit count from localStorage
                var count = parseInt(localStorage.getItem('visitCount'));
                // Increment the count by 1
                count++;
                // Update the visit count in localStorage
                localStorage.setItem('visitCount', count);
            } else {
                // If the visit count doesn't exist, set it to 1
                localStorage.setItem('visitCount', 1);
            }

            // Display the visit count on your webpage
            var visitCount = localStorage.getItem('visitCount');
            var displaycount = d3.select("#visitCount");
            displaycount.append("text")
                        .text(visitCount+" ");

            window.addEventListener("DOMContentLoaded", function() {
                const headerHeight = document.querySelector("header").clientHeight;
                const carousel = document.querySelector("#carousel");
                const remainingHeight = window.innerHeight - headerHeight;
                carousel.style.height = `${remainingHeight}px`;
            });

/*            // To disable right click
            document.addEventListener('contextmenu', event => event.preventDefault());

             // To disable F12 options
            document.onkeypress = function (event) {
            event = (event || window.event);
            if (event.keyCode == 123) {
            return false;
            }
            }
            document.onmousedown = function (event) {
            event = (event || window.event);
            if (event.keyCode == 123) {
            return false;
            }
            }
            document.onkeydown = function (event) {
            event = (event || window.event);
            if (event.keyCode == 123) {
            return false;
            }
            }  */

