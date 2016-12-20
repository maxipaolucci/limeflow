

import { Injectable }	from '@angular/core';

import {CssColors, CssStatusColors}  from '../css-colors';

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
					"width": "label",
					"height": "label",
					"padding-top": "10px",
					"padding-right": "10px",
					"padding-bottom": "10px",
					"padding-left": "10px",
					"shape": "roundrectangle",
					"label": "data(caption)",
					"background-color": CssColors.Purple,
					// "content": function(elem) {
						// if(elem.data('id')) {
						// 	return elem.data('id');
						// }
					// },
					"text-halign": "center",
					"text-valign": "center",
					"border-width": 2,
					"font-size": 12
				}
			},
			{
				selector: "node.status-new",
				css: {
					'background-color': CssStatusColors.New
				}
			},
			{
				selector: "node.status-inprogress",
				css: {
					'background-color': CssStatusColors.InProgress
				}
			},
			{
				selector: "node.status-done",
				css: {
					'background-color': CssStatusColors.Done
				}
			},
			{
				selector: "node.status-complete",
				css: {
					'background-color': CssStatusColors.Complete
				}
			},
			{
				selector: "node.status-stop",
				css: {
					'background-color': CssStatusColors.Stop
				}
			},
			{
				selector: "node.status-block",
				css: {
					'background-color': CssStatusColors.Block
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