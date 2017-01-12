/**
 * Created by Maxi Paolucci on 12/12/2016.
 */
import { Injectable }	from '@angular/core';
import CytoscapeFlow from "../cytoscape-core/CytoscapeFlow";

@Injectable()
export class CytoscapeEventsService {

	/**
	 * Constructor.
	 * @class CytoscapeEventsService
	 * @classdesc Service which will take care of all the events performed in cytoscape.
	 */
	constructor() {}

	nodeClick(cytoscapeFlow : CytoscapeFlow) : void {
		cytoscapeFlow.getFlowUI().on('click', 'node', event => {
			// Check if it's a zone with a node where the click was performed
			if(event.cyTarget.data != null) {
				// Get the id of the clicked node
				let id = event.cyTarget.data('id');
				if (id) {
					//open the node selected
					cytoscapeFlow.selectState(id);
				}
			}
		});
	}
}