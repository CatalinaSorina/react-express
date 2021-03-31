import { addNewTask, updateTask } from './routes';

(async function func() {
  await addNewTask({
    name: 'New task',
    id: '12Test',
  });

  await updateTask({
    id: '12Test',
    name: 'My task is updated !',
  });
})();
