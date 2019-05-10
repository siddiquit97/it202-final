// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 11
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }


        $.get("https://data.cityofchicago.org/resource/gkur-vufi.json",

          function(response) {
            console.log("in data callback");
            var data = response;
            createMarkers(map, data);
        });
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      function createMarkers (map, data) {
        console.log(data);
        $.each(data, function(i,v) {

          var location = {lat: parseFloat(v.location.latitude), lng: parseFloat(v.location.longitude) }
          
          var marker = new google.maps.Marker({position: location, map: map});

          var infowindow = new google.maps.InfoWindow({
            content: v.dba_name
          });

          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });

        });
      }