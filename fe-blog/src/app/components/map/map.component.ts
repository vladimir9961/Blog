import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map!: mapboxgl.Map;

  constructor() {
    // mapboxgl.accessToken =
    // 'pk.eyJ1IjoiZ29sZGd1biIsImEiOiJjbG0wbmN1djIxYnVvM2RwNjBjY2ZqdTJoIn0.IRn0RbczCcxZL0RKkO2Z2g';
  }

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiZ29sZGd1biIsImEiOiJjbG0wbmN1djIxYnVvM2RwNjBjY2ZqdTJoIn0.IRn0RbczCcxZL0RKkO2Z2g',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'maptiler-layer',
        type: 'raster',
        source: {
          type: 'raster',
          // tiles: [
          //   'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=pk.eyJ1IjoiZ29sZGd1biIsImEiOiJjbG0wbmN1djIxYnVvM2RwNjBjY2ZqdTJoIn0.IRn0RbczCcxZL0RKkO2Z2g',
          // ],
          tileSize: 256,
        },
        minzoom: 0,
        maxzoom: 22,
      });
    });
  }
}
