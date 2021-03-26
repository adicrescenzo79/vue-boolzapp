var app = new Vue({
  el: '#root',
  data: {
    contacts: contacts,
    newContacts: [],
  },
  mounted () {
    this.contacts.forEach((item, i) => {
      let lastMsg = item.messages[item.messages.length - 1].text;
      // console.log(newObj);

      let newItem = {
        ...item,
        lastMsg,
      }

      this.newContacts.push(newItem)


    });




  }
})
