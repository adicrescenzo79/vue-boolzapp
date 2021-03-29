var app = new Vue({
  el: '#root',
  data: {
    contacts: contacts,
    newContacts: [],
    index: 0,
    input: '',
  },

  computed: {
    this.contacts.forEach((item, i) => {
      let lastMsg = item.messages[item.messages.length - 1].text;
      let lastTime = item.messages[item.messages.length - 1].date;

      let newItem = {
        ...item,
        lastMsg,
        lastTime
      }

      this.newContacts.push(newItem);

    });
  },

  methods: {
    select: function (contact) {
      let selected = this.newContacts.indexOf(contact);
      this.index = selected;
    },
    submit: function(){
      if (this.input != ''){
        let newMsg = {
          date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
          text: this.input,
          status: 'sent',
        }
        this.newContacts[this.index].messages.push(newMsg);
        this.input = '';
        setTimeout(function(){
          newMsg = {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: 'ok',
            status: 'received',
          };
          this.newContacts[this.index].messages.push(newMsg);
        }, 2000);
      }
    }
  }
})
