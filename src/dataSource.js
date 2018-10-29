
export const inputData = {
    data: [
      {
        id: 1, 
        name: 'T1',
        duration: 8,
        dependencies: null,
      },
      {
        id: 2,
        name: 'T2',
        duration: 15,
        dependencies: null,
      },
      {
        id: 3,
        name: 'T3',
        duration: 15,
        dependencies: ['T1'],
      },
      {
        id: 4,
        name: 'T4',
        duration: 10,
        dependencies: null,
      },
      {
        id: 5,
        name: 'T5',
        duration: 10,
        dependencies: ['T2', 'T4'],
      },
      {
        id: 6,
        name: 'T6',
        duration: 5,
        dependencies: ['T1', 'T2'],
      },
      {
        id: 7, 
        name: 'T7',
        duration: 20,
        dependencies: ['T1'],
      },
      {
        id: 8,
        name: 'T8',
        duration: 25,
        dependencies: ['T4'],
      },
      {
        id: 9,
        name: 'T9',
        duration: 15,
        dependencies: ['T3','T6'],
      },
      {
        id: 10,
        name: 'T10',
        duration: 15,
        dependencies: ['T5','T7'],
      },
      {
        id: 11,
        name: 'T11',
        duration: 7,
        dependencies: ['T9'],
      },
      {
        id: 12,
  
        name: 'T12',
        duration: 10,
        dependencies: ['T11'],
      }
    ]
  }