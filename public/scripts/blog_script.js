document.addEventListener('DOMContentLoaded', async function () {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = "/";
    }

    const overlay = document.querySelector('.overlay');
    const articleModal = document.querySelector('.article-modal');
    const closeBtn = document.querySelector('.close-btn');
    const articleContentModal = document.querySelector('.article-content-modal');
    const articleImageModal = document.getElementById('article-model-image');
    const articleTitleModal = document.getElementById('article-modal-title');
    const articleDescModal = document.getElementById('article-modal-desc');
    const logoutButton = document.getElementById('logout_button');
    document.getElementById("logout_button").innerText = localStorage.getItem('username');
    logoutButton.classList.remove("hidden");
    logoutButton.addEventListener("mouseenter", function () {
        logoutButton.innerText = "LOGOUT";
    });

    logoutButton.addEventListener("mouseleave", function () {
        logoutButton.innerText = localStorage.getItem('username');
    });

    logoutButton.addEventListener("click", logout);

    const articlesResponse = await fetch('/api/articles');
    const articles = await articlesResponse.json();

    addArticlesToPage(articles).then(() => {
        const readMoreLinks = document.querySelectorAll('.read-more');
        readMoreLinks.forEach((link, index) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                overlay.style.display = 'block';
                articleModal.style.display = 'flex';
                articleModal.classList.add('flex-col', 'lg:flex-row');
                document.body.style.overflow = 'hidden';
                const article = articles[index];
                articleImageModal.src = "/static/assets/imgs/" + article.image;
                articleImageModal.alt = article.title;
                articleTitleModal.textContent = article.title;
                articleTitleModal.setAttribute('aria-label', 'Article Title');
                articleDescModal.textContent = article.description;
                articleDescModal.setAttribute('aria-label', 'Article Description');
                const articleContent = link.parentElement.nextElementSibling.innerHTML;
                articleContentModal.innerHTML = articleContent;

                readMoreLinks.forEach((otherLink, otherIndex) => {
                    otherLink.setAttribute('tabindex', '-1');
                });

                logoutButton.setAttribute('tabindex', '-1');
                closeBtn.focus();
            });
        });
    });

    closeBtn.addEventListener('click', () => {
        closeArticleModal();
    });

    closeBtn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            closeBtn.click();
        }
    });

    overlay.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            closeBtn.focus();
        }
    });
});

async function addCommentsToArticle(articleIndex) {
    const commentsResponse = await fetch('/api/comments');
    const comments = await commentsResponse.json();
    console.log('Comments:', comments);

    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section', 'mt-4', 'h-48', 'overflow-y-scroll');

    comments.forEach((comment, commentIndex) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment', 'flex', 'items-start', 'mb-4', 'rounded-md');
        commentElement.setAttribute('tabindex', '0');
        commentElement.innerHTML = `
            <div class="comment-text ml-3 max-w-[calc(100%-2rem)]">
                <p class="text-sm font-medium text-gray-800">${comment.username}</p>
                <p class="text-sm text-gray-700">${comment.content}</p>
            </div>
        `;
        commentSection.appendChild(commentElement);
    });

    const articleContent = document.querySelectorAll('.article-content')[articleIndex];
    articleContent.innerHTML = '';
    articleContent.appendChild(commentSection);
}

async function addArticlesToPage(articles) {
    const articlesContainer = document.getElementById('articles-container');

    articles.forEach((article, index) => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'overflow-hidden', 'mb-8');

        articleElement.innerHTML = `
            <img src="/static/assets/imgs/${article.image}" alt="${article.title}" class="w-full h-64 object-cover">
            <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">${article.title}</h2>
                <p class="text-gray-600">${article.description}</p>
                <a href="#" class="block mt-4 text-blue-700 hover:text-blue-800 hover:underline read-more" aria-label="Read more of Article ${index + 1}">Read more</a>
            </div>
            <div class="hidden article-content p-6">
                <!-- Comments added dynamically in JavaScript -->
            </div>
        `;

        articlesContainer.appendChild(articleElement);
        addCommentsToArticle(index);
    });
}

function closeArticleModal() {
    const overlay = document.querySelector('.overlay');
    const articleModal = document.querySelector('.article-modal');
    const readMoreLinks = document.querySelectorAll('.read-more');
    const logoutButton = document.getElementById('logout_button');

    overlay.style.display = 'none';
    articleModal.style.display = 'none';
    document.body.style.overflow = '';

    readMoreLinks.forEach(link => {
        link.setAttribute('tabindex', '0');
    });

    logoutButton.setAttribute('tabindex', '0');

    logoutButton.focus();
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = "/";
}
