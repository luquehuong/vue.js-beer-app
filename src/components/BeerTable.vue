<template>
  <div class="container w-full mx-auto">
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Tag Line</th>
          <th>Volume / boil volume (liters)</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="beer in list" 
          :key="beer.id"
        >
          <td><img class="img" :src="beer.image_url"></td>
          <td>{{ beer.name }}</td>
          <td>{{ beer.tagline }}</td>
          <td>{{ beer.volume.value }} / {{ beer.boil_volume.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import '@/assets/styles/tailwind.css';
export default {
  data() {
    return {
      list: [],
    };
  },
  async created() {
    try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers");
      this.list = data;
    } catch (e) {
      console.error(e)
    }
  },
}
</script>
<style scoped>

img {
  width: 20px;
  height: 70px;
}

table {
  font-family: 'Open Sans', sans-serif;
  width: 100%;
}

table th {
  width: 25%;
  padding: 1rem;
  text-transform: uppercase;
  text-align: center;
  background: #2980b9;
  color: #FFF;
  cursor: pointer;
}
table th:hover {
  background: #2472a5;
}
table td {
  padding: 0.25rem;
  text-align: center;
  border-right: 1px solid #afc5d3;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #e5f1f9;
}
</style>

