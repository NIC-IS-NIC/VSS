foam.CLASS({
  package: 'hughes.vss',
  name: 'Vehicle',
  discription: 'Complete car/truck',
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
      createVisibility: 'HIDDEN',
      updateVisibility: 'RO'
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
      class: 'Integer',
      required: true
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
      name: 'purchaseKilometers',
      class: 'Integer',
      required: true
    }
  ]
})
