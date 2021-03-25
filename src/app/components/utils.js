export const taskColor = taskName => {
  switch (taskName) {
    case 'To Do':
      return 'btn-danger';
    case 'Doing':
      return 'btn-warning';
    case 'Done':
      return 'btn-success';
    default:
      return 'btn-dark';
  }
};
