import { map, tooltip, geoJSON, DomEvent, featureGroup } from 'leaflet';
import { css, LitElement, html } from 'lit';

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

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e$1=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o$2=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$1&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$2.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$2.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s),S=(s,o)=>{if(e$1)s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$1=e$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i,defineProperty:e,getOwnPropertyDescriptor:r$1,getOwnPropertyNames:h,getOwnPropertySymbols:o$1,getPrototypeOf:n$1}=Object,a=globalThis,c=a.trustedTypes,l=c?c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f=(t,s)=>!i(t,s),y={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=y){if(s.state&&(s.attribute=!1),this._$Ei(),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,s);void 0!==r&&e(this.prototype,t,r);}}static getPropertyDescriptor(t,s,i){const{get:e,set:h}=r$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get(){return e?.call(this)},set(s){const r=e?.call(this);h.call(this,s),this.requestUpdate(t,r,i);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...h(t),...o$1(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$1(s));}else void 0!==s&&i.push(c$1(s));return i}static _$Eu(t,s){const i=s.attribute;return !1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()));}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()));}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$EC(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==r?this.removeAttribute(e):this.setAttribute(e,r),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e,this[e]=r.fromAttribute(s,t.type),this._$Em=null;}}requestUpdate(t,s,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??f)(this[t],s))return;this.P(t,s,i);}!1===this.isUpdatePending&&(this._$ES=this._$ET());}P(t,s,i){this._$AL.has(t)||this._$AL.set(t,s),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t);}async _$ET(){this.isUpdatePending=!0;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t)!0!==i.wrapped||this._$AL.has(s)||void 0===this[s]||this.P(s,this[s],i);}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(s)):this._$EU();}catch(s){throw t=!1,this._$EU(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return !0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU();}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[d("elementProperties")]=new Map,b[d("finalized")]=new Map,p?.({ReactiveElement:b}),(a.reactiveElementVersions??=[]).push("2.0.4");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f},r=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t);},init(e){return void 0!==e&&this.P(o,void 0,t),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,r?{...t,wrapped:!0}:t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

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
    setCss(sheet) {
        if (this.shadowRoot) {
            this.shadowRoot.adoptedStyleSheets.unshift(sheet);
        }
    }
    setGeoJson(geodata) {
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
            this.requestUpdate('highlight');
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
    updated(_changedProperties) {
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
        if (this.countryFeatures.size && this.filter.length) {
            this.countryFeatures.forEach(feature => {
                const { feature: { properties: { NAME_SORT, ADM0_A3_US } } } = feature;
                if (this.filter.includes(NAME_SORT) ||
                    this.filter.includes(ADM0_A3_US)) {
                    // console.log('ADDING', feature);
                    feature.addTo(this.leafletMap);
                }
                else {
                    // console.log('REMOVING', feature);
                    feature.remove();
                }
            });
        }
        // unhighlight previously highlighted
        (_a = _changedProperties.get('highlight')) === null || _a === void 0 ? void 0 : _a.forEach((country) => {
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
        if (_changedProperties.has('highlight')) {
            if (this.autozoom && this.highlightedFeatures.length) {
                const countriesFg = featureGroup(this.highlightedFeatures);
                this.leafletMap.fitBounds(countriesFg.getBounds());
            }
            else if (this.highlightedFeatures.length) {
                this.leafletMap.setView(this.center, this.zoom);
            }
        }
        // unstroke previously selected
        (_b = _changedProperties.get('selected')) === null || _b === void 0 ? void 0 : _b.forEach((country) => {
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
    n({ type: Boolean })
], HighlightableMap.prototype, "no-control", void 0);
__decorate([
    n({
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
    n({
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
    n({
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
    n({
        type: Boolean,
        reflect: true
    })
], HighlightableMap.prototype, "tooltip", void 0);
__decorate([
    n({ type: Boolean, reflect: true })
], HighlightableMap.prototype, "autozoom", void 0);
__decorate([
    n({
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
    n({ type: Number, reflect: true })
], HighlightableMap.prototype, "zoom", void 0);

export { HighlightableMap };
//# sourceMappingURL=index.js.map
