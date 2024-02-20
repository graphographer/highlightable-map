import { Map as LeafletMap } from 'leaflet';
import { LitElement, PropertyValueMap } from 'lit';
export declare class HighlightableMap extends LitElement {
    readonly countryFeatures: Map<string, any>;
    private geoJson;
    leafletMap: LeafletMap;
    private mapEl;
    static styles: import("lit").CSSResult[];
    highlight: string[];
    constructor();
    setCss(sheet: CSSStyleSheet): void;
    setGeoJson(geodata?: any): void;
    get mismatched(): string[] | undefined;
    firstUpdated(): Promise<void>;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    private get countries();
    private onResize;
    render(): import("lit-html").TemplateResult<1>;
}
