

import { Injectable }	from '@angular/core';

import { CssColors }	from '../css-colors';

@Injectable()
export class CytoscapeInitialisationService {
	/**
	 * The DOM element which contains the graph.
	 * @member {HTMLElement} CytoscapeInitialisationService#container
	 */
	container: HTMLElement;

	/**
	 * Elements of the graph.
	 * @member {Cy.ElementDefinition[]} CytoscapeInitialisationService#elements
	 */
	elements: Cy.ElementDefinition[];

	/**
	 * Style of the graph.
	 * @member {Cy.Stylesheet[]} CytoscapeInitialisationService#style
	 */
	style: Cy.Stylesheet[];

	/**
	 * Layout of the graph.
	 * @member {Cy.LayoutOptions} CytoscapeInitialisationService#layout
	 */
	layout: Cy.LayoutOptions;

	/**
	 * Constructor.
	 * @class CytoscapeInitialisationService
	 * @classdesc Service which will take care of instanciating all the things in cytoscape.
	 * Initialize the container, elements, style and layout of the graph.
	 */
	constructor() {}

	/**
	 * Init the container cytoscape which will contain the graph.
	 * @method CytoscapeInitialisationService#initContainer
	 * @returns {HTMLElement} The DOM element which is the container of the graph
	 */
	public initContainer() : HTMLElement {
		this.container = document.getElementById("cy");
		return this.container;
	}

	/**
	 * Initialize elements of the graph for cytoscape (empty here).
	 * To add elements : {@link GraphService#addNode}, {@link GraphService#addNodeOnClick}
	 * @method CytoscapeInitialisationService#initElements
	 * @returns {Cy.ElementDefintion[]} The elements of the graph, no elements by default
	 * @see GraphService#addNode
	 * @see GraphService#addNodeOnClick
	 */
	public initElements() : Cy.ElementDefinition[] {
		this.elements = [];
		return this.elements;
	}

	/**
	 * Initialize stylesheet of the graph.
	 * Defines all css classes for elements in the graph.
	 * Uses {@link CssColors} class for style color.
	 * @method CytoscapeInitialisationService#initStyleSheet
	 * @returns {Cy.Stylesheet[]} The stylesheet containing all css classes
	 * @see CssColors
	 */
	public initStyleSheet() : Cy.Stylesheet[] {
		this.style = [ // the stylesheet for the graph
			{
				selector: "node", // The selector to know what element to apply style
				css: { // The style to apply
					"width": 200,
					"height": 50,
					"shape": "roundrectangle",
					"background-color": CssColors.LightGrey,
					// "content": function(elem) {
						// Trick to avoid throwing exception because when we begin to drag edge, service is undefined for a short instant...
						// if(elem.data('service') != null) {
						// 	return elem.data('service').srv;
						// }
					// },
					"text-halign": "center",
					"text-valign": "center",
					"border-width": 2,
					"font-size": 30
				}
			},
			{
				selector: "edge",
				css: {
					"width": 3,
					"line-color": CssColors.LightGrey,
					"target-arrow-color": CssColors.LightGrey,
					"target-arrow-shape": "triangle",
					"curve-style": "bezier"
				}
			}
		];

		return this.style;
	}

	/**
	 * Initialize layout of the graph.
	 * See Cytoscape JS website for possible values of layout : {@link http://js.cytoscape.org/#layouts}
	 * @method CytoscapeInitialisationService#initLayout
	 * 
	 */
	public initLayout() : Cy.LayoutOptions {
		this.layout = {
			name: 'grid' // layout to explicitly set the position of each node on the graph
		}

		return this.layout;
	}
}