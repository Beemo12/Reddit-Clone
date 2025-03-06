document.addEventListener("DOMContentLoaded", function () {
    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const upvoteButton = post.querySelector(".upvote");
        const downvoteButton = post.querySelector(".downvote");
        const voteCount = post.querySelector(".vote-count");

        upvoteButton.addEventListener("click", function () {
            let count = parseInt(voteCount.textContent);
            voteCount.textContent = count + 1;
        });

        downvoteButton.addEventListener("click", function () {
            let count = parseInt(voteCount.textContent);
            voteCount.textContent = count - 1;
        });
    });
});
