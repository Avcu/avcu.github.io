// Initialize and add the map
let runMap;
let bikeMap;

let runKmlLayer;
let bikeKmlLayer;

const locations = {
  "Los Angeles, CA": { lat: 34.01842, lng: -118.29528 },
  "Seattle, WA": { lat: 47.60785, lng: -122.33651 },
  "Toronto, ON": { lat: 43.67282, lng: -79.40001 },
  "New York, NY": { lat: 40.72544, lng: -73.99678 }
};

const city_slugs = {
  "Los Angeles, CA": "los_angeles",
  "Seattle, WA": "seattle",
  "Toronto, ON": "toronto",
  "New York, NY": "new_york"
};

const S3_TRACKS_BASE_URL = "https://s3.us-east-1.amazonaws.com/avcu.github.io/tracks";

function kmlPath(activity, city) {
  return `${S3_TRACKS_BASE_URL}/kml_files/tracks_${activity}_${city_slugs[city]}.kml`;
}

let running_stats = `${S3_TRACKS_BASE_URL}/json_files/running_stats.json`;
let biking_stats = `${S3_TRACKS_BASE_URL}/json_files/biking_stats.json`;

let runningStatsData = null;
let bikingStatsData = null;

function initMap() {
  runMap = new google.maps.Map(document.getElementById("map_run"), {
    zoom: 11,
    center: locations["New York, NY"],
    disableDefaultUI: true,
  });
  runKmlLayer = new google.maps.KmlLayer({
    url: kmlPath("run", "New York, NY") + "?v=" + Date.now(),
    preserveViewport: true,
    map: runMap,
  });

  bikeMap = new google.maps.Map(document.getElementById("map_bike"), {
    zoom: 11,
    center: locations["Los Angeles, CA"],
    disableDefaultUI: true,
  });
  bikeKmlLayer = new google.maps.KmlLayer({
    url: kmlPath("bike", "Los Angeles, CA") + "?v=" + Date.now(),
    preserveViewport: true,
    map: bikeMap,
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
      if (coords && runMap) {
        runMap.setCenter(coords);
      }
      if (runKmlLayer) {
        runKmlLayer.setMap(null); // remove old layer
      }
      runKmlLayer = new google.maps.KmlLayer({
        url: kmlPath("run", city) + "?v=" + Date.now(),
        preserveViewport: true,
        map: runMap,
      });
      if (runningStatsData) {
        renderStatsData(runningStatsData, city, "run");
      }
    });
  }

  const selectBike = document.getElementById("city_select_bike");
  if (selectBike) {
    selectBike.addEventListener("change", (event) => {
      const city = event.target.value;
      const coords = locations[city];
      if (coords && bikeMap) {
        bikeMap.setCenter(coords);
      }
      if (bikeKmlLayer) {
        bikeKmlLayer.setMap(null); // remove old layer
      }
      bikeKmlLayer = new google.maps.KmlLayer({
        url: kmlPath("bike", city) + "?v=" + Date.now(),
        preserveViewport: true,
        map: bikeMap,
      });
      if (bikingStatsData) {
        renderStatsData(bikingStatsData, city, "bike");
      }
    });
  }
}

async function fetchRunningData() {
  const runningStatsResponse = await fetch(running_stats);
  runningStatsData = await runningStatsResponse.json();
  renderStatsData(runningStatsData, "New York, NY", "run");
}

async function fetchBikingData() {
  const bikingStatsResponse = await fetch(biking_stats);
  bikingStatsData = await bikingStatsResponse.json();
  renderStatsData(bikingStatsData, "Los Angeles, CA", "bike");
}

function renderStatsData(content, selectedCity, idPrefix) {
  const cityData = content.cities[selectedCity] || { num_track: 0, tot_distance_km: 0 };

  document.getElementById(`${idPrefix}_city_name`).textContent = selectedCity;
  document.getElementById(`${idPrefix}_city_activities`).textContent = cityData.num_track;
  document.getElementById(`${idPrefix}_city_distance`).textContent = `${cityData.tot_distance_km.toFixed(1)} km`;
  document.getElementById(`${idPrefix}_total_activities`).textContent = content.num_track;
  document.getElementById(`${idPrefix}_total_distance`).textContent = `${content.tot_distance_km.toFixed(1)} km`;
}

fetchRunningData();
fetchBikingData();