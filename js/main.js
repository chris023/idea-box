$('.idea-input').on('keyup', function(e) {
 if (e.target.hasClass('idea-input--title') || (e.target.hasClass('idea-input--body'))) {
    if ($('idea-input--title').val() !== '' && $('idea-input--body').val() !== '') {
      $('.idea-input--submit').attr('disabled', false);
    } else {
      $('.idea-input--submit').attr('disabled', true);
    }
})

$('.idea-input--submit').on('click', function(e) {
    var title = $('.idea-input--title').val();
    var body = $('.idea-input--body').val();
    createNewIdea(title, body);
})

function createNewIdea(title, body) {
$('.js-idea-list').html()

}

