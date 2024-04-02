import {
	Map as LeafletMap,
	LeafletMouseEvent,
	Tooltip,
	featureGroup,
	geoJSON,
	map,
	tooltip,
	DomEvent
} from 'leaflet';
import { LitElement, PropertyValueMap, css, html } from 'lit';
import { property } from 'lit/decorators/property.js';

export class HighlightableMap extends LitElement {
	readonly features: Set<any> = new Set();
	readonly countryFeatures!: Map<string, any>;
	readonly countryEls!: Map<string, SVGClipPathElement>;
	readonly leafletMap!: LeafletMap;

	protected geoJson!: ReturnType<typeof geoJSON>;
	private mapEl = document.createElement('div');

	public static styles = [
		css`
			:host {
				display: block;
				height: 100%;
				width: auto;
				margin-bottom: 20px;

				--bwm-background: #f4f4f4;
				--bwm-country: #cfcdc9;
				--bwm-highlight: #0067b9;
				--bwm-selected: #ba0c2f;
			}

			.leaflet-container {
				background-color: var(--bwm-background);
				font-family: 'Source Sans Pro', sans-serif;
				font-size: 16px;
				height: 100%;
			}

			.bwm-country {
				fill: var(--bwm-country);
			}

			.bwm-highlight {
				fill: var(--bwm-highlight);
			}

			.bwm-selected {
				stroke: var(--bwm-selected);
			}

			.leaflet-attribution-flag {
				display: none !important;
			}

			.leaflet-interactive:focus {
				outline-style: none;
			}

			.sr-only {
				display: block;
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				white-space: nowrap;
				border-width: 0;
			}
		`
	];

	constructor() {
		super();

		this.countryFeatures = new Map();
		this.countryEls = new Map();

		this.leafletMap = map(this.mapEl, {
			attributionControl: false,
			zoomSnap: 0,
			zoomAnimation: false,
			trackResize: true
		}).on('resize', this.onResize.bind(this));
	}

	@property({ type: Boolean })
	'no-control': boolean;

	@property({
		type: Array,
		converter: {
			fromAttribute(value, type) {
				return value?.split(',');
			},
			toAttribute(value, type) {
				return (value as string[])?.join(',');
			}
		}
	})
	highlight: string[] = [];

	@property({
		type: Array,
		reflect: true,
		converter: {
			fromAttribute(value, type) {
				return value?.split(',');
			},
			toAttribute(value, type) {
				return (value as string[])?.join(',');
			}
		}
	})
	filter: string[] = [];

	@property({
		type: Array,
		reflect: true,
		converter: {
			fromAttribute(value, type) {
				return value?.split(',');
			},
			toAttribute(value, type) {
				return (value as string[])?.join(',');
			}
		}
	})
	selected: string[] = [];

	@property({
		type: Boolean,
		reflect: true
	})
	tooltip: boolean = false;

	@property({ type: Boolean, reflect: true })
	autozoom: boolean = false;

	@property({
		type: Array,
		reflect: true,
		converter: {
			fromAttribute(value, type) {
				return value?.split(',');
			},
			toAttribute(value, type) {
				return (value as string[])?.join(',');
			}
		}
	})
	center: [number, number] = [0, 0];

	@property({ type: Number, reflect: true })
	zoom: number = 2;

	setTooltipFn(fn: (e: LeafletMouseEvent, tt: Tooltip) => void) {
		this.tooltipFn = fn.bind(this);
	}
	private tooltipFn?: (e: LeafletMouseEvent, tt: Tooltip) => void;

	setCss(sheet: CSSStyleSheet) {
		if (this.shadowRoot) {
			this.shadowRoot.adoptedStyleSheets.unshift(sheet);
		}
	}

	// static geodata: object | undefined;
	setGeoJson(geodata?: any) {
		// if (HighlightableMap.geoJson) {
		// 	HighlightableMap.geoJson.clearAllEventListeners().remove();
		// }

		const tt = tooltip();
		this.geoJson = geoJSON(geodata as any, {
			onEachFeature: (feature, layer: any) => {
				const {
					properties: { NAME_SORT: country, ADM0_A3_US: id }
				} = feature;
				this.features.add(layer);
				this.countryFeatures.set(id as string, layer);
				this.countryFeatures.set(country, layer);
			},
			style() {
				return {
					color: '#fff',
					fillOpacity: 1,
					weight: 1,
					className: 'bwm-country'
				};
			}
		})
			.on({
				click: e => {
					DomEvent.stopPropagation(e);

					this.dispatchEvent(
						new CustomEvent('mouseover-country', {
							bubbles: true,
							composed: true,
							detail: e.propagatedFrom
						})
					);
					this.dispatchEvent(
						new CustomEvent('click-country', {
							bubbles: true,
							composed: true,
							detail: e.propagatedFrom
						})
					);

					const {
						feature: {
							properties: { NAME_SORT: countryName, ADM0_A3_US: countryId }
						}
					} = e.propagatedFrom;

					if (
						this.tooltip &&
						this.highlight.find(country => {
							return country === countryId || country === countryName;
						})
					) {
						tt.setContent(countryName)
							.setLatLng(e.propagatedFrom.getCenter())
							.addTo(this.leafletMap);
					}

					DomEvent.stopPropagation(e);
				},
				mouseover: e => {
					this.dispatchEvent(
						new CustomEvent('mouseover-country', {
							bubbles: true,
							composed: true,
							detail: e.propagatedFrom
						})
					);

					const {
						feature: {
							properties: { NAME_SORT: countryName, ADM0_A3_US: countryId }
						}
					} = e.propagatedFrom;

					if (this.tooltip) {
						if (typeof this.tooltipFn === 'function') {
							this.tooltipFn(e, tt);
						} else if (
							this.highlight.find(country => {
								return country === countryId || country === countryName;
							})
						) {
							// default behavior
							tt.setContent(countryName)
								.setLatLng(e.propagatedFrom.getCenter())
								.addTo(this.leafletMap);
						}
					}
				},
				mouseout: e => {
					this.dispatchEvent(
						new CustomEvent('mouseout-country', {
							bubbles: true,
							composed: true,
							detail: e.propagatedFrom
						})
					);
					tt.removeFrom(this.leafletMap);
				}
			})
			.addTo(this.leafletMap);

		this.enumerateFeatures();
		setTimeout(() => {
			this.dispatchEvent(
				new CustomEvent('hm-rendered', { bubbles: true, composed: true })
			);
			this.onResize();
			this.requestUpdate('highlight');
		});
	}

