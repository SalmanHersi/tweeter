$(document).ready(function () {
  const maxCharCount = 140;
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    // Create the main tweet article
    const $tweet = $("<article>").addClass("tweet");

    // Header section
    const $header = $("<header>");
    const $userDiv = $("<div>").addClass("user");
    const $userImg = $("<img>")
      .attr("src", tweet.user.avatars)
      .attr("alt", tweet.user.name);
    const $userName = $("<span>").addClass("name").text(tweet.user.name);
    const $userHandle = $("<span>").addClass("handle").text(tweet.user.handle);

    $userDiv.append($userImg, $userName);
    $header.append($userDiv, $userHandle);

    // Content section
    const $content = $("<div>").addClass("content").text(tweet.content.text);

    // Footer section
    const $footer = $("<footer>");
    const $timestamp = $("<span>")
      .addClass("timestamp")
      .text(timeago.format(tweet.created_at));
    const $iconsDiv = $("<div>").addClass("icons");
    const $retweetIcon = $("<i>").addClass("fas fa-retweet icon-right");
    const $heartIcon = $("<i>").addClass("fas fa-heart icon-right");
    const $flagIcon = $("<i>").addClass("fas fa-flag icon-right");

    $iconsDiv.append($flagIcon, $retweetIcon, $heartIcon);
    $footer.append($timestamp, $iconsDiv);

    // Combine everything
    $tweet.append($header, $content, $footer);

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
