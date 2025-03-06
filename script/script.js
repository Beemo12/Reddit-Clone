document.addEventListener("DOMContentLoaded", function () {
    const upvoteButton = document.querySelector(".upvote");
    const downvoteButton = document.querySelector(".downvote");
    const voteCount = document.querySelector(".vote-count");
    const viewCommentsButton = document.querySelector(".view-comments");
    const modal = document.getElementById("commentModal");
    const commentList = document.getElementById("commentList");
    const closeModalButton = document.querySelector(".close-btn");
    let hasVoted = false;

    function fetchComments() {
        fetch('/comments.json')
            .then(response => response.json())
            .then(data => {
                commentList.innerHTML = ''; 
                data.comments.forEach(comment => {
                    const commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");
                    commentDiv.innerHTML = `<p><strong>${comment.user}:</strong> ${comment.text}</p>`;
                    commentList.appendChild(commentDiv);
                });
            })
            .catch(error => console.error('Error loading comments:', error));
    }

    upvoteButton.addEventListener("click", function () {
        if (!hasVoted) {
            let count = parseInt(voteCount.textContent);
            voteCount.textContent = count + 1;
            hasVoted = true;
        }
    });

    downvoteButton.addEventListener("click", function () {
        if (!hasVoted) {
            let count = parseInt(voteCount.textContent);
            voteCount.textContent = count - 1;
            hasVoted = true;
        }
    });

    viewCommentsButton.addEventListener("click", function () {
        fetchComments();
        modal.style.display = "flex"; 
    });

    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal
    });
});
