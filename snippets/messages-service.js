const feathers = require('@feathersjs/feathers');

class MessageService {
  constructor() {
    this.messages = [];
  }

  async find () {
    return this.messages;
  }

  async create (data) {
    const message = {
      ...data,
      id: this.messages.length
    };

    this.messages.push(message);

    return message;
  }
}

const app = feathers();

app.use('messages', new MessageService());

app.service('messages').hooks({
  before: {
    create: async context => {
      context.data.createdAt = new Date();
    }
  }
});

app.service('messages').on('created', message => {
  console.log('A new message has been created', message);
});

const main = async () => {
  await app.service('messages').create({
    text: 'Hello Feathers'
  });

  await app.service('messages').create({
    text: 'Hello again'
  });

  const messages = await app.service('messages').find();

  console.log('All messages', messages);
};

main();
