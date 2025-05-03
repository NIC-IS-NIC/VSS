foam.CLASS({
  package: 'hughes.vss',
  name: 'Maintenance',
  discription: 'service for cars',
  properites: [
    {
      name: 'id',
      class: 'String',
      label: 'Name',
      required: true
    },
    {
      name: 'distance',
      class: 'Int',
      required: true
    },
    {
      name: 'date',
      class: 'date'
    }
  ]
})