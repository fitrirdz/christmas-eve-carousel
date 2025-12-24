// configuration
const COLUMN_WIDTH = 250;
const GAP = 20;
const SCROLL_DISTANCE = COLUMN_WIDTH + GAP;

// DOM elements
const columnsWrapper = document.getElementById ('columnsWrapper');
const prevBtn = document.getElementById ('prevBtn');
const nextBtn = document.getElementById ('nextBtn');
const markerGroup = document.getElementById ('markerGroup');
const snowflakesContainer = document.getElementById ('snowflakes');

// get all columns
const columns = document.querySelectorAll ('.column');
const totalColumns = columns.length;

let currentIndex = 0;

// ========== initialize markers ==========
function initializeMarkers () {
  columns.forEach ((_, index) => {
    const marker = document.createElement ('div');
    marker.className = 'scroll-marker';
    if (index === 0) marker.classList.add ('target-current');
    marker.addEventListener ('click', () => scrollToIndex (index));
    markerGroup.appendChild (marker);
  });
}

// ========== update visual states ==========
function updateVisualState () {
  // update columns
  columns.forEach ((col, index) => {
    col.classList.toggle ('target-current', index === currentIndex);
  });

  // update markers
  const markers = document.querySelectorAll ('.scroll-marker');
  markers.forEach ((marker, index) => {
    marker.classList.toggle ('target-current', index === currentIndex);
  });

  // update button states
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === totalColumns - 1;
}

// ========== scroll functions ==========
function scrollToIndex (index) {
  currentIndex = Math.max (0, Math.min (index, totalColumns - 1));
  const scrollAmount = currentIndex * SCROLL_DISTANCE;

  columnsWrapper.scrollLeft = scrollAmount;
  updateVisualState ();
}

function scrollPrev () {
  if (currentIndex > 0) {
    scrollToIndex (currentIndex - 1);
  }
}

function scrollNext () {
  if (currentIndex < totalColumns - 1) {
    scrollToIndex (currentIndex + 1);
  }
}

// ========== event listeners ==========
prevBtn.addEventListener ('click', scrollPrev);
nextBtn.addEventListener ('click', scrollNext);

// track scroll position
columnsWrapper.addEventListener ('scroll', () => {
  const scrolled = columnsWrapper.scrollLeft;
  const newIndex = Math.round (scrolled / SCROLL_DISTANCE);
  if (newIndex !== currentIndex) {
    currentIndex = newIndex;
    updateVisualState ();
  }
});

// keyboard navigation
document.addEventListener ('keydown', e => {
  if (e.key === 'ArrowLeft') scrollPrev ();
  if (e.key === 'ArrowRight') scrollNext ();
});

// ========== snowflake animation ==========
function createSnowflake () {
  const snowflake = document.createElement ('div');
  snowflake.className = 'snowflake';
  snowflake.textContent = '❄';
  snowflake.style.left = Math.random () * 100 + '%';
  snowflake.style.animationDuration = Math.random () * 10 + 10 + 's';
  snowflake.style.opacity = Math.random () * 0.5 + 0.3;
  snowflakesContainer.appendChild (snowflake);

  // remove after animation completes
  setTimeout (() => snowflake.remove (), 20000);
}

// create snowflakes periodically
setInterval (createSnowflake, 300);

// initial setup
initializeMarkers ();
updateVisualState ();
