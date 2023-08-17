/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (tweets) {
  const $tweetsContainer = $("#tweets-container");

  // Empty the container to avoid duplicate rendering
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

const data = [];

renderTweets(data);
