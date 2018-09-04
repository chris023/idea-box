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
    var id = createNewIdea(title, body);
    updateLocalStorage(id);
    $('#idea-template').addClass('hidden');
})

function updateLocalStorage(id) {
  var $cards = $('.js-idea')
  var thisCard = $cards.filter(`[data-id='${id}']`)[0];
  var thisCardHTML = thisCard.outerHTML;
  localStorage.setItem(id, thisCardHTML);
}

function createNewIdea(title, body) {
  var id = new Date().getTime();
  console.log(id);

  $('.js-idea-list').prepend(
    `<article class='js-idea' data-id='${id}'>
      <div class='js-idea--container1'>
        <h2 class = 'js-idea--title' contenteditable="true">${title}</h2>
        <div class='ico delete-ico'></div>
      </div>
      <p class='js-idea--body' contenteditable="true">${body}</p>
        <div class='js-idea--container2'>
        <div class = 'ico upvote-ico'></div>
        <div class = 'ico downvote-ico'></div>
        <p class='quality'>quality: swill</p>
      </div>
    </article>`);
    
    clearInputs();

    return id;
}

function clearInputs(){
  $('.idea-input--title').val('');
  $('.idea-input--body').val('');
  $('.idea-input--submit').attr('disabled', true);
}

$('.js-idea-list').on('click', function(e){
  if ($(e.target).hasClass('upvote-ico')) {
    var id = $(e.target).parent().parent().attr('data-id');
    var $targetQuality = $($(e.target).siblings('.quality')[0])
    if ($targetQuality.text() === 'quality: swill') {
      $targetQuality.text('quality: plausible')
      updateLocalStorage(id);
      } else if ($targetQuality.text() === 'quality: plausible') {
      $targetQuality.text('quality: genius')
      updateLocalStorage(id);
    }
  }

  if ($(e.target).hasClass('downvote-ico')) {
    var id = $(e.target).parent().parent().attr('data-id');
    var $targetQuality = $($(e.target).siblings('.quality')[0])
    if ($targetQuality.text() === 'quality: genius') {
      $targetQuality.text('quality: plausible')
      updateLocalStorage(id);
      } else if ($targetQuality.text() === 'quality: plausible') {
      $targetQuality.text('quality: swill')
      updateLocalStorage(id);
    }
  }

  if ($(e.target).hasClass('delete-ico')) {
    var id = $(e.target).parent().parent().attr('data-id');
    $(e.target).parent().parent().remove()
    localStorage.removeItem(id);
  }
})

$('.js-idea-list').on('input', function(e){
  if( $(e.target).hasClass('js-idea--body') ) {
    var id = $(e.target).parent().attr('data-id');
    updateLocalStorage(id);
  }

  if( $(e.target).hasClass('js-idea--title') ) {
    var id = $(e.target).parent().parent().attr('data-id');
    updateLocalStorage(id);
  }
})

function getIdeasFromStorage() {
  if(localStorage.length > 0){
    $('.js-idea').toggleClass('hidden');
  }
  
  for(var i=0; i < localStorage.length; i++){
    var timeStampOfCurrentCard = localStorage.key(i);
    var card = localStorage.getItem(timeStampOfCurrentCard);
    $('.js-idea-list').prepend(card);
  }
}

$('.search').on('keyup', function(e) {
 var ideas = $('.js-idea')
 var searchFilter = $('.search').val().toLowerCase();

 for (var i = 0; i < ideas.length; i++) {
  var title = $($($(ideas[i]).children('.js-idea--container1')[0]).children('.js-idea--title')[0]).text()
  var body = $($(ideas[i]).children('.js-idea--body')[0]).text()
  if (title.toLowerCase().includes(searchFilter) || body.toLowerCase().includes(searchFilter)) {
    $(ideas[i]).removeClass('hidden')
  } else {
    $(ideas[i]).addClass('hidden')
  }
 }
})