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
    'hughes.vss.MaintenanceVehicle',
    'hughes.vss.ServiceSchedule'
  ],
  imports: [
    'vehicleDAO',
    'maintenanceItemDAO',
    'maintenanceVehicleDAO',
    'serviceScheduleDAO'
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
        this.generateServiceItems();
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
      visibility: 'RO',
      view: function(_, X) {
        return {
          class: 'foam.u2.view.ArrayView',
          valueView: { 
            class: 'hughes.vss.MaintenanceItemCitationView', 
            showChildren: false
            },
            enableAdding: false,
            enableRemoving: false
        }
      }
    },
  ],
  methods: [
    async function generateServiceItems() {
      let self = this;
      if (!this.vehicle) return;
      let schedules = await this.serviceScheduleDAO.where(
        self.AND(
          self.EQ(self.ServiceSchedule.VEHICLE, self.vehicle)
        )
      )
        .orderBy(self.DESC(self.ServiceSchedule.SERVICE_DATE))
        .limit(1)
        .select();

      var schedule
      if (schedules.length > 0) {
        schedule = schedules[0];
      }
      this.vehicleDAO.find(this.vehicle).then(function (v) {
        var odis;
        var odate;
        if (schedule) {
          odis = schedule.distance;
          odate = schedule.serviceDate;
        } else {
          odis = v.purchaseodoMeter;
          odate = v.purchaseDate;
        }
        let ddis = self.distance - odis;
        let ddate = self.serviceDate.getTime() - odate.getTime()
        self.maintenanceVehicleDAO.find(v.maintenanceVehicle).then(function (mv) {
          self.maintenanceItemDAO.where(
            self.AND(
              self.EQ(self.MaintenanceItem.VEHICLE, mv.id),
              self.OR(
                self.LT(self.MaintenanceItem.DISTANCE, ddis),
                self.LT(self.MaintenanceItem.TIME_MILLI, ddate)
              )
            )
          ).select().then(function (items) {
            self.serviceItems = items.array;
          })
        })
      });
    }
  ]
})
