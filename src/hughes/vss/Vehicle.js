foam.CLASS({
  package: 'hughes.vss',
  name: 'Vehicle',
  discription: 'Complete car/truck',
  implements: [
    { path: 'foam.mlang.Expressions', flags: ['js'] }
  ],
  requires: [
    'hughes.vss.Make',
    'hughes.vss.Model',
    'hughes.vss.ServiceSchedule'
  ],
  imports: [
    'makeDAO',
    'modelDAO',
    'routeTo',
    'serviceScheduleDAO'
  ],
  properties: [
    {
      name: 'id',
      class: 'String',
      visibility: 'HIDDEN'
    },
    {
      name: 'maintenanceVehicle',
      label: 'Base Model',
      class: 'Reference',
      of: 'hughes.vss.MaintenanceVehicle',
      tableCellFormatter:function(value, obj) {
        this.add (obj.toSummary());
      }
    },
    {
      name: 'trim',
      class: 'String',
      required: true
    },
    {
      name: 'colour',
      class: 'String',
      required: true
    },
    {
      name: 'vin',
      class: 'String'
    },
    {
      name: 'purchaseDate',
      class: 'Date',
      required: true
    },
    {
      name: 'purchaseodoMeter',
      class: 'Int',
      required: true
    },
    {
      name: 'serviceScheduleMenu',
      class: 'String',
      value: 'serviceSchedule',
      transient: true,
      visibility: 'HIDDEN'
    }
  ],
  methods: [
    {
      name: 'toSummary',
      code: async function () {
        var self = this;
        let mv = await this.maintenanceVehicle$find;
        return mv.toSummary();
      }
    }
  ],
  actions: [
    {
      name: 'createServiceSchedule',
      isAvaible: function(id) {
        return id;
      },
      code: function (X) {
        var self = this;
        var serviceSchedule = this.ServiceSchedule.create({
          vehicle: self.id
        });
        this.serviceScheduleDAO.put(serviceSchedule).then(function (s) {
          self.routeTo(self.serviceScheduleMenu + "/" + s.id);
        });
      }
    }
  ]
})
