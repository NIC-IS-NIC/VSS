foam.CLASS({
  package: 'hughes.vss',
  name: 'ServiceSchedule',
  discription: '',
  implements: [
    'foam.core.auth.CreatedAware',
    'foam.core.auth.LastModifiedAware',
    { path: 'foam.mlang.Expressions', flags: ['js'] }
  ],
  requires: [
    'hughes.vss.Vehicle',
    'hughes.vss.MaintenanceItem',
    'hughes.vss.MaintenanceVehicle'
  ],
  imports: [
    'vehicleDAO',
    'maintenanceItemDAO',
    'maintenanceVehicleDAO'
  ],
  properties: [
    {
      name: 'id',
      class: 'String',
      visibility: 'HIDDEN'
    },
    {
      name: 'vehicle',
      class: 'Reference',
      of: 'hughes.vss.Vehicle',
      tableCellFormatter:function(value, obj) {
        obj.VehicleDAO
        .find(value)
        .then((Vehicle)=> this.add(Vehicle.toSummary()))
        .catch((error) => this.add(value));
      },
      visibility: 'RO'
    },
    {
      name: 'serviceDate',
      class: 'Date',
      factory: function () {return new Date();},
      postSet: function (old,nu) {
        this. generateServiceItems();
      }
    },
    {
      name: 'distance',
      class: 'Int',
      required: true,
      postSet: function (old,nu) {
        this.generateServiceItems();
      }
    },
    {
      name: 'serviceItems',
      class: 'FObjectArray',
      of: 'hughes.vss.MaintenanceItem',
      visibility: 'RO'
    },
  ],
  methods: [
    // {
    //   name: 'generateServiceItems',
    //   code: function () { }
    // }
  function generateServiceItems () {
    //search vehicle in maintenance vehicledao for maintenance vehicle.
    //take maintenance vehicle then search maintenanceITem DAo 
    //then add the maintenance item to a service scheduel 
    let self = this;
    if (!this.vehicle) return;
    this.vehicleDAO.find(this.vehicle).then(function(v){
      self.maintenanceVehicleDAO.find(v.maintenanceVehicle).then(function(mv){
        self.maintenanceItemDAO.where(self.EQ(self.MaintenanceItem.VEHICLE,mv.id)).select().then(function(items){
          self.serviceItems = items.array;
        })
      })
    });
  }
]
})
