import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

import { isFrameElement } from 'diagram-js/lib/util/Elements';


export class ExampleRuleProvider extends RuleProvider {
  public $inject = [ 'eventBus' ];

  constructor(eventBus) {
    super(eventBus);
  }

  public init() {
    super.addRule('shape.create', function(context) {
      var target = context.target,
          shape = context.shape;

      return target.parent === shape.target;
    });

    super.addRule('connection.create', function(context) {
      var source = context.source,
          target = context.target;

      return source.parent === target.parent;
    });

    super.addRule('shape.resize', function(context) {
      var shape = context.shape;
      return isFrameElement(shape);
    });
  };


}





