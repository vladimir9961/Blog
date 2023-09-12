import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/light-v11';
  lat: number = 43.365697;
  lng: number = 21.996452;
  markers: { lng: number; lat: number }[] = [
    { lng: 21.996452, lat: 43.365697 },
    { lng: 22.0, lat: 43.37 },
  ];

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZ29sZGd1biIsImEiOiJjbG0wbmN1djIxYnVvM2RwNjBjY2ZqdTJoIn0.IRn0RbczCcxZL0RKkO2Z2g',
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat],
    });

    this.map.on('load', () => {
      this.map?.addSource('base-map', {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: 'https://api.mapbox.com/directions/v5/mapbox/driving/-74.198598%2C40.666011%3B-74.011159%2C40.686935?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiZ29sZGd1biIsImEiOiJjbG0wbmN1djIxYnVvM2RwNjBjY2ZqdTJoIn0.IRn0RbczCcxZL0RKkO2Z2g',
      });
      this.map?.addLayer({
        id: 'earthquakes-layer',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': 'red',
          'circle-stroke-color': 'white',
        },
      });
      this.map?.addSource('borders', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [21.996452, 43.365697],
              },
              properties: {
                title: 'Austin 1',
              },
            },
          ],
        },
      });
      this.map?.addLayer({
        id: 'borders-layer',
        type: 'line',
        source: 'borders',
      });
      this.map?.addSource('Austin Points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [21.996452, 43.365697],
              },
              properties: {
                title: 'Austin 1',
              },
            },
          ],
        },
      });
      this.map?.addLayer({
        id: 'Austin Points',
        type: 'circle',
        source: 'Austin Points',
        layout: {},
        paint: {
          'circle-color': 'blue',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': 'white',
        },
      });
    });
  }
}
