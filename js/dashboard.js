// Simulate a logged-in user (normally set after login)
if (!localStorage.getItem("username")) {
  localStorage.setItem("username", "Hajra");
  localStorage.setItem("points", "50");
  localStorage.setItem("activity", JSON.stringify([
    "♻️ Recycled 2 plastic bottles (+10 pts)",
    "♻️ Recycled 1 can (+5 pts)"
  ]));
}

// Load user data into dashboard
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("username");
  const points = localStorage.getItem("points");
  const activity = JSON.parse(localStorage.getItem("activity"));

  document.getElementById("username").textContent = username;
  document.getElementById("points").textContent = points;

  const log = document.getElementById("activity-log");
  log.innerHTML = "";
  activity.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = entry;
    log.appendChild(li);
  });
});

// Add points manually (for testing)
function addPoints(amount) {
  let current = parseInt(localStorage.getItem("points"));
  current += amount;
  localStorage.setItem("points", current);
  document.getElementById("points").textContent = current;

  let activity = JSON.parse(localStorage.getItem("activity"));
  activity.unshift(`♻️ Manual test add: ${amount} pts`);
  localStorage.setItem("activity", JSON.stringify(activity));

  const li = document.createElement("li");
  li.textContent = `♻️ Manual test add: ${amount} pts`;
  document.getElementById("activity-log").prepend(li);
}

function logout() {
  alert("Logged out!");
  window.location.href = "login.html";
  localStorage.clear();
}
function redeemReward() {
  let points = parseInt(localStorage.getItem("points"));
  const message = document.getElementById("redeem-message");

  if (points >= 30) {
    points -= 30;
    localStorage.setItem("points", points);
    document.getElementById("points").textContent = points;

    let activity = JSON.parse(localStorage.getItem("activity"));
    activity.unshift("🎁 Redeemed reward: Tote Bag (-30 pts)");
    localStorage.setItem("activity", JSON.stringify(activity));

    const li = document.createElement("li");
    li.textContent = "🎁 Redeemed reward: Tote Bag (-30 pts)";
    document.getElementById("activity-log").prepend(li);

    message.textContent = "Reward redeemed! Check your inbox soon.";
  } else {
    message.style.color = "red";
    message.textContent = "Not enough points to redeem this reward.";
  }
}

// Populate form with existing values on load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("edit-name").value = localStorage.getItem("username") || "";
  document.getElementById("edit-email").value = localStorage.getItem("email") || "";
});

// Handle profile form update
document.getElementById("profile-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const newName = document.getElementById("edit-name").value;
  const newEmail = document.getElementById("edit-email").value;

  localStorage.setItem("username", newName);
  localStorage.setItem("email", newEmail);

  document.getElementById("username").textContent = newName;
  document.getElementById("profile-message").textContent = "Profile updated successfully ✅";
});
// Simulated daily activity log (replace this with real dates if tracking properly)
const recyclingData = {
  Monday: 2,
  Tuesday: 1,
  Wednesday: 3,
  Thursday: 0,
  Friday: 2,
  Saturday: 1,
  Sunday: 0
};

// Create bar chart
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("activityChart").getContext("2d");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(recyclingData),
      datasets: [{
        label: 'Recycled Items',
        data: Object.values(recyclingData),
        backgroundColor: '#2d6a4f'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
});
function closeModal() {
  document.getElementById("rewardModal").style.display = "none";
}

