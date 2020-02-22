<template>
  <div class="hello">
    <div id="myMap"></div>
    <br />
    <b-col lg="4" class="pb-2">
      <b-button style="background-color: #2c3e50;" @click="SetMark">
        <img src="../../static/img/spot2.png" alt="Smiley face" height="30" width="30" />
        <span>Save Spot</span>
      </b-button>
    </b-col>
    <br />
    <b-table striped hover :items="locationSaved" :fields="fields">
      <template v-slot:cell(Maps)="row">
        <img src="../../static/img/google-maps.png"  @click="clickOnMap(row.item, row.index, $event.target)"/>
      </template>

    </b-table>
    <br />
  </div>
</template>

<script src="./SpotController.js">
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
