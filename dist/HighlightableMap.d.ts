import { Map as LeafletMap, LeafletMouseEvent, Tooltip } from 'leaflet';
import { LitElement, PropertyValueMap } from 'lit';
export declare class HighlightableMap extends LitElement {
    readonly countryFeatures: Map<string, any>;
    readonly countryEls: Map<string, SVGClipPathElement>;
    readonly leafletMap: LeafletMap;
    private geoJson;
    private mapEl;
    static styles: import("lit").CSSResult[];
    highlight: string[];
    tooltip: boolean;
    autozoom: boolean;
    center: [number, number];
    zoom: number;
    setTooltipFn(fn: (e: LeafletMouseEvent, tt: Tooltip) => void): void;
    private tooltipFn?;
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
