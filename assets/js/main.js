var app = new Vue({
  el: '#root',
  data: {
    contacts: contacts,
  },
  mounted () {
    for (var contact in this.contacts) {
      console.log(contact);
    }
  }
})
