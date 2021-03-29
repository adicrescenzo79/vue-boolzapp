var app = new Vue({
  el: '#root',
  data: {
    contacts: contacts,
    index: 0,
    input: '',
    searchInput: '',
    msgIndex: -1,
    contatti: 'active',
    messaggi: '',
    option: 'false',
  },

  methods: {
    getTime: function(date){
      let hours = date.split(' ')[1];
      let hoursSplit = hours.split('');
      let noSeconds = hoursSplit.splice(0, 5);
      dateNew = noSeconds.join('');
      return `${dateNew}`;
    },

    back: function(){
      this.contatti = 'active';
      this.messaggi = '';
    },

    select: function (contact) {
      let selected = this.contacts.indexOf(contact);
      this.index = selected;
      this.msgIndex = -1;
      this.contatti = '';
      this.messaggi = 'active';
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

    options: function(i){
      this.msgIndex = i;
      this.option = !this.option;
    },

    remove: function(i){
      console.log(i);
      this.contacts[this.index].messages.splice(i, 1);
      this.msgIndex = -1;
    },
  }
})
