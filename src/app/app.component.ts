import { Component } from '@angular/core';
import { setCurrentInjector } from '@angular/core/src/di/injector_compatibility';

declare var ol: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// lancer avec ng serve --open
// puis aller sur http://localhost:4200/
export class AppComponent {
  latitude = 43.56;
  longitude = 1.47;
  latiStart = 0.0;
  longiStart = 0.0;
  latiEnd = 0.0;
  longiEnd = 0.0;
  start = "";
  end = "";
  zoom = 16.75;
  title = 'Essai OSM';
  map: any;

  center() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(this.zoom);

    var view = this.map.getView();
    view.setRotation(-Math.PI / 3.3);
    view.setZoom(this.zoom);
  }

  getRoute(start, end) {
    var request = new XMLHttpRequest();

    request.open('GET', 'https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248e17e16eae3fd4c47a7f3738528afba68&start=' + start + '&end=' + end);
    request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };
    
    request.send();
  }

  ngOnInit() {
    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([1.4716, 43.5608]),
        zoom: 16
      })

    });

    this.map.on('click', args => {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      this.longiStart = lonlat[0];
      this.latiStart = lonlat[1];
      this.start = this.latiStart + ',' + this.longiStart;
      //alert(`lat: ${lonlat[1]} et long: ${lonlat[0]}`);
      //eval("this.longiStart = lonlat[0];");
      //eval("this.latiEnd = lonlat[1];");

      this.center();
      alert(`lati: ${this.latiStart} et longi: ${this.longiStart}`);
    });
  }
}
