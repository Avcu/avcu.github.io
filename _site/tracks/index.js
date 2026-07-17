// Initialize and add the map
let map_run;
let map_bike;

const locations = {
  "Los Angeles, CA": { lat: 34.01842, lng: -118.29528 },
  "Seattle, WA": { lat: 47.60785, lng: -122.33651 },
  "Toronto, ON": { lat: 43.67282, lng: -79.40001 },
  "New York, NY": { lat: 40.72544, lng: -73.99678 }
};

let running_stats = "./data/running_stats.json";
let biking_stats = "./data/biking_stats.json";

let runningStatsData = null;
let bikingStatsData = null;

function initMap() {
  map_run = new google.maps.Map(document.getElementById("map_run"), {
    zoom: 12,
    center: locations["New York, NY"],
  });
  const runKML = new google.maps.KmlLayer({
    url: "https://avcu.github.io/tracks/data/tracks_run.kml",
    map: map_run,
    preserveViewport: true,
  });

  map_bike = new google.maps.Map(document.getElementById("map_bike"), {
    zoom: 11,
    center: locations["Los Angeles, CA"],
  });
  const bikeKML = new google.maps.KmlLayer({
    url: "https://avcu.github.io/tracks/data/tracks_bike.kml",
    map: map_bike,
  });

  // Setup city selectors
  setupCitySelectors();
}

function setupCitySelectors() {
  const selectRun = document.getElementById("city_select_run");
  if (selectRun) {
    selectRun.addEventListener("change", (event) => {
      const city = event.target.value;
      const coords = locations[city];
      if (coords && map_run) {
        map_run.setCenter(coords);
      }
      if (runningStatsData) {
        renderRunningData(runningStatsData, city);
      }
    });
  }

  const selectBike = document.getElementById("city_select_bike");
  if (selectBike) {
    selectBike.addEventListener("change", (event) => {
      const city = event.target.value;
      const coords = locations[city];
      if (coords && map_bike) {
        map_bike.setCenter(coords);
      }
      if (bikingStatsData) {
        renderBikingData(bikingStatsData, city);
      }
    });
  }
}

async function fetchRunningData() {
  const runningStatsResponse = await fetch(running_stats);
  runningStatsData = await runningStatsResponse.json();
  renderRunningData(runningStatsData, "New York, NY");
}

async function fetchBikingData() {
  const bikingStatsResponse = await fetch(biking_stats);
  bikingStatsData = await bikingStatsResponse.json();
  renderBikingData(bikingStatsData, "Los Angeles, CA");
}

function renderRunningData(content, selectedCity) {
  const divStatRun = document.getElementById("stat_run");

  let displayDiv = document.getElementById("running_stats_display");
  if (!displayDiv) {
    displayDiv = document.createElement('div');
    displayDiv.id = "running_stats_display";
    divStatRun.appendChild(displayDiv);
  }

  const cityData = content.cities[selectedCity] || { num_track: 0, tot_distance_km: 0 };

  displayDiv.innerHTML = `
    <div class="stats-container">
      <div class="stats-section">
        <h3>${selectedCity}</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Activities</span>
            <span class="stat-value">${cityData.num_track}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Distance</span>
            <span class="stat-value">${cityData.tot_distance_km.toFixed(1)} km</span>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <h3>Grand Total</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Activities</span>
            <span class="stat-value">${content.num_track}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Distance</span>
            <span class="stat-value">${content.tot_distance_km.toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderBikingData(content, selectedCity) {
  const divStatBike = document.getElementById("stat_bike");

  let displayDiv = document.getElementById("biking_stats_display");
  if (!displayDiv) {
    displayDiv = document.createElement('div');
    displayDiv.id = "biking_stats_display";
    divStatBike.appendChild(displayDiv);
  }

  const cityData = content.cities[selectedCity] || { num_track: 0, tot_distance_km: 0 };

  displayDiv.innerHTML = `
    <div class="stats-container">
      <div class="stats-section">
        <h3>${selectedCity}</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Activities</span>
            <span class="stat-value">${cityData.num_track}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Distance</span>
            <span class="stat-value">${cityData.tot_distance_km.toFixed(1)} km</span>
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <h3>Grand Total</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Activities</span>
            <span class="stat-value">${content.num_track}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Distance</span>
            <span class="stat-value">${content.tot_distance_km.toFixed(1)} km</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

fetchRunningData();
fetchBikingData();