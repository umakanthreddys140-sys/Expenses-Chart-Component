document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      const chartContainer = document.getElementById('chart-container');
      const maxAmount = Math.max(...data.map(d => d.amount));
      
      const currentDayIndex = new Date().getDay();
      const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      const currentDayStr = days[currentDayIndex];

      data.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('bar-wrapper');

        const heightPercent = (item.amount / maxAmount) * 100;
        const isToday = item.day === currentDayStr;

        wrapper.innerHTML = `
          <div class="bar-container">
            <div class="bar ${isToday ? 'today' : ''}" style="height: ${heightPercent}%;">
              <div class="amount-tooltip">$${item.amount}</div>
            </div>
          </div>
          <span class="day-label">${item.day}</span>
        `;

        chartContainer.appendChild(wrapper);
      });
    })
    .catch(error => console.error("Error loading JSON data:", error));
});
