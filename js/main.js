$(document).ready(getIdeasFromStorage);

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
    localStorage.setItem("js-idea-list", JSON.stringify($('.js-idea-list').html()));
})

function createNewIdea(title, body) {
$('.js-idea-list').prepend(
    `<article class='js-idea' id='idea-num0'>
      <div class='js-idea--container1'>
        <h2>${title}</h2>
        <div class='ico delete-ico'></div>
      </div>
      <p class='js-idea--body'>${body}</p>
        <div class='js-idea--container2'>
        <div class = 'ico upvote-ico'></div>
        <div class = 'ico downvote-ico'></div>
        <p class='quality'>quality: swill</p>
      </div>
    </article>`);
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
    $(e.target).parent().parent().remove()
  }
})

function getIdeasFromStorage() {
  var ideasList = JSON.parse(localStorage.getItem('js-idea-list'));
  if (ideasList) { 
    $('.js-idea-list').html(ideasList)
  }

}