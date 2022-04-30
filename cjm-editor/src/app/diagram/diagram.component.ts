import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Diagram from 'diagram-js';

import ConnectModule from 'diagram-js/lib/features/connect';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import CreateModule from 'diagram-js/lib/features/create';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import { ExampleContextPadProvider } from './providers/exampleContextPadProvider';
import { ExamplePaletteProvider } from './providers/examplePaletteProvider';
import { ExampleRuleProvider } from './providers/exampleRuleProvider';


/**
 * A module that changes the default diagram look.
 */
const ElementStyleModule = {
  __init__: [
    [ 'defaultRenderer', (defaultRenderer: any) => {
      // override default styles
      defaultRenderer.CONNECTION_STYLE = { fill: 'none', strokeWidth: 5, stroke: '#000' };
      defaultRenderer.SHAPE_STYLE = { fill: 'white', stroke: '#000', strokeWidth: 2 };
      defaultRenderer.FRAME_STYLE = { fill: 'none', stroke: '#000', strokeDasharray: 4, strokeWidth: 2 };
    } ]
  ]
};

/**
 * A module for all example providers
 */
const ExampleProviders = {
  __init__: [
    'exampleContextPadProvider',
    'examplePaletteProvider',
    'exampleRuleProvider'
  ],
  exampleContextPadProvider: [ 'type', ExampleContextPadProvider ],
  examplePaletteProvider: [ 'type', ExamplePaletteProvider ],
  exampleRuleProvider: [ 'type', ExampleRuleProvider ]
};

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit, AfterViewInit {

  //get the element from the DOM which is used container for the diagram view
  @ViewChild('container') containerRef: ElementRef;
  private diagram;

  constructor() { 
    
  }

  /**
   * initialize the diagram after view init
   */
  ngAfterViewInit(): void {
    const options = {
      container: this.containerRef.nativeElement,
      additionalModules: []
    }
    this.diagram = this.createDiagram(options);
  }

  ngOnInit(): void {
    
  }

  private createDiagram(options): Diagram {
    const {
      container,
      additionalModules = []
    } = options;

    // default modules provided by the toolbox
    const builtinModules = [
      ConnectModule,
      ContextPadModule,
      CreateModule,
      LassoToolModule,
      ModelingModule,
      MoveCanvasModule,
      MoveModule,
      OutlineModule,
      PaletteModule,
      ResizeModule,
      RulesModule,
      SelectionModule,
      ZoomScrollModule
    ];

    // our own modules, contributing controls, customizations, and more

    const customModules = [
      ExampleProviders,
      ElementStyleModule
    ];

    return new Diagram({
      canvas: {
        container: options.container
      },
      modules: [
        ...builtinModules,
        ...customModules,
        ...options.additionalModules
      ]
    });
  }

}
