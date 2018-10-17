<template>
  <div>
    try {
      const { data } = await axios.get("https://api.punkapi.com/v2/beers", {
        params: {
          page: 2,
          per_page: 10
        }
      });
      this.list = data;
    } catch (e) {
      console.error(e)
    },
    numPages: function numPages() {
      return Math.ceil(this.list.length / this.elementsPerPage);
    },
    getRows: function getRows() {
      var start = (this.currentPage-1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.sortedList.slice(start, end);
    },
    this.currentPage = currentPage
      const newParams = {...this.params, currentPage: page}
      this.params = newParams
      this.getBeerList(newParams)
  </div>
</template>
