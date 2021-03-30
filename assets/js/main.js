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
    sound: new Audio('./assets/sounds/ring.mp3'),
  },

  created: function(){

    this.contacts.forEach((contact, i) => {
      contact.messages.forEach((message, k) => {
        let temp = message.date.split(' ')[0];
        let temp1 = temp.split('/');
        let newDate = temp1[2] + '-' + temp1[1] + '-' + temp1[0] + ' ' + message.date.split(' ')[1];
        message.date = newDate;
      });
    });

    this.contacts = this.contacts.map((contact, i) => {
      let unReaded = false;
      let newContact = {
        ...contact,
        unReaded,
      };
      return newContact;
    });

    setTimeout(() => {
      newMsg = {
        date: dayjs().format('dddd MM/DD/YYYY HH:mm:ss'),
        text: 'Ma dove stavi ieri sera?',
        status: 'received',
      };
      this.contacts[3].messages.push(newMsg);
      this.contacts[3].unReaded = true;
      this.sound.play();
      this.newUp();
    }, 15000);

    setTimeout(() => {
      newMsg = {
        date: dayjs().format('dddd MM/DD/YYYY HH:mm:ss'),
        text: 'Puoi prestarmi 20€?',
        status: 'received',
      };
      this.contacts[6].messages.push(newMsg);
      this.contacts[6].unReaded = true;
      this.sound.play();
      this.newUp();
    }, 20000);

    // let tempNew =

  },

  methods: {
    getTime: function(date){
      let dateTime = new Date(date);
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      return `${hours}:${minutes}`;
    },

    newUp: function(){

      // for (var variable in object) {
      //   if (object.hasOwnProperty(variable)) {
      //
      //   }
      // }
      // let tempNew = [];
      // let tempOthers = [];
      // this.contacts.forEach((contact, i) => {
      //   if (this.contacts[i].unReaded) {
      //     tempNew = this.contacts[i];
      //     this.contacts.splice(i, 1);
      //
      //   };
      //
      //   tempOthers = {
      //     ...tempNew,
      //     ...this.contacts,
      //   };
      //
      //   this.contacts = tempOthers;
      // });

      // this.contacts = this.contacts.map((contact, i) => {
      //   let tempNew = [];
      //   if (this.contacts[i].unReaded) {
      //     tempNew = contacts[i];
      //     this.contacts.splice(i, 1);
      //     console.log(tempNew);
      //     console.log(this.contacts);
      //
      //   };
      //   return {
      //     ...tempNew,
      //     ...this.contacts,
      //   };
      //
      // });
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
      this.contacts[this.index].unReaded = false;
      this.input = '';
    },

    submit: function(){
      if (this.input != ''){
        let newMsg = {
          date: dayjs().format('dddd MM/DD/YYYY HH:mm:ss'),
          text: this.input,
          status: 'sent',
        };
        let indexNow = this.index;
        this.contacts[indexNow].messages.push(newMsg);
        this.input = '';

        setTimeout(() => {
          newMsg = {
            date: dayjs().format('dddd MM/DD/YYYY HH:mm:ss'),
            text: 'smettila di scrivermi o ti denuncio x stalking! MANIACO!',
            status: 'received',
          };
          this.contacts[indexNow].messages.push(newMsg);
          this.contacts[indexNow].unReaded = true;
          this.sound.play();
          this.newUp();
        }, 2000);
      }
    },

    options: function(message, i){
      if (this.msgIndex != i) {

        this.msgIndex = i;
      } else {
        this.msgIndex = -1;
      }
    },

    remove: function(i){
      this.contacts[this.index].messages.splice(i, 1);

      this.msgIndex = -1;
    },
  }
})
