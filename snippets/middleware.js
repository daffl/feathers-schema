const addCreatedAt = async context => {
  context.data.createdAt = new Date();
}

const checkPermission = async context => {
  const { user } = context.params;

  // e.g. { permissions: [ 'editor', 'admin' ] }
  if (!user.permissions.includes('admin')) {
    throw new Error('You are not allowed to do this!');
  }
}
