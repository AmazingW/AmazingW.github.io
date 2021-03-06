---
layout: null
---

$(function() {
  var toc     = $('.toc-link'),
      sidebar = $('#sidebar'),
      main    = $('#main'),
      menu    = $('#menu'),
      x1, y1;

  // run this function after pjax load.
  var afterPjax = function() {
    // open links in new tab.
    $('#main').find('a').filter(function() {
      return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

    // discus comment.
    {% if site.disqus.shortname %}
    (function() {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = '//{{ site.disqus.shortname }}' + '.disqus.com/embed.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
    {% endif %}

    // your scripts
  };
  afterPjax();


  // NProgress
  NProgress.configure({ showSpinner: false });


  // Pjax
  $(document).pjax('#sidebar-avatar, .toc-link', '#main', {
    fragment: '#main',
    timeout: 3000
  });

  $(document).on({
    'pjax:click': function() {
      NProgress.start();
      main.removeClass('fadeIn');
    },
    'pjax:end': function() {
      afterPjax();
      NProgress.done();
      main.scrollTop(0).addClass('fadeIn');
      menu.add(sidebar).removeClass('open');
      {% if site.google_analytics %}
      ga('set', 'location', window.location.href);
      ga('send', 'pageview');
      {% endif %}
    }
  });


  // Tags Filter
  $('#sidebar-tags').on('click', '.sidebar-tag', function() {
    var filter = $(this).data('filter');
    if (filter === 'all') {
      toc.fadeIn(350);
    } else {
      toc.hide();
      $('.toc-link[data-tags~=' + filter + ']').fadeIn(350);
    }
    $(this).addClass('active').siblings().removeClass('active');
  });

  $("#search-input").keyup(function(){
    var value = $("#search-input")[0].value;
    var valueUpper = value.toUpperCase();

    if(valueUpper.length == 0) {
      toc.fadeIn(350);
      return;
    }

    toc.hide();
    var linkArr = $('.toc-link');

    for (var i=0;i<linkArr.length;i ++) {
      var tocBOM = linkArr[i];

      var bomTitle = tocBOM['pathname'];
      bomTitle = bomTitle.replace(/(^\s*)|(\s*$)/g, "");
      var postTitleUpper = (tocBOM['text']).toUpperCase();

      if(postTitleUpper.indexOf(valueUpper)>0) {
        try {
          var bomclassStr = '.toc-link[data-title~="' + bomTitle + '"]';
          $(bomclassStr).fadeIn(350);
        }catch(err) {
          console.log(bomTitle);
          console.log('error:',tocBOM);
        }

      }
    }
  });

  // Menu
  menu.on('click', function() {
    $(this).add(sidebar).toggleClass('open');
  });

});
