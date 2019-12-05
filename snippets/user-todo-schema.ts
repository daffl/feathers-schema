import { schema, Type } from '@feathersjs/schema';

@schema({
  name: 'user'
})
class User {
  @property()
  id: number;

  @property({
    type: Type.string().email().required()
  })
  email: string;
}

@schema({
  name: 'todo'
})
class Todo {
  @property()
  text: string;

  @property()
  completed: boolean;

  @property()
  userId: number;

  @property({
    async resolve (todo, context) {
      return context.app.service('users')
        .get(todo.userId, context.params);
    }
  })
  user: User
}
