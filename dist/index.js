import { map, tooltip, geoJSON, DomEvent, featureGroup } from 'leaflet';
import { css, LitElement, unsafeCSS, html } from 'lit';
import { property } from '@lit/reactive-element/decorators/property.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class HighlightableMap extends LitElement {
    constructor() {
        super();
        this.features = new Set();
        this.mapEl = document.createElement('div');
        this.highlight = [];
        this.filter = [];
        this.selected = [];
        this.tooltip = false;
        this.autozoom = false;
        this.center = [0, 0];
        this.zoom = 2;
        if (!HighlightableMap.geodata) {
            throw new Error('Static geodata must be set first');
        }
        this.countryFeatures = new Map();
        this.countryEls = new Map();
        this.leafletMap = map(this.mapEl, {
            attributionControl: false,
            zoomSnap: 0,
            zoomAnimation: false,
            trackResize: true
        }).on('resize', this.onResize.bind(this));
    }
    setTooltipFn(fn) {
        this.tooltipFn = fn.bind(this);
    }
    static setCss(styles) {
        HighlightableMap.styles.unshift(unsafeCSS(styles));
    }
    static setGeoData(geodata) {
        HighlightableMap.geodata = geodata;
    }
    setGeoJson(geodata) {
        console.log('SET GEOJSON', geodata);
        const tt = tooltip();
        this.geoJson = geoJSON(geodata, {
            onEachFeature: (feature, layer) => {
                const { properties: { NAME_SORT: country, ADM0_A3_US: id } } = feature;
                this.features.add(layer);
                this.countryFeatures.set(id, layer);
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
                this.dispatchEvent(new CustomEvent('mouseover-country', {
                    bubbles: true,
                    composed: true,
                    detail: e.propagatedFrom
                }));
                this.dispatchEvent(new CustomEvent('click-country', {
                    bubbles: true,
                    composed: true,
                    detail: e.propagatedFrom
                }));
                const { feature: { properties: { NAME_SORT: countryName, ADM0_A3_US: countryId } } } = e.propagatedFrom;
                if (this.tooltip &&
                    this.highlight.find(country => {
                        return country === countryId || country === countryName;
                    })) {
                    tt.setContent(countryName)
                        .setLatLng(e.propagatedFrom.getCenter())
                        .addTo(this.leafletMap);
                }
                DomEvent.stopPropagation(e);
            },
            mouseover: e => {
                this.dispatchEvent(new CustomEvent('mouseover-country', {
                    bubbles: true,
                    composed: true,
                    detail: e.propagatedFrom
                }));
                const { feature: { properties: { NAME_SORT: countryName, ADM0_A3_US: countryId } } } = e.propagatedFrom;
                if (this.tooltip) {
                    if (typeof this.tooltipFn === 'function') {
                        this.tooltipFn(e, tt);
                    }
                    else if (this.highlight.find(country => {
                        return country === countryId || country === countryName;
                    })) {
                        // default behavior
                        tt.setContent(countryName)
                            .setLatLng(e.propagatedFrom.getCenter())
                            .addTo(this.leafletMap);
                    }
                }
            },
            mouseout: e => {
                this.dispatchEvent(new CustomEvent('mouseout-country', {
                    bubbles: true,
                    composed: true,
                    detail: e.propagatedFrom
                }));
                tt.removeFrom(this.leafletMap);
            }
        })
            .addTo(this.leafletMap);
        this.enumerateFeatures();
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('hm-rendered', { bubbles: true, composed: true }));
            this.onResize();
            this.requestUpdate();
        });
    }
    get mismatched() {
        if (!this.highlight.length)
            return;
        const countryNames = [...this.countryFeatures.keys()];
        return this.highlight.filter(countryName => !countryNames.includes(countryName));
    }
    enumerateFeatures() {
        this.leafletMap.setView([0, 0], 2);
        this.countryFeatures.forEach((layer, country) => {
            this.countryEls.set(country, layer.getElement());
        });
    }
    firstUpdated() {
        this.setGeoJson(HighlightableMap.geodata);
    }
    updated(oldProps) {
        var _a, _b;
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
        }
        else {
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
        if (this.countryFeatures.size &&
            oldProps.has('filter') &&
            this.filter.length) {
            this.countryFeatures.forEach(feature => {
                const { feature: { properties: { NAME_SORT, ADM0_A3_US } } } = feature;
                if (this.filter.includes(NAME_SORT) ||
                    this.filter.includes(ADM0_A3_US)) {
                    feature.addTo(this.leafletMap);
                }
                else {
                    feature.remove();
                }
            });
        }
        // unhighlight previously highlighted
        (_a = oldProps.get('highlight')) === null || _a === void 0 ? void 0 : _a.forEach((country) => {
            var _a, _b;
            (_b = (_a = this.countryFeatures
                .get(country)) === null || _a === void 0 ? void 0 : _a.getElement()) === null || _b === void 0 ? void 0 : _b.classList.remove('bwm-highlight');
        });
        // highlight current
        this.highlightedFeatures.forEach(feature => {
            var _a;
            (_a = feature.getElement()) === null || _a === void 0 ? void 0 : _a.classList.add('bwm-highlight');
        });
        // if autozoom is set, reposition map
        if (oldProps.has('highlight')) {
            if (this.autozoom && this.highlightedFeatures.length) {
                const countriesFg = featureGroup(this.highlightedFeatures);
                this.leafletMap.fitBounds(countriesFg.getBounds());
            }
            else if (this.highlightedFeatures.length) {
                this.leafletMap.setView(this.center, this.zoom);
            }
        }
        // unstroke previously selected
        (_b = oldProps.get('selected')) === null || _b === void 0 ? void 0 : _b.forEach((country) => {
            var _a;
            (_a = this.countryEls.get(country)) === null || _a === void 0 ? void 0 : _a.classList.remove('bwm-selected');
        });
        // stroke currently selected
        this.selected.forEach((country) => {
            var _a, _b, _c;
            (_b = (_a = this.countryFeatures
                .get(country)) === null || _a === void 0 ? void 0 : _a.getElement()) === null || _b === void 0 ? void 0 : _b.classList.add('bwm-selected');
            (_c = this.countryFeatures.get(country)) === null || _c === void 0 ? void 0 : _c.bringToFront();
        });
    }
    get highlightedFeatures() {
        return this.highlight
            .map((country) => this.countryFeatures.get(country))
            .filter(Boolean);
    }
    onResize() {
        if (!this.autozoom || !this.highlightedFeatures.length)
            return;
        const countriesFg = featureGroup(this.highlightedFeatures);
        this.leafletMap.fitBounds(countriesFg.getBounds());
    }
    render() {
        return html `
			${this.mapEl}
			<div class="sr-only">
				<h2>Highlighted Countries</h2>
				<ul>
					${this.highlightedFeatures
            .map(country => country.feature.properties.NAME_SORT)
            .sort()
            .map(country => html `<li>${country}</li>`)}
				</ul>
			</div>
		`;
    }
}
HighlightableMap.styles = [
    css `
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
__decorate([
    property({ type: Boolean })
], HighlightableMap.prototype, "no-control", void 0);
__decorate([
    property({
        type: Array,
        converter: {
            fromAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.split(',');
            },
            toAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.join(',');
            }
        }
    })
], HighlightableMap.prototype, "highlight", void 0);
__decorate([
    property({
        type: Array,
        reflect: true,
        converter: {
            fromAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.split(',');
            },
            toAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.join(',');
            }
        }
    })
], HighlightableMap.prototype, "filter", void 0);
__decorate([
    property({
        type: Array,
        reflect: true,
        converter: {
            fromAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.split(',');
            },
            toAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.join(',');
            }
        }
    })
], HighlightableMap.prototype, "selected", void 0);
__decorate([
    property({
        type: Boolean,
        reflect: true
    })
], HighlightableMap.prototype, "tooltip", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], HighlightableMap.prototype, "autozoom", void 0);
__decorate([
    property({
        type: Array,
        reflect: true,
        converter: {
            fromAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.split(',');
            },
            toAttribute(value, type) {
                return value === null || value === void 0 ? void 0 : value.join(',');
            }
        }
    })
], HighlightableMap.prototype, "center", void 0);
__decorate([
    property({ type: Number, reflect: true })
], HighlightableMap.prototype, "zoom", void 0);

export { HighlightableMap };
//# sourceMappingURL=index.js.map
