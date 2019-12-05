import { schema, Type } from '@feathersjs/schema';

@schema({
  name: 'user'
})
class User {
  @property({
    type: Type.string().email().required()
  })
  email: string;

  @property()
  age: number;

  @property()
  enabled: boolean;
}