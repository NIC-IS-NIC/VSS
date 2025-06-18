foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceItem',
  discription: 'service items cars',
  imports: [
    'maintenanceVehicleDAO',
  ],
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
      name: 'vehicle',
      class: 'Reference',
      of: 'hughes.vss.MaintenanceVehicle',
      required: true,
      tableCellFormatter:function(value, obj) {
        obj.maintenanceVehicleDAO
        .find(value)
        .then((maintenanceVehicle)=> this.add(maintenanceVehicle.toSummary()))
        .catch((error) => this.add(value));
      }
    },
    {
      name: 'odometer',
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
    },
    {
      name: 'timeMilli',
      class: 'Long',
      visibility: 'HIDDEN',
      javaGetter: `
        return getTimeUnit().getConversionFactorMs() * getTime();
      `
    }
  ],
  methods: [
    {
      name: 'toSummary',
      code: function() {
        return this.name;
      },
    }
  ]
})
