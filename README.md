# Highlightable Map

Using leaflet.js, "highlightable-map" offers a simplified, yet extensible API for including informational political maps in your application as a web component.

### Library

The library version exports and unbundled, unminified, unregistered Lit Element class, "HighlightableMap". The 'lit' and 'leaflet' libraries are both considered externals, so you must provide them somehow through your bundler system (e.g. Webpack). Additionally, GeoJSON data and Leaflet CSS must be provided to the component through the `setGeoJson` and `setCss` methods respectively. This provides maximum flexibility for customizing the data set which actually renders the map as well as the map styles, and for bundling your app.

Webpack example, where json and css loaders are configured, and Lit and Leaflet have been included as dependencies:

```
import {HighlightableMap} from 'highlightable-map';
import styles from 'highlightable-map/dist/leaflet.css';
import geoJson from 'highlightable-map/src/geoJson.json';

customElements.define('highlightable-map', HighlightableMap);

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(styles.toString());
// alternately, Webpack's 'css-loader' can take the option to export a constructable stylesheet directly

const map = document.createElement('highlightable-map');
map.setGeoJson(geoJson);

document.body.appendChild(map);

// note that styles will not be applied properly if this is done before the element is in the document.
// this is because `shadowRoot` (and therefore its stylesheet array) will not be created until then.
map.setCss(stylesheet);
```

### Bundled Version

The bundled version is meant to be used in browsers directly. In this case, the custom element is already defined as `<highlightable-map></highlightable-map>` and default geoJSON and css styles have been included. Note that this makes quite a hefty module (4.5MiB, 1.6MiB zipped).

Example:

```
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>
        My Highlightable Map App
    </title>
    <meta name="viewport" content="width=device-width,initial-scale=1">

    // assuming this was installed using npm
    <script src="./node_modules/highlightable-map/dist/HighlightableMapBundled.min.js" type="module"></script>
</head>

<body>
    <highlightable-map highlight="USA,Mexico,Japan"></highlightable-map>
</body>

</html>
```
