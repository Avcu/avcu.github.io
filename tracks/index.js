// Initialize and add the map
const myHome = { lat: 34.01843, lng: -118.29527 };
let running_stats = "https://avcu.github.io/tracks/data/running_stats.json";
let biking_stats = "https://avcu.github.io/tracks/data/biking_stats.json";

function initMap() {
  // The location of Uluru
  // The map, centered at Uluru
  const map_run = new google.maps.Map(document.getElementById("map_run"), {
    mapId: "8e0a97af9386fef",
    zoom: 12,
    center: myHome,
  });
  // const marker_one = new google.maps.Marker({
  //   position: myHome,
  //   map: map_run,
  // });
  const runKML = new google.maps.KmlLayer({
    url: "https://avcu.github.io/tracks/data/tracks_run.kml",
    map: map_run,
  });

  const map_bike = new google.maps.Map(document.getElementById("map_bike"), {
    zoom: 11,
    center: myHome,
  });
  const bikeKML = new google.maps.KmlLayer({
    url: "https://avcu.github.io/tracks/data/tracks_bike.kml",
    map: map_bike,
  });
}

async function fetchRunningData() {
  const runningStatsResponse = await fetch(running_stats);
  let runningStatsJSON = await runningStatsResponse.json();
  renderRunningData(runningStatsJSON);
}

async function fetchBikingData() {
  const bikingStatsResponse = await fetch(biking_stats);
  let bikingStatsJSON = await bikingStatsResponse.json();
  renderBikingData(bikingStatsJSON);
}

function renderRunningData(content){
  const divStatRun = document.getElementById("stat_run");

  let divText = document.createElement('h4');
  strStatRun = ""
  strStatRun += "Number of runs: " + content['num_track'] +"\n"
  strStatRun += "Total distance: " + content['tot_distance_km'].toFixed(1) +" km \n"
  /*
  for (var key in content){
    strStatRun += key + ": " + content[key] + " \n";
  }*/
  divText.innerText = strStatRun;
  divStatRun.appendChild(divText);
}

function renderBikingData(content){
  const divStatBike = document.getElementById("stat_bike");

  let divText = document.createElement('h4');
  strStatBike = ""
  strStatBike += "Number of bikings: " + content['num_track'] +"\n"
  strStatBike += "Total distance: " + content['tot_distance_km'].toFixed(1) +" km \n"
  divText.innerText = strStatBike;
  divStatBike.appendChild(divText);
}

fetchRunningData();
fetchBikingData();
