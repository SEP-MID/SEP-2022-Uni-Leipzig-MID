/**
 * An example palette pad provider.
 * Creates a palette with a lasso for selecting several shapes and two with two 
 * button for creating shapes.
 */

export class ExamplePaletteProvider {

  public $inject = [
    'create',
    'elementFactory',
    'lassoTool',
    'palette'
  ];

  _create;
  _elementFactory;
  _lassoTool;
  _palette;

  constructor(create, elementFactory, lassoTool, palette) {
    this._create = create;
    this._elementFactory = elementFactory;
    this._lassoTool = lassoTool;
    this._palette = palette;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    var create = this._create,
        elementFactory = this._elementFactory,
        lassoTool = this._lassoTool;

        return {
          'lasso-tool': {
            group: 'tools',
            className: 'palette-icon-lasso-tool',
            title: 'Activate Lasso Tool',
            action: {
              click: function(event) {
                lassoTool.activateSelection(event);
              }
            }
          },
          'tool-separator': {
            group: 'tools',
            separator: true
          },
          'create-shape': {
            group: 'create',
            className: 'palette-icon-create-shape',
            title: 'Create Shape',
            action: {
              click: function() {
                var shape = elementFactory.createShape({
                  width: 100,
                  height: 80
                });
      
                create.start(event, shape);
              }
            }
          },
          'create-frame': {
            group: 'create',
            className: 'palette-icon-create-frame',
            title: 'Create Frame',
            action: {
              click: function() {
                var shape = elementFactory.createShape({
                  width: 300,
                  height: 200,
                  isFrame: true
                });
      
                create.start(event, shape);
              }
            }
          }
        };
  }
}
