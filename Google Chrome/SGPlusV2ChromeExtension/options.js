
        // Saves options to localStorage.
        function save_options() {

            var gridview = $('#gridview').prop('checked');
            var shorten_comments = $('#shorten_comments').prop('checked');
            var scrolling_sidebar = $('#scrolling_sidebar').prop('checked');
            var fixed_navbar = $('#fixed_navbar').prop('checked');

            chrome.storage.sync.set({
                'gridview': gridview,
                'shorten_comments' : shorten_comments,
                'scrolling_sidebar' : scrolling_sidebar,
                'fixed_navbar' : fixed_navbar
            });

            // Update status to let user know options were saved.
            $("#status").stop(true,true).fadeIn().delay(600).fadeOut();

        }

        function restore_options() {
            chrome.storage.sync.get(function(settings){
                if(settings.gridview === undefined) { settings.gridview = false; chrome.storage.sync.set({'gridview': settings.gridview}); }
                if(settings.shorten_comments === undefined) { settings.shorten_comments = false; chrome.storage.sync.set({'shorten_comments': settings.shorten_comments});}
                if(settings.scrolling_sidebar === undefined) { settings.scrolling_sidebar = false; chrome.storage.sync.set({'scrolling_sidebar': settings.scrolling_sidebar}); }
                if(settings.fixed_navbar === undefined) { settings.fixed_navbar = false; chrome.storage.sync.set({'fixed_navbar': settings.fixed_navbar}); }

                $('#gridview').prop('checked', settings.gridview);
                $('#shorten_comments').prop('checked', settings.shorten_comments);
                $('#scrolling_sidebar').prop('checked', settings.scrolling_sidebar);
                $('#fixed_navbar').prop('checked', settings.fixed_navbar);
            });
        }
        document.addEventListener('DOMContentLoaded', restore_options);
        document.querySelector('#save').addEventListener('click', save_options);