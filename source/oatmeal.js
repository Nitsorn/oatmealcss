// actual
(function(a){if(typeof define==="function"&&define.amd){define(["jquery"],a);
}else{a(jQuery);}}(function(a){a.fn.addBack=a.fn.addBack||a.fn.andSelf;a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';
}var f={absolute:false,clone:false,includeMargin:false,display:"block"};var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";
e=e.clone().attr("style",m).appendTo("body");};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().addBack().filter(":hidden");
d+="visibility: hidden !important; display: "+i.display+" !important; ";if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);
var n=m.attr("style");g.push(n);m.attr("style",n?n+";"+d:d);});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");
}else{o.attr("style",n);}});};}h();var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();j();return k;}});}));


$(document).ready(function(){

  // navigation
  // still need to resize the wrapper to 80%
  // icon for mobile toggle
  setUpNav();

  $(window).resize(function(){
    setUpNav();
  })

  function setUpNav(){
    if ($('body').find('.navigation').length && !$('body').find('.navigation-toggle').length){
      $('body').append("<div class='nav on-top shadowed fixed gap image navigation-toggle' id='oatmeal-nav'></div>")
    }
    if (!$('body').find('.navigation-overlay').length){
      $('body').append("<div class='navigation-overlay'></div>")
    }
    if (window.innerWidth < 950) {
      if ($('.navigation').css('left') == '-260px' || !$('.navigation').hasClass('small')) {
        $('.navigation').addClass('small');
        $('.navigation-toggle').css('display','block');
        hideNav();
      } else {
        showNav();
      }
    } else {
      $('.navigation').removeClass('small');
      $('.navigation-toggle').css('display','none');
      $('.navigation-overlay').css('display','none').addClass('invisible');
      showNav();
    }
  }

  function showNav(){
    $('.navigation').css('left','0');
    if (window.innerWidth < 950) {
      $('.navigation-overlay').css('display','block').removeClass('invisible');
    }
  }

  function hideNav(){
    if (window.innerWidth < 950) {
      $('.navigation').css('left','-260px');
      $('.navigation-overlay').css('display','none').addClass('invisible');
    }
  }

  function toggle(){
    if ($('.navigation').css('left') == '0px') {
      hideNav()
    }
    if ($('.navigation').css('left') == '-260px') {
      showNav()
    }
  }

  $('.navigation-toggle').click(function(){
    toggle();
  })
  $('.navigation').siblings().click(function(){
    hideNav();
  })
  $('.navigation-overlay').click(function(){
    if ($('.navigation').css('left') == '0px') {
      hideNav();
    }
  })

  // Dropdowns
  // these are downdown menus, not select
  // NOTE still need on blur when clicking somewhere else

  $('.dropdown-title').click(function(){
    toggleDropdown($(this).parent());
  })

  $('.dropdown-item').click(function(){
    toggleDropdown($(this).parent().parent(), $(this));
  })

  function toggleDropdown(target) {
    var titleHeight = target.find('.dropdown-title').outerHeight() - 1;
    var itemHeight = target.find('.dropdown-item').outerHeight() - 1;
    var itemCount = target.find('.dropdown-item').length;
    if (!target.hasClass('shown')){
      target.addClass('shown');
      target.find('.dropdown-items').css({
        'height': itemHeight * itemCount
      });
    } else {
      target.removeClass('shown');
      target.find('.dropdown-items').css({
        'height':'0'
      });
    }
  }

  // collapsible
  setUpCollapsibles();

  function setUpCollapsibles(){
    $('.collapsible-item').each(function(){
      var header_height = $(this).find('.collapsible-header').actual('outerHeight', { includeMargin : true });
      var body_height = $(this).find('.collapsible-body').actual('outerHeight', { includeMargin : true });
      if ($(this).hasClass('active')){
        $(this).css('height', header_height + body_height);
      } else {
        $(this).css('height',header_height);
      }
    })
  }

  $('.collapsible-header').click(function(){
    toggleCollapsible($(this).parent());
  })

  function toggleCollapsible(target) {
    // targetting collapsible-item
    var header_height = target.find('.collapsible-header').actual('outerHeight', { includeMargin : true });
    var body_height = target.find('.collapsible-body').actual('outerHeight', { includeMargin : true });
    if (target.hasClass('active')){
      target.removeClass('active')
      target.css('height',header_height);
    } else {
      target.addClass('active')
      target.css('height',header_height + body_height);
      if (target.parent().attr('data-type') == 'accordion') {
        target.siblings().each(function(){
          var header_height = target.find('.collapsible-header').actual('outerHeight', { includeMargin : true });
          $(this).removeClass('active')
          $(this).css('height',header_height)
        })
      }
    }
  }

  // modals
  setUpModals();

  function setUpModals(){
    $('.modal').hide();
    $('body').append('<div class="modal-overlay"></div>')
  }

  $('.modal-toggle').click(function(){
    toggleModal($(this).attr('data-target'));
  })

  $('.modal-overlay').click(function(){
    toggleModal($('.modal'));
  })

  function toggleModal(target) {
    var target = $(target);
    var content_height = target.find('.modal-content').actual('outerHeight', { includeMargin : true });
    var footer_height = target.find('.modal-footer').actual('outerHeight', { includeMargin : true });

    if (!target.hasClass('active')) {

      $('.modal-overlay').show();
      $('.modal-overlay').css('opacity','0.5')
      target.show();
      setTimeout(function(){
        target.addClass('active');
      },20)
    } else {
      target.removeClass('active');
      $('.modal-overlay').css('opacity','0');
      setTimeout(function(){
        target.hide();
        $('.modal-overlay').hide();
      },300)
    }
  }

})
