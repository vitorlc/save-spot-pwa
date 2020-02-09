<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br />
    <!-- <p>
      Let us locate you for better results...
      <button @click="locateMe">Get location</button>
    </p>

    <div v-if="errorStr">
      Sorry, but the following error
      occurred: {{errorStr}}
    </div>

    <div v-if="gettingLocation">
      <i>Getting your location...</i>
    </div>

    <div
      v-if="location"
    >Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}</div>-->
    <div id="myMap"></div>
    <br />
    <b-col lg="4" class="pb-2">
      <b-button style="background-color: #2c3e50;" @click="SetMark">
        <img src="../../static/img/spot2.png" alt="Smiley face" height="30" width="30" />
        <span>Save Spot</span>
      </b-button>
    </b-col>
    <br />
    <b-table striped hover :items="locationSaved" :fields="fields"></b-table>
    <br />
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap";
import Import from "../../static/img/spot2.png";

export default {
  name: "spot",
  components: {
    GoogleMap
  },
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
        draggable: false
        // scrollwheel: true,
        // draggableCursor:
        //   "url(http://s3.amazonaws.com/besport.com_images/status-pin.png), auto"
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
      msg: "Welcome to Save Your Spot App",
      fields: ["latitude", "longitude"],
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
    SetMark() {
      this.locationSaved.push({
        latitude: this.location.coords.latitude,
        longitude: this.location.coords.longitude
      });
      console.table(this.locationSaved);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#myMap {
  height: 300px;
  width: 100%;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}

.map-container {
  width: 500px;
  height: 300px;
}
</style>
