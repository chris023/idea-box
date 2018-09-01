$('.idea-input').on('keyup', function(e) {
 if ($(e.target).hasClass('idea-input--title') || ($(e.target).hasClass('idea-input--body'))) 
 { if ($('idea-input--title').val() !== '' && $('idea-input--body').val() !== '') 
    {
      $('.idea-input--submit').attr('disabled', false);
    } else {
      $('.idea-input--submit').attr('disabled', true);
    }
  }
})

$('.idea-input--submit').on('click', function(e) {
    e.preventDefault();
    var title = $('.idea-input--title').val();
    var body = $('.idea-input--body').val();
    createNewIdea(title, body);
})

function createNewIdea(title, body) {
$('.js-idea-list').prepend(`<article class='js-idea'><h2> ${title}</h2>
<img class='delete-ico'src='img/delete.svg'>
<p>${body}</p><img class = 'upvote-ico' src='img/upvote.svg'><img class = 'downvote-ico' 
src='img/downvote.svg'><p class = "quality">quality: swill</p></article>`);
}

$('.js-idea-list').on('click', function(e){
  if ($(e.target).hasClass('upvote-ico')) {
    var $targetQuality = $($(e.target).siblings('.quality')[0])
    if ($targetQuality.text() === 'quality: swill') {
      $targetQuality.text('quality: plausible')
      } else if ($targetQuality.text() === 'quality: plausible') {
      $targetQuality.text('quality: genius')
    }
  }

  if ($(e.target).hasClass('downvote-ico')) {
    var $targetQuality = $($(e.target).siblings('.quality')[0])
    if ($targetQuality.text() === 'quality: genius') {
      $targetQuality.text('quality: plausible')
      } else if ($targetQuality.text() === 'quality: plausible') {
      $targetQuality.text('quality: swill')
    }
  }

  if ($(e.target).hasClass('delete-ico')) {
    $(e.target).parent().remove()
  }
})

