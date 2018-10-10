<template>
  <span v-on:click="deleteBeer(beer)">
    <font-awesome-icon class="float-right" icon="trash" size="xs" />
  </span>
</template>

<script>
export default {
  methods: {
    deleteBeer(beer) {
      this.selectedBeer = beer,
      sweetalert({
        title: 'Are you sure?',
        text: 'This beer will be permanently deleted!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Yes, delete it!',
        closeOnConfirm: false,
      },
      () => {
        const beerIndex = this.beerList.indexOf(beer);
        this.beerList.splice(beerIndex, 1);
        sweetalert('Deleted!', 'Your beer has been deleted.', 'success');
      });
    },
  }
}
</script>

