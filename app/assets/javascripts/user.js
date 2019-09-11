$(function(){
  function buildHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${user.user_name} </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.user_name}>追加</div>
              </div>`
    $('#user-search-result').append(html);
  }

    

  function destroyHTML(user_name, user_id){
  var html = `<div class="chat-group-user">
                    <input name="group[user_ids][]" type="hidden" value=${user_id}>
                    <p class="chat-group-user__name"> ${user_name}</p>
                    <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
              </div>`
    $('#chat-group-user').append(html);
  }

      
  $(function(){
    $('#chat-group-form__input').on('keyup', function(){
      var input = $("#chat-group-form__input").val();
      $.ajax({
        url: '/users',
        type: "GET",
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
          buildHTML(user);
          });
        }
        
      });
    });
      $(function(){
        $(document).on('click', '.user-search-add', function() {
          var user_name = $(this).data("user-name");
          var user_id = $(this).data("user-id");
          $(this).parent().remove();
          destroyHTML(user_name, user_id);
        });
          $(function(){
            $(document).on('click', '.user-search-remove', function() {
              var user_name = $(this).data("user-name");
              var user_id = $(this).data("user-id");
              $(this).parent().remove();
              buildHTML(user_name, user_id);
            });
    
      });
    });
  });
});