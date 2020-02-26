
export default {
  name: "spot",
  created() {
    //do we support geolocation
    if (!("geolocation" in navigator)) {
      this.errorStr = "Geolocation is not available.";
      return;
    }
    this.infoWindow = new google.maps.InfoWindow();
    this.gettingLocation = true;
    // get position
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = false;
        this.locationFirst = pos;
      },
      err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
    this.locateMe();
  },
  watch: {
    location: function(val) {
      var latlng = new google.maps.LatLng(
        val.coords.latitude,
        val.coords.longitude
      );
      this.map = new google.maps.Map(document.getElementById("myMap"), {
        center: latlng,
        zoom: 17,
        disableDefaultUI: true,
        draggable: false,
        scrollwheel: true,
        draggableCursor:
          "url(http://s3.amazonaws.com/besport.com_images/status-pin.png), auto"
      });
      var beachMarker = new google.maps.Marker({
        position: latlng,
        map: this.map
      });
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.location = this.locationFirst;
    });
    if (localStorage.locationSaved) {
        this.locationSaved = JSON.parse(localStorage.locationSaved);
    }
  },
  data() {
    return {
      map: null,
      iconBase:
        "https://developers.google.com/maps/documentation/javascript/examples/full/images/",
      infoWindow: null,
      locationFirst: null,
      location: null,
      gettingLocation: false,
      errorStr: null,
      newName: '',
      msg: "Welcome to Save Your Spot App",
      fields: ["Spot", "Maps"],
      locationSaved: []
    };
  },
  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
      } catch (e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }
    },
    initMap(lat, long) {
      var myLatLng = {lat: lat, lng: long};

      var map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 4,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    },
    SetMark() {
      
      this.locationSaved.push({
        latitude: this.location.coords.latitude,
        longitude: this.location.coords.longitude
      });

      this.$localStorage.set(`locationSaved`, JSON.stringify(this.locationSaved))
    },
    clickOnMap(item, index, target){
        let locations = this.$localStorage.get(`locationSaved`)
        let locationsJSON = JSON.parse(locations)
        window.open(`https://www.google.com/maps/search/?api=1&query=${locationsJSON[index].latitude},${locationsJSON[index].longitude}`)
    },
    clickEdit(item, index, target){
      
      let locations = this.$localStorage.get(`locationSaved`)
      let locationsJSON = JSON.parse(locations)
      locationsJSON[index].nome = this.newName
      this.newName = ''
      this.$localStorage.set(`locationSaved`, JSON.stringify(locationsJSON))
      this.$nextTick(() => {
        this.locationSaved = JSON.parse(localStorage.locationSaved);
      })
    },
    clickDelete(item, index, target){  
      let locations = this.$localStorage.get(`locationSaved`)
      let locationsJSON = JSON.parse(locations)
      locationsJSON = locationsJSON.filter(item => item !== locationsJSON[index])
      this.$localStorage.remove(`locationSaved`)
      this.$localStorage.set(`locationSaved`, JSON.stringify(locationsJSON))
      this.$nextTick(() => {
        this.locationSaved = JSON.parse(localStorage.locationSaved);
      })
    },
  }
};