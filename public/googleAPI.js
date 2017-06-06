if(localStorage.markers === undefined){
  markers = [];
}
else markers = JSON.parse(localStorage.getItem("markers"));

// Define Marker Shapes
var TENT = 'M 20.997,20.975 12.196,20.975 10.997,9.005 9.809,20.975 0.997,20.975 10.997,1.505 z';
var MAP_PIN = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
var SQUARE_PIN = 'M22-48h-44v43h16l6 5 6-5h16z';
var SHIELD = 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z';
var ROUTE = 'M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z';
var SQUARE = 'M-24-48h48v48h-48z';
var SQUARE_ROUNDED = 'M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z';
var directionsService;
var hidemarkers = [];
var directionsDisplay;
function initMap(){
    directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true
    });
  	directionsService = new google.maps.DirectionsService();
    var rijeka = new google.maps.LatLng(45.328343,14.446383);
    var zagreb = new google.maps.LatLng(45.815399,15.966568);
        map = new google.maps.Map(document.getElementById('map'),{
            zoom: 13,
            center: rijeka,
            styles: [{
        "featureType": "all",
        "elementType": "all",
        "stylers": [
          {"hue": "#00ffc8"},
          {"visibility": "simplified"},
          {"lightness": "22"}
                  ]
                }]
        });

        map.addListener("click",function(e){
          latLng = e.latLng;
          markerModal();
          $('#title'  ).val(null);
          $('#description').val(null);
        });
          directionsDisplay.setMap(map);
          google.maps.event.addDomListener(document.getElementById('routebtn'), 'click', calcRoute);
          var search = new google.maps.Geocoder();

          document.getElementById('submit').addEventListener('click', function() {
            findAdresse(search, map);
          });
       var symbolOne = {
         path: 'M -2,0 0,-2 2,0 0,2 z',
         strokeColor: '#F00',
         fillColor: '#F00',
         fillOpacity: 2
       };
       var symbolThree = {
         path: 'M -2,-2 2,2 M 2,-2 -2,2',
         strokeColor: '#292',
         strokeWeight: 4
       };
        var lineSymbol = {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
          };
        var line = new google.maps.Polyline({
          path: [rijeka, zagreb],
          strokeColor: "#FF0000",
          strokeOpacity: 1,
        icons: [{icon: lineSymbol,
        offset: '100%'},
          {icon: symbolOne,
          offset: '0%'},
        {icon: symbolThree,
      offset: '100%'}],
          map: map
        });
       animate(line); // Polyline u sustini nema nikakvu svrhu :)

       var rijeka = {lat: 45.328343,lng: 14.446383};
       var zagreb = {lat: 45.815399,lng: 15.966568};
       var a = getDistance(rijeka,zagreb);
       console.log(a)
}
function calcRoute() {
    var a ;

    if(document.getElementById("mode").value == "WALKING"){
      a = google.maps.TravelMode.WALKING;
    }else if(document.getElementById("mode").value == "DRIVING"){
      a = google.maps.TravelMode.DRIVING;
    }
    var start = new google.maps.LatLng(45.328767,14.447339);
    var end = new google.maps.LatLng(45.327411,14.467500);
    var request = {
    origin: start,
    destination: end,
    travelMode: a
  };
    directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      directionsDisplay.setMap(map);
    } else {
      alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
    }
  });
}

function animate(line){
  var count = 0;
  window.setInterval(function(){
    count = (count+1) % 200;
    var icons = line.get('icons');
    icons[0].offset = (count / 2) + '%';
    line.set('icons',icons);
  },2);
}

