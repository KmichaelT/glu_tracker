document.getElementById("glucose-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const glucoseLevel = document.getElementById("glucose-level").value;
    const feeling = document.getElementById("feeling").value;
    const mealStatus = document.getElementById("meal-status").value;
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const dayString = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const timeString = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  
    const glucoseEntry = {
      date: dateString,
      day: dayString,
      time: timeString,
      level: glucoseLevel,
      feeling: feeling,
      mealStatus: mealStatus
    };
  
    let glucoseData = JSON.parse(localStorage.getItem("glucoseData")) || [];
    glucoseData.push(glucoseEntry);
    localStorage.setItem("glucoseData", JSON.stringify(glucoseData));
  
    displayTable();
    document.getElementById("glucose-form").reset();
  });
  
  function displayTable() {
    const glucoseData = JSON.parse(localStorage.getItem("glucoseData")) || [];
    const glucoseDataContainer = document.getElementById("glucose-data");
    glucoseDataContainer.innerHTML = "";
  
    glucoseData.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${entry.date},
        ${entry.day},
        ${entry.time}</td>
        <td>${entry.level}</td>
        <td>${entry.feeling}</td>
        <td>${entry.mealStatus === 'before_meal' ? 'Before Meal' : 'After Meal'}</td>
      `;
      glucoseDataContainer.appendChild(row);
    });
  }
  
  displayTable();
  