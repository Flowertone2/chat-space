$(function(){
  function buildHTML(message){
    if (message.content && message.image) {
        var img = message.image ? `<img src=${message.image} ></img>` : "";
        var html =
        `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
                <div class="upper-message__date">
                  ${message.date}
                </div>
            </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
            ${img}
          </div>`
      } else if (message.content) {
          var html = 
          `<div class="message" data-message-id="${message.id}">
              <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
              </div>
                <div class="upper-message__date">
                  ${message.date}
                </div>
              </div>
                <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
                </div>
            </div>`
      } else if (message.image.url) {
          var html = 
          `<div class="message" data-message-id="${message.id}">
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                  <div class="upper-message__date">
                    ${message.date}
                  </div>
              </div>
                <div class="lower-message">
                <img src="${message.image.url}" class="lower-message__image" >
                </div>
            </div>`
      };
        return html;
  };
    
          function reloadMessages (message){
              if (window.location.href.match(/\/groups\/\d+\/messages/)){
              var last_message_id =  $('.message:last').data("message-id");
              console.log('a')
                // lastMessageId = $('.lower-message__content:last').data('message-id')
                $.ajax({
                  url: "api/messages",
                  type: 'GET',
                  dataType: 'json',
                  data: {last_id: last_message_id}
                })
                .done(function(messages) {
                  console.log(messages)
                  var insertHTML = '';
                  messages.forEach(function (message) {
                    insertHTML = buildHTML(message); 
                    $('.messages').append(insertHTML);
                    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
                    // $('.messages').animate({scrollTop: $('.messages').offset().top});
                    // $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
                  })
                })
                .fail(function(){
                  alert('自動更新に失敗しました');
                });
              }
              // return last_message_id;
          };
        setInterval(reloadMessages, 5000);
    


    $('.new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');      
        $('form')[0].reset();
    }) 
      .fail(function(){
        alert('error');
      });
      return false;
    })
      
});