var rad = function(x) {
  return x * Math.PI / 180;
}; // vraca udaljenost u metrima po zracnoj liniji isto nema bas neke koristi od toga..
var getDistance = function(p1, p2) {
  var R = 6378137;
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

function loadMarkers(){
    for (var i = 0;i<markers.length;i++){
        loadedMarkersPlacer(markers[i]);
        addMarkerTimeout(markers[i].position, i * 200);
      }
}

function loadedMarkersPlacer(marker){
    var flagIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    var loadedMarkers = new google.maps.Marker({
            position: marker.latLng,
      //    draggable:true,
            animation: google.maps.Animation.DROP,
            content: marker.naslov,
            visible: marker.visible
          });
        loadedMarkers.setMap(map);
        hidemarkers.push(loadedMarkers);
        loadedMarkers.addListener("click",function(){
              $('#title').val(marker.naslov);
              $('#description').val(marker.opis);
              $('#myModal').modal();
              setPosition(loadedMarkers.position);
            });
    var infowindow = new google.maps.InfoWindow();
        loadedMarkers.addListener("mouseover",function(){
            infowindow.setContent(marker.naslov);
            infowindow.open(map,loadedMarkers);
          });
        loadedMarkers.addListener("mouseout",function(){
        infowindow.close();
      });
}

function markerModal(){
  $('#myModal').modal();
}
var clr = null;
var num = null;
var colors = document.querySelectorAll(".btn-group > button.btn-primary");
for (var i =0;i<colors.length;i++){
  colors[i].addEventListener("click",function(){
    num = this.value;
    if(num == 1){
      document.getElementById("A").style.backgroundColor = "#e55e5e";
    }else if(num == 2){
      document.getElementById("A").style.backgroundColor = "#3bb2d0";
    }else if(num == 3){
      document.getElementById("A").style.backgroundColor = "#ed6498";
    }else if(num == 4){
      document.getElementById("A").style.backgroundColor = "#c091e6";
    }else if(num == 5){
      document.getElementById("A").style.backgroundColor = "#89f442";
    }else if(num == 6){
      document.getElementById("A").style.backgroundColor = "#fff";
    }else if(num == 7){
      document.getElementById("A").style.backgroundColor = "#fa946e";
    }else if(num == 8){
      document.getElementById("A").style.backgroundColor = "#efeb07";
    }else if(num == 9){
      document.getElementById("A").style.backgroundColor = "#5c5e5a";
    }
  });
}
document.getElementById("buttonSave").addEventListener("click",function(){
    var privates;
    var vip = document.getElementsByName("optradio");
    for (var i=0;i<vip.length;i++){
        if(vip[i].checked == true){
            privates = vip[i].value;
            console.log(privates);
          }
        }
      clr = "#e55e5e";
      if(num == 1){
        clr = "#e55e5e";
      }else if(num == 2){
        clr = "#3bb2d0";
      }else if(num == 3){
        clr = "#ed6498";
      }else if(num == 4){
        clr = "#c091e6";
      }else if(num == 5){
        clr = "#89f442";
      }else if(num == 6){
        clr = "#fff";
      }else if(num == 7){
        clr = "#fa946e";
      }else if(num == 8){
        clr = "#efeb07";
      }else if(num == 9){
        clr = "#5c5e5a";
      }
    var naslov = document.getElementById("title").value;
    var opis = $('#description').val();
    markerPlacer(naslov,opis,vip,clr);
});

function markerPlacer(desc,title,vip,color){
    //var icon = 'https://chart.googleapis.com/chart?' +
      //      'chst=d_map_pin_letter&chld=O|FFFF00|000000';
var frendsMarkers = { url: "http://www.primeracoop.com/assets/pin.svg",
  scaledSize: new google.maps.Size(50,50)}; // kao neki plavi marker sa krugom ispod sebe za markere od prijatelja ... nista spec
    var marker = new google.maps.Marker({
          position: latLng,
           icon: {
          		path: MAP_PIN,
          		fillColor: color,
          		fillOpacity: 1,
          		strokeColor: "black",
          		strokeWeight: 1
          	},
      //  draggable:true,
          animation: google.maps.Animation.DROP,
        //  content: title + '<button class="btn btn-warning pull-left"' +
          //  'id="delete" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Delete</button>'
          });
        marker.setMap(map);
        hidemarkers.push(marker);
        marker.addListener("click",function(e){
            $('#myModal').modal();
          setPosition(marker.position);
            $('#title').val(title);
            $('#description').val(desc);
          });
    var infowindow = new google.maps.InfoWindow({
            maxWidth: 200
    });

  //slika: var content =  '<img src="rijeka.jpg" alt="Porcelain Factory of Vista Alegre" height="200" width="450">';
        marker.addListener("mouseover",function(){
              infowindow.setContent(this.content);
              infowindow.open(map,marker);
          });
        /*marker.addListener("mouseout",function(){
            infowindow.close();
          });*/

    var markerForSave = {
          naslov: marker.content,
          latLng: latLng,
          opis: desc,
          visible: true,
          privates: privates
        };
      markers.push(markerForSave);
}

function hideMarkers(){
  for (var i=0;i<hidemarkers.length;i++){
//    hidemarkers[i].visible = false;
    hidemarkers[i].setMap(null);
  }
}
function setMarkers(){
  for (var i=0;i<hidemarkers.length;i++){
    hidemarkers[i].visible = true;
    hidemarkers[i].setMap(map);
  }
}

function findAdresse(search,resultsMap){
    var adresa = document.getElementById('address').value;
    search.geocode({'address': adresa},function(results,status){
          if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
          }
          else {
              alert('Geocode was not successful for the following reason: ' + status);
          }
      });
}
var poz;
function setPosition(x){
    poz = x;
}
function getPosition(){
  return poz;
}
document.getElementById("delete").addEventListener("click",function(){
      var count = 0;
      var p = getPosition();
      for (var i=0;i<hidemarkers.length;i++){
          if(hidemarkers[i].position === p){
            hidemarkers[i].setMap(null);
          }
      }
      var x = p.toString();
        for(var i = 0;i<markers.length;i++){
          var a = (markers[i].latLng.lat) ;
            count++;
            if(x === markers[i].latLng){
                markers.splice(count-1,1);
              }
            }
});
function deleteMarkers(){
    hideMarkers();
    hidemarkers = null ;
    localStorage.removeItem("markers");
}

function spremiPodatke(){
//    localStorage.removeItem("markers");
    localStorage.setItem("markers", JSON.stringify(markers));
}
function goHome(){
  map.setCenter(new google.maps.LatLng(45.328343,14.446383));
  map.setZoom(15);
}
