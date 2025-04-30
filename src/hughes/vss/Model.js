foam.CLASS({
  package: 'hughes.vss',
  name: 'Model',
  discription: 'the style of vehicle',
  properties: [
    {
      name: 'id',
      class: 'String',
      visibility: 'HIDDEN'
    },
    {
      name: 'make',
      class: 'Reference',
      of: 'hughes.vss.Make'
    },
    {
      name: 'name',
      class: 'String'
    }
  ]
})
