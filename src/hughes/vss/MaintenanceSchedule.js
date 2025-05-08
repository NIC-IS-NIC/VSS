foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceSchedule',
  discription: 'List of Maintenance items for vehicle',
  implements: [
    {      
      path: 'foam.mlang.Expressions',
      flags: ['js'],    
    }
  ],
  requires: [
    'hughes.vss.MaintenanceItem',
    'hughes.vss.MaintenanceVehicle'
  ],
  imports: [
    'maintenanceItemDAO'
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
      of: 'hughes.vss.MaintenanceVehicle'
    },
    {
      name: 'name',
      class: 'String'
    },
    {
      name: 'maintenanceItems',
      class: 'Array',
      view: function(_,X) {
        var maintenanceItemDAOSlot = X.data.slot(vehicle => {
          return X.maintenanceItemDAO.where(X.data.EQ(X.data.MaintenanceItem.VEHICLE,vehicle));
        });
        return {
          class: 'foam.u2.view.ReferenceArrayView',
          daoKey: 'maintenanceItemDAO',
          allowDuplicates: false,
          valueView: {
            class: 'foam.u2.view.RichChoiceReferenceView',
            search: true,
            sections: [
              {
                heading: 'Maintenance Items',
                dao$: maintenanceItemDAOSlot
              }
            ]
          }
        }
      },
      readVisibility: 'RO',
      updateVisibility: 'RO'
    },

  ]
})
