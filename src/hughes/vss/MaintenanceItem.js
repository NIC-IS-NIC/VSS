foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceItem',
  discription: 'service items cars',
  properites: [
    {
      name: 'id',
      class: 'String',
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO'
    },
    {
      name: 'name',
      class: 'String',
      required: true
    },
    {
      name: 'distance',
      class: 'Int'
    },
    {
      name: 'frequency',
      class: ''
    }
  ]
})