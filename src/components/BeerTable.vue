<template>
  <div class="container w-full mx-auto">
    <table>
      <thead>
        <tr>
          <th @click="sort('image_url')">Image</th>
          <th @click="sort('name')">Name</th>
          <th @click="sort('tagline')">Tag Line</th>
          <th @click="sort('volume')">Volume / boil volume (liters)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="beer in getRows()" :key="beer.id">
          <td><img class="img" :src="beer.image_url"></td>
          <td>{{ beer.name }}</td>
          <td>{{ beer.tagline }}</td>
          <td>{{ beer.volume.value }} / {{ beer.boil_volume.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <div class="number"
        v-for="i in numPages()" :key="i.id"
        :class="[i == currentPage ? 'active' : '']"
        @click="changePage(i)">{{i}}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import '@/assets/styles/tailwind.css';
export default {
  data() {
    return {
      list: [],
      currentSort:'',
      currentSortDir:'',
      currentPage: 1,
      elementsPerPage: 10,
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
  methods:{
    sort:function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    numPages: function numPages() {
      return Math.ceil(this.list.length / this.elementsPerPage);
    },
    getRows: function getRows() {
      var start = (this.currentPage-1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.sortedList.slice(start, end);
    },
    changePage: function changePage(page) {
      this.currentPage = page;
    }
  },
  computed:{
    sortedList:function() {
      return this.list.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
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
.pagination {
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  width: 750px;
  padding: 8px;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #FFF;
  border-radius: 4px;
  background: #2980b9;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover, .number.active {
  background: #96f293;
}
</style>

