class RedditClone {
    constructor() {
        this.postsContainer = document.getElementById('posts-container');
        this.loading = document.getElementById('loading');
        this.isLoading = false;
        this.postCount = 0;
        
        this.subreddits = [
            'AskReddit', 'funny', 'gaming', 'pics', 'science', 'worldnews', 
            'todayilearned', 'videos', 'movies', 'music', 'books', 'technology',
            'programming', 'memes', 'aww', 'sports', 'food', 'travel', 'art',
            'photography', 'news', 'politics', 'history', 'space', 'nature'
        ];
        
        this.postTitles = [
            "TIL that scientists have discovered...",
            "This photo I took during my recent trip",
            "My cat does this every morning",
            "Found this gem at a thrift store",
            "The view from my office window today",
            "Made this for my girlfriend's birthday",
            "This restaurant has the best pizza I've ever had",
            "My grandfather's collection from WWII",
            "The sunset tonight was absolutely beautiful",
            "Finally finished my 1000-piece puzzle",
            "This street art brightened my day",
            "My dog learned a new trick today",
            "The snow covered everything this morning",
            "Found this interesting rock on the beach",
            "My garden is finally starting to bloom",
            "This old building has so much character",
            "The clouds looked amazing during my flight",
            "My homemade bread turned out perfect",
            "This vintage car is absolutely stunning",
            "The northern lights were visible last night"
        ];
        
        this.usernames = [
            'RedditUser123', 'CoolCat42', 'NaturePhotographer', 'TechEnthusiast',
            'BookLover99', 'GamerGirl2023', 'CoffeeAddict', 'MountainHiker',
            'ArtStudent', 'FoodieLife', 'CatMom', 'DogDad', 'TravelBug',
            'MusicFan', 'MovieBuff', 'ScienceGeek', 'HistoryNerd', 'SportsFan',
            'GardenGuru', 'CookingMama', 'PhotographyPro', 'GamingLegend'
        ];

        this.init();
    }

    init() {
        this.loadPosts();
        this.setupInfiniteScroll();
    }

    getRandomImage() {
        const categories = ['nature', 'city', 'abstract', 'technology', 'animals', 'food', 'architecture', 'people'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const id = Math.floor(Math.random() * 1000) + 1;
        return `https://picsum.photos/600/400?random=${id}&category=${category}`;
    }

    getRandomProfilePic() {
        const id = Math.floor(Math.random() * 100) + 1;
        return `https://picsum.photos/40/40?random=${id + 1000}&face`;
    }

    generateRandomScore() {
        const rand = Math.random();
        if (rand < 0.3) return Math.floor(Math.random() * 100) + 1;
        if (rand < 0.6) return Math.floor(Math.random() * 1000) + 100;
        if (rand < 0.9) return Math.floor(Math.random() * 10000) + 1000;
        return Math.floor(Math.random() * 100000) + 10000;
    }

    formatScore(score) {
        if (score >= 1000) {
            return (score / 1000).toFixed(1) + 'k';
        }
        return score.toString();
    }

    getTimeAgo() {
        const times = [
            '2 minutes ago', '5 minutes ago', '15 minutes ago', '30 minutes ago',
            '1 hour ago', '2 hours ago', '3 hours ago', '5 hours ago',
            '8 hours ago', '12 hours ago', '1 day ago', '2 days ago',
            '3 days ago', '1 week ago'
        ];
        return times[Math.floor(Math.random() * times.length)];
    }

    generatePost() {
        this.postCount++;
        const subreddit = this.subreddits[Math.floor(Math.random() * this.subreddits.length)];
        const title = this.postTitles[Math.floor(Math.random() * this.postTitles.length)];
        const username = this.usernames[Math.floor(Math.random() * this.usernames.length)];
        const score = this.generateRandomScore();
        const comments = Math.floor(Math.random() * 500) + 1;
        const hasImage = Math.random() > 0.4;
        const hasText = Math.random() > 0.5;

        return {
            id: this.postCount,
            subreddit: subreddit,
            username: username,
            title: title,
            text: hasText ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco." : '',
            imageUrl: hasImage ? this.getRandomImage() : null,
            profilePic: this.getRandomProfilePic(),
            score: score,
            comments: comments,
            timeAgo: this.getTimeAgo()
        };
    }

    createPostElement(postData) {
        const post = document.createElement('div');
        post.className = 'post';
        
        const imageHtml = postData.imageUrl ? 
            `<img src="${postData.imageUrl}" alt="Post image" class="post-image" loading="lazy">` : '';
            
        const textHtml = postData.text ? 
            `<div class="post-text">${postData.text}</div>` : '';

        post.innerHTML = `
            <div class="vote-section">
                <button class="vote-btn upvote">▲</button>
                <div class="vote-score">${this.formatScore(postData.score)}</div>
                <button class="vote-btn downvote">▼</button>
            </div>
            <div class="post-content">
                <div class="post-header">
                    <a href="#" class="subreddit-link">r/${postData.subreddit}</a>
                    <span>•</span>
                    <span>Posted by</span>
                    <a href="#" class="username">u/${postData.username}</a>
                    <span>${postData.timeAgo}</span>
                </div>
                <h3 class="post-title">
                    <a href="#">${postData.title}</a>
                </h3>
                ${textHtml}
                ${imageHtml}
                <div class="post-footer">
                    <a href="#" class="post-action">💬 ${postData.comments} Comments</a>
                    <a href="#" class="post-action">🔗 Share</a>
                    <a href="#" class="post-action">💾 Save</a>
                </div>
            </div>
        `;

        return post;
    }

    async loadPosts() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.loading.style.display = 'block';
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        for (let i = 0; i < 10; i++) {
            const postData = this.generatePost();
            const postElement = this.createPostElement(postData);
            this.postsContainer.appendChild(postElement);
        }
        
        this.loading.style.display = 'none';
        this.isLoading = false;
    }

    setupInfiniteScroll() {
        window.addEventListener('scroll', () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
                this.loadPosts();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RedditClone();
});