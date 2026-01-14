// Cinema App - Vanilla JavaScript

// State
let selectedDay = 17;
let searchQuery = '';

// Days data
const days = [
  { dayName: 'MER', dayNumber: 14 },
  { dayName: 'GIO', dayNumber: 15 },
  { dayName: 'VEN', dayNumber: 16 },
  { dayName: 'SAB', dayNumber: 17 },
  { dayName: 'DOM', dayNumber: 18 },
  { dayName: 'LUN', dayNumber: 19 },
  { dayName: 'MAR', dayNumber: 20 },
];

// Initialize app
function init() {
  renderCalendar();
  setupEventListeners();
}

// Render calendar days
function renderCalendar() {
  const calendarContainer = document.getElementById('calendarDays');
  if (!calendarContainer) return;

  calendarContainer.innerHTML = '';

  days.forEach(day => {
    const button = document.createElement('button');
    button.className = `day-btn ${selectedDay === day.dayNumber ? 'active' : ''}`;
    button.dataset.dayNumber = day.dayNumber;
    
    button.innerHTML = `
      <span class="day-name">${day.dayName}</span>
      <span class="day-number">${day.dayNumber}</span>
      <span class="day-underline"></span>
    `;

    button.addEventListener('click', () => selectDay(day.dayNumber));
    
    calendarContainer.appendChild(button);
  });
}

// Select a day
function selectDay(dayNumber) {
  if (selectedDay === dayNumber) return;
  
  selectedDay = dayNumber;
  
  // Update active state
  const allButtons = document.querySelectorAll('.day-btn');
  allButtons.forEach(btn => {
    const btnDayNumber = parseInt(btn.dataset.dayNumber);
    
    if (btnDayNumber === dayNumber) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Setup event listeners
function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      // Here you can add search logic if needed
      console.log('Search query:', searchQuery);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
