const videosPerPage = 10;
let currentPage = 1;

// Hamburger Menu Toggle
document.getElementById('hamburger').addEventListener('click', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Display Videos
function displayVideos(page, filterType = null, filterValue = null) {
  const videoList = document.getElementById('video-list');
  videoList.innerHTML = '';
  let filteredVideos = videos;

  if (filterType === 'category') {
    filteredVideos = videos.filter(video => video.categories.includes(filterValue));
  } else if (filterType === 'hashtag') {
    filteredVideos = videos.filter(video => video.hashtags.includes(filterValue));
  }

  const start = (page - 1) * videosPerPage;
  const end = start + videosPerPage;
  const paginatedVideos = filteredVideos.slice(start, end);

  paginatedVideos.forEach((video, index) => {
    const videoCard = document.createElement('div');
    videoCard.className = 'relative bg-white rounded-lg shadow-md overflow-hidden';
    videoCard.innerHTML = `
      <a href="video.html?id=${start + index}">
        <img src="${video.thumbnail}" alt="${video.title}" class="w-full h-48 object-cover">
        <div class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">${video.views}</div>
        <div class="p-4">
          <h3 class="text-lg font-semibold">${video.title}</h3>
        </div>
      </a>
    `;
    videoList.appendChild(videoCard);
  });

  displayPagination(filteredVideos.length, page);
}

// Display Pagination
function displayPagination(totalVideos, currentPage) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  const totalPages = Math.ceil(totalVideos / videosPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.className = `px-4 py-2 mx-1 rounded ${i === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`;
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayVideos(currentPage);
    });
    pagination.appendChild(button);
  }
}

// Display Categories
function displayCategories() {
  const categoryList = document.getElementById('category-list');
  const categories = [...new Set(videos.flatMap(video => video.categories))];
  categoryList.innerHTML = '';
  categories.forEach(category => {
    const categoryLink = document.createElement('a');
    categoryLink.href = `#`;
    categoryLink.className = 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700';
    categoryLink.textContent = category;
    categoryLink.addEventListener('click', () => displayVideos(1, 'category', category));
    categoryList.appendChild(categoryLink);
  });
}

// Display Hashtags
function displayHashtags() {
  const hashtagList = document.getElementById('hashtag-list');
  const hashtags = [...new Set(videos.flatMap(video => video.hashtags))];
  hashtagList.innerHTML = '';
  hashtags.forEach(hashtag => {
    const hashtagLink = document.createElement('a');
    hashtagLink.href = `#`;
    hashtagLink.className = 'bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700';
    hashtagLink.textContent = `#${hashtag}`;
    hashtagLink.addEventListener('click', () => displayVideos(1, 'hashtag', hashtag));
    hashtagList.appendChild(hashtagLink);
  });
}

// Initialize
displayVideos(currentPage);
displayCategories();
displayHashtags();