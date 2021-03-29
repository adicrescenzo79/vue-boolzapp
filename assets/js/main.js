var app = new Vue({
  el: '#root',
  data: {
    contacts: contacts,
    index: 0,
    input: '',
    searchInput: '',
    nameIndex: '',
  },

  methods: {
    getTime: function(date){
      let hours = date.split(' ')[1];
      let hoursSplit = hours.split('');
      let noSeconds = hoursSplit.splice(0, 5);
      dateNew = noSeconds.join('');
      console.log(dateNew);
      return `${dateNew}`;
    },

    select: function (contact) {
      let selected = this.contacts.indexOf(contact);
      this.index = selected;
    },

    submit: function(){
      if (this.input != ''){
        let newMsg = {
          date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
          text: this.input,
          status: 'sent',
        }
        this.contacts[this.index].messages.push(newMsg);
        this.input = '';

        setTimeout(() => {
          newMsg = {
            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            text: 'ok',
            status: 'received',
          };
          this.contacts[this.index].messages.push(newMsg);
        }, 2000);
      }
    },

  }
})
