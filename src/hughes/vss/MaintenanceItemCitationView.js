foam.CLASS({
  package: 'hughes.vss',
  name: 'MaintenanceItemCitationView',
  extends: 'foam.u2.CitationView',

  documentation: 'A single row in a list of users.',

  css: `
    ^summary {
      color: $black;
      font-weight: 500;

    }

    ^email {
      color: $grey400;
    }
        ^svgIcon {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
    ^svgIcon svg {
      aspect-ratio: 1;
      width: 1.15em;
      fill: $grey500;
    }
  `,

  properties: [
    {
      class: 'FObjectProperty',
      of: 'hughes.vss.MaintenanceItem',
      name: 'data',
      documentation: 'Set this to the maintenance item you want to display in this row.'
    }
  ],


  methods: [
    function render() {
      this
        .addClass(this.myClass())
       // .start('span')
       // .start({ class: 'foam.u2.tag.Image', glyph: 'bulletedList', role: 'presentation' })              
        //.addClass(this.myClass('svgIcon'))              
       //.end()
        .start()
          .addClass('p-semiBold', this.myClass('summary'))
          .add('*')
          .add(' ')
          .add(this.data.toSummary())
         .end()
       .end();
   }
 ]});
