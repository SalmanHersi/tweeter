$(document).ready(function () {
  const maxCharCount = 140;
  const $tweetTextarea = $(".new-tweet textarea");
  const $charCounter = $tweetTextarea.parent().siblings().last();
  const $errorMessage = $(".error-message");

  $tweetTextarea.on("input", function () {
    const charCount = $(this).val().length;
    const charsLeft = maxCharCount - charCount;
    $charCounter.text(charsLeft);

    if (charsLeft < 0) {
      $charCounter.addClass("invalid");
    } else {
      $charCounter.removeClass("invalid");
    }
  });

  $(".new-tweet form").on("submit", function (event) {
    event.preventDefault();

    const tweetLength = $tweetTextarea.val().trim().length;

    if (tweetLength === 0) {
      $errorMessage.text("Tweet cannot be empty.");
      $errorMessage.slideDown();
    } else if (tweetLength > maxCharCount) {
      $errorMessage.text("Tweet is too long.");
      $errorMessage.slideDown();
    } else {
      $errorMessage.slideUp(function () {
        // Perform actual tweet submission here
      });
    }
  });
});
