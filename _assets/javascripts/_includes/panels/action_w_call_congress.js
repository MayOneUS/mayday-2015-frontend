$(document).ready(function(){
var views = $('.js-panel-action-w-call-congress');
views.each( function(i, el){


  el.find('.js-form-call-congress').validate({
    submitHandler: function(form) {
      $form = $(form);
      $form.find('button.btn').html('<i class="fa fa-refresh fa-spin"></i> Calling');
      $.post(services_url + '/calls', $form.serialize() ).done(function(data){
        $parent = $form.parents('.incomplete');
        if(location.pathname == '/take-action/'){
          setAsComplete($parent);
        }else{
          $parent.removeClass('incomplete');
          $parent.addClass('complete').addClass('thanked');
        }
        $.each(data.targets.slice(0, 5), function(index, target_data){
          var rendered = ich.call_target_template(target_data);
          $('.js-targets').append(rendered);
        });
      }).fail(function(data){
        alert('There was an error. Please try again later.')
      })

    }
  });



});
});