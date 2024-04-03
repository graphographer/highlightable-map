import leafletCss from 'leaflet/dist/leaflet.css';
import { unsafeCSS } from 'lit';
import { HighlightableMap } from './HighlightableMap';
import geodata from './geoJson.json';
import { customElement } from 'lit/decorators/custom-element.js';

@customElement('highlightable-map')
export class HighlightableMapBundled extends HighlightableMap {
	static styles = [
		unsafeCSS(leafletCss.toString()),
		...HighlightableMap.styles
	];
}

HighlightableMapBundled.setGeoData(geodata as unknown as JSON);
