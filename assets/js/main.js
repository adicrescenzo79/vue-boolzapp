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
    menuIndex: -1,
    // elementFreccia1: i.freccia-dx.fas.fa-angle-double-right,
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
      let unRead = false;
      let open = true;
      let newContact = {
        ...contact,
        unRead,
        open,
      };
      return newContact;
    });

    setTimeout(() => {
      newMsg = {
        date: dayjs().format('dddd MM/DD/YYYY HH:mm:ss'),
        text: 'Ma dove stavi ieri sera?',
        status: 'received',
      };
      let randomContact = this.randomNumberInRange(0, this.contacts.length - 1);
      this.contacts[randomContact].messages.push(newMsg);
      this.contacts[randomContact].unRead = true;
      this.sound.play();
      this.newUp();
    }, 15000);

    setTimeout(() => {
      newMsg = {
        date: dayjs().format('dddd MM/DD/YYYY HH:mm:ss'),
        text: 'Puoi prestarmi 20€?',
        status: 'received',
      };
      let randomContact = this.randomNumberInRange(0, this.contacts.length - 1);
      this.contacts[randomContact].messages.push(newMsg);
      this.contacts[randomContact].unRead = true;
      this.sound.play();
      this.newUp();
    }, 20000);


  },


  methods: {

    nonLetto: function(i){
      this.contacts[i].unRead = true;
      this.menuIndex = -1;
      this.contacts[i].open = true;
      this.newUp();
    },


    randomNumberInRange: function(min, max){
      return Math.floor(Math.random() * max) + min;
    },

    select: function (contact) {
      let selected = this.contacts.indexOf(contact);
      this.index = selected;
      this.msgIndex = -1;
      this.contatti = '';
      this.messaggi = 'active';
      this.contacts[this.index].unRead = false;
      this.input = '';
    },


    openMenu: function(i){
      this.menuIndex = i;
      this.contacts[i].open = false;

    },

    closeMenu: function(i){
      this.menuIndex = -1;
      this.contacts[i].open = true;

    },

    cancella: function(i){
      this.contacts.splice(i, 1);
      this.menuIndex = -1;
      this.contacts[i].open = true;

    },

    getTime: function(date){
      let dateTime = new Date(date);
      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      return `${hours}:${minutes}`;
    },

    newUp: function(){
      // SALVO IN UNA VARIABILE IL CONTATTO ATTUALMENTE SELEZIONATO
      let actualContact = this.contacts[this.index];

      let msgUnread = this.contacts.filter((contact) => contact.unRead);
      let msgRead = this.contacts.filter((contact) => !contact.unRead);

      this.contacts = [...msgUnread, ...msgRead];

      // FACCIO IN MODO CHE RIMANGA SELEZIONATO LO STESSO CONTATTO
      let actualIndex = this.contacts.indexOf(actualContact);
      this.index = actualIndex;
    },


    back: function(){
      this.contatti = 'active';
      this.messaggi = '';
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
          this.contacts[indexNow].unRead = true;
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
