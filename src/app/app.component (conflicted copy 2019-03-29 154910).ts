import { Component } from '@angular/core';
import { setCurrentInjector } from '@angular/core/src/di/injector_compatibility';

declare var ol: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 43.56,1.47;43.565,1.475;
  latitude = 43.56155142725029;
  longitude =  1.4682663436618621;
  lati1 = 43.56;
  longi1 = 1.47;
  lati2 = 43.565;
  longi2 = 1.475;
  zoom = 16.8;
  title = 'Essai OSM';
  map: any;

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(this.zoom);
  }

  setCenter2() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longi1, this.lati1]));
    view.setZoom(this.zoom);
  }

  rotate() {
    var view = this.map.getView();
   // view.animate({
   //   rotation: view.getRotation() - Math.PI / 6
   // });
   view.setRotation(-Math.PI / 6);
   view.setZoom(this.zoom);
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

     this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);
      
     // var lon = lonlat[0];
     // var lat = lonlat[1];
     //alert(`lat: ${lonlat[1]} et long: ${lonlat[0]}`);
     eval("this.longi1 = lonlat[0];"); 
     eval("this.lati1 = lonlat[1];");

     alert(`lati: ${this.lati1} et longi: ${this.longi1}`);
      this.setCenter2();
    }); 
  }


}
