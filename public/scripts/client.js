/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          <span class="timestamp">${tweet.created_at}</span>
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

  const $tweetForm = $("#tweet-form"); // Target the form
  const $errorMessage = $(".error-message");

  $tweetForm.on("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const tweetLength = $tweetForm.find("textarea").val().trim().length;

    if (tweetLength === 0) {
      $errorMessage.text("Tweet cannot be empty.");
      $errorMessage.slideDown();
      return; // Exit the submit handler
    } else if (tweetLength > maxCharCount) {
      $errorMessage.text("Tweet is too long.");
      $errorMessage.slideDown();
      return; // Exit the submit handler
    }

    // Serialize the form data
    const formData = $(this).serialize();

    // Send the AJAX POST request
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      success: function () {
        // Once the data is sent successfully, fetch the updated tweets and render them
        loadTweets();
      },
      error: function (error) {
        console.error("Error submitting tweet:", error);
      },
    });
  });

  // Helper function to fetch and render tweets
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

  // Load tweets when the page loads
  loadTweets();
});
