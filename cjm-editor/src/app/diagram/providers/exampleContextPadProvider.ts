/**
 * A example context pad provider.
 */
 export class ExampleContextPadProvider {

  public $inject = [
    'connect',
    'contextPad',
    'modeling'
  ];

  _connect;
  _modeling;

  private element;

  constructor(connect, contextPad, modeling) {
    this._connect = connect;
    this._modeling = modeling;
    contextPad.registerProvider(this);
  }

  public getContextPadEntries(element) {
    this.element = element;

    return {
      'delete': {
        group: 'edit',
        className: 'context-pad-icon-remove',
        title: 'Remove',
        action: {
          click: this.removeElement,
          dragstart: this.removeElement
        }
      },
      'connect': {
        group: 'edit',
        className: 'context-pad-icon-connect',
        title: 'Connect',
        action: {
          click: this.startConnect,
          dragstart: this.startConnect
        }
      }
    }

  };

  public removeElement = () => {
    this._modeling.removeElements([ this.element ]);
  }

  public startConnect = (event, element, autoActivate) => {
    this._connect.start(event, element, autoActivate);
  }
}




