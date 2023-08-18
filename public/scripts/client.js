$(document).ready(function () {
  const maxCharCount = 140;
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user">
            <img src="${tweet.user.avatars}" alt="${tweet.user.name}" />
            <span class="name">${tweet.user.name}</span>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <div class="content">${tweet.content.text}</div>
        <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  const $tweetForm = $("#tweet-form");
  const $errorMessage = $(".error-message");

  $tweetForm.on("submit", function (event) {
    event.preventDefault();

    const tweetText = $tweetForm.find("textarea").val().trim();

    if (tweetText === "") {
      showError("Tweet cannot be empty.");
      return;
    }

    if (tweetText.length > maxCharCount) {
      showError("Tweet is too long.");
      return;
    }

    clearError();

    const formData = $(this).serialize();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      success: function () {
        loadTweets();
        $tweetForm.find("textarea").val("");
      },
      error: function (error) {
        console.error("Error submitting tweet:", error);
      },
    });
  });

  const showError = function (message) {
    $errorMessage.text(message);
    $errorMessage.slideDown();
  };

  const clearError = function () {
    $errorMessage.hide().empty();
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (error) {
        console.error("Error fetching tweets:", error);
      },
    });
  };

  $(".timestamp").each(function () {
    const created_at = $(this).text();
    $(this).text(timeAgoInstance.format(created_at));
  });

  loadTweets();
});
