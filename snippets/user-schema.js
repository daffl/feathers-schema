import { schema, Type } from '@feathersjs/schema';

const User = schema({
  name: 'users'
}, {
  email: {
    type: Type.string().email().required()
  },
  age: {
    type: Number
  },
  enabled: {
    type: Boolean
  }
});