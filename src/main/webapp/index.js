let map;

async function initMap() {
  //@ts-ignore
  
  
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.02127561489714, lng: -118.2866354425022 },
    zoom: 15,
    options : {disableDefaultUI: true,
		  clickableIcons: false,
		  mapId: "f3947d79eba2c6f"}
  });
  const image = "img/purple_Marker.png"
  const marker = new google.maps.Marker({
    position: { lat: 34.02127561489714, lng: -118.2866354425022 },
    map : map,
    title: "USC",
    icon: image
  });
  const marker2 = new google.maps.Marker({
    position: { lat: 34.02672700908403, lng: -118.27787745112164 },
    map : map,
    title: "Starbucks",
    icon: image
  });
  const marker3 = new google.maps.Marker({
    position: { lat: 34.02280700654238, lng: -118.29219754150525 },
    map : map,
    title: "It's Boba Time!",
    icon: image
  });
  const marker4 = new google.maps.Marker({
    position: { lat: 34.02952079190507, lng: -118.27671604256105 },
    map : map,
    title: "St. Vincent de Paul Roman Catholic Church",
    icon: image
  });
  const marker5 = new google.maps.Marker({
    position: { lat: 34.04155023682147, lng: -118.23265898862519 },
    map : map,
    title: "Verve Coffee",
    icon: image
  });
  const marker6 = new google.maps.Marker({
    position: { lat: 34.02543959124908, lng: -118.28529505463163 },
    map : map,
    title: "Dulce",
    icon: image
  });
  const marker7 = new google.maps.Marker({
    position: { lat: 34.02518619024948, lng: -118.28449970330696 },
    map : map,
    title: "CAVA",
    icon: image
  });
}
initMap();