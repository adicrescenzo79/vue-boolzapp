var app = new Vue({
  el: '#root',
  data: {
    contacts: contacts,
    newContacts: [],
  },
  mounted () {
    this.contacts.forEach((item, i) => {
      let lastMsg = item.messages[item.messages.length - 1].text;
      let lastTime = item.messages[item.messages.length - 1].date;

      let newItem = {
        ...item,
        lastMsg,
        lastTime
      }

      this.newContacts.push(newItem)


    });




  }
})
