
        // Saves options to localStorage.
        function save_options() {

            var gridview = document.getElementById('gridview');
            var shorten_comments = document.getElementById('shorten_comments');
            var scrolling_sidebar = document.getElementById('scrolling_sidebar');
            var fixed_navbar = document.getElementById('fixed_navbar');

            localStorage["gridview"] = gridview.checked;
            localStorage["shorten_comments"] = shorten_comments.checked;
            localStorage["scrolling_sidebar"] = scrolling_sidebar.checked;
            localStorage["fixed_navbar"] = fixed_navbar.checked;

            // Update status to let user know options were saved.
            var status = document.getElementById("status");
            status.innerHTML = "Options Saved.";
            setTimeout(function () {
                status.innerHTML = "";
            }, 750);
        }

        // Restores select box state to saved value from localStorage.
        function restore_options() {
            var gridview = document.getElementById('gridview');
            var shorten_comments = document.getElementById('shorten_comments');
            var scrolling_sidebar = document.getElementById('scrolling_sidebar');
            var fixed_navbar = document.getElementById('fixed_navbar');
            
            gridview.checked = localStorage["gridview"];
            shorten_comments.checked = localStorage["shorten_comments"];
            scrolling_sidebar.checked = localStorage["scrolling_sidebar"];
            fixed_navbar.checked = localStorage["fixed_navbar"];
        }
        document.addEventListener('DOMContentLoaded', restore_options);
        document.querySelector('#save').addEventListener('click', save_options);