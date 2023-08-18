/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");
    console.log("check");
    console.log(tweets);
    // Empty the container to avoid duplicate rendering
    $tweetsContainer.empty();

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      $tweetsContainer.append($tweet);
      console.log($tweetsContainer);
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

  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  renderTweets(data);
});
