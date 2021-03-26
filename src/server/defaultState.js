import md5 from 'md5';
export const defaultState = {
  session: {
    authenticated: false,
  },
  users: [
    {
      id: 'U1',
      name: 'Dev',
      passwordHash: md5('ENDofPROD'),
      friends: ['Main', 'Master'],
    },
    {
      id: 'U2',
      name: 'Main',
      passwordHash: md5('NewAge'),
      friends: ['Dev'],
    },
    {
      id: 'U3',
      name: 'Master',
      passwordHash: md5('WoRk'),
      friends: ['Dev'],
    },
  ],
  groups: [
    {
      name: 'To Do',
      id: 'G1',
      owner: ['U1', 'U2', 'U3'],
    },
    {
      name: 'Doing',
      id: 'G2',
      owner: ['U1', 'U2', 'U3'],
    },
    {
      name: 'Done',
      id: 'G3',
      owner: ['U1'],
    },
  ],
  tasks: [
    {
      name: 'Refactor code',
      id: 'T1',
      group: 'G1',
      owner: ['U1', 'U3'],
      access: ['Dev', 'Master'],
      isComplete: false,
    },
    {
      name: 'Implement last updates',
      id: 'T2',
      group: 'G1',
      owner: ['U1', 'U2'],
      access: ['Dev', 'Main'],
      isComplete: true,
    },
    {
      name: 'Add 404 page',
      id: 'T3',
      group: 'G2',
      owner: ['U1', 'U2'],
      access: ['Dev', 'Main'],
      isComplete: false,
    },
    {
      name: 'Resolve security issue',
      id: 'T4',
      group: 'G2',
      owner: ['U1', 'U3'],
      access: ['Dev', 'Master'],
      isComplete: true,
    },
    {
      name: 'Production optimizations',
      id: 'T5',
      group: 'G3',
      owner: ['U1'],
      access: ['Dev'],
      isComplete: false,
    },
  ],
  comments: [
    {
      owner: 'Dev',
      id: 'C1',
      task: 'T1',
      content: 'Great task!',
    },
    {
      owner: 'Main',
      id: 'C2',
      task: 'T2',
      content: 'Please send me the last updates',
    },
    {
      owner: 'Dev',
      id: 'C3',
      task: 'T4',
      content: 'Please solve this until 9 april!',
    },
  ],
};
