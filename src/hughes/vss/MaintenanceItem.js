foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceItem',
  discription: 'service items cars',
  properties: [
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
      class: 'Int',
      required: true
    },
    {
      name: 'time',
      class: 'Int',
      required: true
    },
    {
      name: 'timeUnit',
      class: 'Enum',
      of: 'foam.time.TimeUnit',
      value: 'MONTH'
    }
  ]
})
