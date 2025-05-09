foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceVehicle',
  discription: 'the style of vehicle',
  implements: [
    { path: 'foam.mlang.Expressions', flags: ['js'] }
  ],
  requires: [
    'hughes.vss.Make',
    'hughes.vss.Model'
  ],
  imports: [
    'modelDAO',
    'makeDAO'
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
      required: true,
      view: function(_, X) {
        var choices = X.data.slot(function(make) {
          return X.modelDAO.where(X.data.EQ(X.data.Model.MAKE, make));
        });
        return foam.u2.view.ChoiceView.create({
          objToChoice: function(model) {
            return [model.id, model.name];
          },
          dao$: choices,
          placeholder: '--'
        }, X);
      },
      tableCellFormatter:function(value, obj) {
        obj.modelDAO
        .find(value)
        .then((model)=> this.add(model.name))
        .catch((error) => this.add(value));
      }
    },
    {
      name: 'year',
      class: 'Int',
      required: true
    },
  ],
  methods:[
    {
      name: 'toSummary',
      code: async function() {
        var self = this;
        return this.make$find.then(function(make) {
          return self.model$find.then(function(model) {
            return make.id + ' ' + model.name + ' ' + self.year; 
          });
        });
      }
    }
  ]
})
