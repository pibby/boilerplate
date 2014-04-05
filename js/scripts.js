jQuery(document).ready(function($){

// Convert page navigation to dropdown menu on smaller screens
        $(function() {
                $("<select />").appendTo("#navigation .wrapper"); 

                $("<option />", 
                { 
                   "selected": "selected", 
                   "value"   : "", 
                   "text"    : "Page Menu" // default <option> to display in dropdown 

                }).appendTo("#navigation .wrapper select"); 

                $("#navigation .wrapper a").each(function()
                { 
                 var el = $(this); 
                 $("<option />", { 
                     "value"   : el.attr("href"), 
                     "text"    : el.text() 
                 }).appendTo("#navigation .wrapper select"); 
                });

                $("#navigation .wrapper select").change(function() 
                { 
                  window.location = $(this).find("option:selected").val(); 
                }); 
        });

// Smooth scrolling and floating nav bar
        // Scroll
        $('a[href^="#"]').on('click',function (e) {
            e.preventDefault();

            var target = this.hash,
            $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $("#logos").height()
            }, 1000);
        });

        // Smooth scroll on load
        $(window).load(function(){
            var hashtarget = window.location.hash,
            $hashtarget = $(hashtarget);
            $('html, body').stop().animate({
                'scrollTop': $hashtarget.offset().top - 119
            }, 1000);
        });

        // Smooth scroll for mobile using select dropdown
        $(document).on('change', '#navigation select', function(){
                var target = $(this);
                var hash = $(this).val();
                var destination = $(hash).offset().top - $("#logos").height();

                stopAnimatedScroll();

                $('#navigation select').removeClass('on');
                target.parent().addClass('on');

                 $('html, body').stop().animate({ 
                        scrollTop: destination
                }, 400);
                return false;
        });

        function stopAnimatedScroll(){
                if ( $('*:animated').length > 0 ) { $('*:animated').stop(); }
        }
        if(window.addEventListener) {
            document.addEventListener('DOMMouseScroll', stopAnimatedScroll, false);
        }
        document.onmousewheel = stopAnimatedScroll;

// Highlight current page menu item as user scrolls
        var lastId,
            pageMenu = $(".nav"),
            pageMenuHeight = pageMenu.outerHeight() + 126,
            // All list items
            menuItems = pageMenu.find("a"),
            // Anchors corresponding to menu items
            scrollItems = menuItems.map(function(){
              var item = $($(this).attr("href"));
              if (item.length) { return item; }
            });

        // Bind to scroll
        $(window).scroll(function(){
           // Get container scroll position
           var fromTop = $(this).scrollTop()+pageMenuHeight;
           
           // Get id of current scroll item
           var cur = scrollItems.map(function(){
             if ($(this).offset().top < fromTop)
               return this;
           });
           // Get the id of the current element
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           
           if (lastId !== id) {
               lastId = id;
               // Set/remove active class
               menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#"+id+"]").parent().addClass("active");
           }                   
        });

// Scroll to Top
        $(window).scroll(function(){
              if ($(this).scrollTop() < 100) {
                  $('.scrollup').hide();
              } else {
                  $('.scrollup').show().animate({opacity: 1});
              }
          });

          $('.scrollup').click(function(){
              $("html, body").animate({ scrollTop: 0 }, 600);
              return false;
          });
          
}); // end document ready