	get mismatched() {
		if (!this.highlight.length) return;
		const countryNames = [...this.countryFeatures.keys()];
		return this.highlight.filter(
			countryName => !countryNames.includes(countryName)
		);
	}

	private enumerateFeatures() {
		this.leafletMap.setView([0, 0], 2);
		this.countryFeatures.forEach((layer, country) => {
			this.countryEls.set(country, layer.getElement());
		});
	}

	protected updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		if (this['no-control']) {
			this.leafletMap.zoomControl.remove();
			this.leafletMap.scrollWheelZoom.disable();
			this.leafletMap.dragging.disable();
			this.leafletMap.touchZoom.disable();
			this.leafletMap.doubleClickZoom.disable();
			this.leafletMap.boxZoom.disable();
			this.leafletMap.keyboard.disable();
			if (this.leafletMap.tap) {
				this.leafletMap.tap.disable();
			}
		} else {
			this.leafletMap.zoomControl.addTo(this.leafletMap);
			this.leafletMap.scrollWheelZoom.enable();
			this.leafletMap.dragging.enable();
			this.leafletMap.touchZoom.enable();
			this.leafletMap.doubleClickZoom.enable();
			this.leafletMap.boxZoom.enable();
			this.leafletMap.keyboard.enable();
			if (this.leafletMap.tap) {
				this.leafletMap.tap.enable();
			}
		}

		if (_changedProperties.has('filter')) {
			if (this.countryFeatures.size && this.filter.length) {
				this.countryFeatures.forEach(feature => {
					const {
						feature: {
							properties: { NAME_SORT, ADM0_A3_US }
						}
					} = feature;
					if (
						this.filter.includes(NAME_SORT) ||
						this.filter.includes(ADM0_A3_US)
					) {
						// console.log('ADDING', feature);
						feature.addTo(this.leafletMap);
					} else {
						// console.log('REMOVING', feature);
						feature.remove();
					}
				});
			}
		}

		// unhighlight previously highlighted
		_changedProperties.get('highlight')?.forEach((country: string) => {
			this.countryFeatures
				.get(country)
				?.getElement()
				?.classList.remove('bwm-highlight');
		});
		// highlight current
		this.highlightedFeatures.forEach(feature => {
			feature.getElement()?.classList.add('bwm-highlight');
		});

		// if autozoom is set, reposition map
		if (_changedProperties.has('highlight')) {
			if (this.autozoom && this.highlightedFeatures.length) {
				const countriesFg = featureGroup(this.highlightedFeatures);
				this.leafletMap.fitBounds(countriesFg.getBounds());
			} else if (this.highlightedFeatures.length) {
				this.leafletMap.setView(this.center, this.zoom);
			}
		}

		// unstroke previously selected
		_changedProperties.get('selected')?.forEach((country: string) => {
			this.countryEls.get(country)?.classList.remove('bwm-selected');
		});

		// stroke currently selected
		this.selected.forEach((country: string) => {
			this.countryFeatures
				.get(country)
				?.getElement()
				?.classList.add('bwm-selected');
			this.countryFeatures.get(country)?.bringToFront();
		});
	}

	private get highlightedFeatures() {
		return this.highlight
			.map((country: string) => this.countryFeatures.get(country))
			.filter(Boolean);
	}

	private onResize() {
		if (!this.autozoom || !this.highlightedFeatures.length) return;

		const countriesFg = featureGroup(this.highlightedFeatures);
		this.leafletMap.fitBounds(countriesFg.getBounds());
	}

	render() {
		return html`
			${this.mapEl}
			<div class="sr-only">
				<h2>Highlighted Countries</h2>
				<ul>
					${this.highlightedFeatures
						.map(country => country.feature.properties.NAME_SORT)
						.sort()
						.map(country => html`<li>${country}</li>`)}
				</ul>
			</div>
		`;
	}
}
