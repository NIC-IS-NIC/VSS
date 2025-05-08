foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceVehicle',
  discription: 'the style of vehicle',
  implements: [
    {      
      path: 'foam.mlang.Expressions',
      flags: ['js'],    
    }
  ],
  requires: [
    'hughes.vss.Make',
    'hughes.vss.Model'
  ],
  imports: [
    'modelDAO'
  ],
  properties: [
    {
      name: 'id',
      class: 'String',
      visibility: 'HIDDEN'
    },
    {
      name: 'make',
      class: 'Reference',
      of: 'hughes.vss.Make',
      required: true,
      postSet: function(oldValue, newValue) {
        if ( oldValue !== newValue ) {
          this.model = undefined;
        }
      }
    },
    {
      name: 'model',
      class: 'Reference',
      of: 'hughes.vss.Model',
      view: function(_, X) {
        var choices = X.data.slot(function(make) {
          return X.modelDAO.where(X.data.EQ(X.data.Model.MAKE, make || ''));
        });
        return foam.u2.view.ChoiceView.create({
          objToChoice: function(model) {
            return [model.id, model.name];
          },
          dao$: choices
        }, X);
      }
    },
    {
      name: 'year',
      class: 'Int',
      required: true
    },
  ]
})
