document.addEventListener("DOMContentLoaded", function () {
    const upvoteButton = document.querySelector(".upvote");
    const downvoteButton = document.querySelector(".downvote");
    const voteCount = document.querySelector(".vote-count");
    const viewCommentsButton = document.querySelector(".view-comments");
    const modal = document.getElementById("commentModal");
    const commentList = document.getElementById("commentList");
    const closeModalButton = document.querySelector(".close-btn");
    let hasVoted = false;

    // Function to fetch comments from JSON
    function fetchComments() {
        fetch('/comments.json') // Path to your JSON file
            .then(response => response.json())
            .then(data => {
                // Render comments inside the modal
                commentList.innerHTML = ''; // Clear any existing comments
                data.comments.forEach(comment => {
                    const commentDiv = document.createElement("div");
                    commentDiv.classList.add("comment");
                    commentDiv.innerHTML = `<p><strong>${comment.user}:</strong> ${comment.text}</p>`;
                    commentList.appendChild(commentDiv);
                });
            })
            .catch(error => console.error('Error loading comments:', error));
    }

    // Handle upvote and downvote functionality
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

    // Open the modal and fetch comments when the button is clicked
    viewCommentsButton.addEventListener("click", function () {
        fetchComments(); // Fetch comments when the button is clicked
        modal.style.display = "flex"; // Show the modal with comments
    });

    // Close the modal when the close button is clicked
    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none"; // Hide the modal
    });
});
