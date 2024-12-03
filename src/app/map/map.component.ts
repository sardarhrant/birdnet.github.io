import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {GeojsonService} from "../services/geojson.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  providers: [GeojsonService],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  private map: any;
  customIcon = L.icon({
    iconUrl: '/marker.png',
    iconSize: [30, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  private birdNames: { common: string, scientific: string }[] = [
    { common: 'European Robin', scientific: 'Erithacus rubecula' },
    { common: 'Great Tit', scientific: 'Parus major' },
    { common: 'Blue Tit', scientific: 'Cyanistes caeruleus' },
    { common: 'Blackbird', scientific: 'Turdus merula' },
    { common: 'House Sparrow', scientific: 'Passer domesticus' },
    { common: 'Chaffinch', scientific: 'Fringilla coelebs' },
    { common: 'Goldfinch', scientific: 'Carduelis carduelis' },
    { common: 'European Starling', scientific: 'Sturnus vulgaris' },
    { common: 'Barn Swallow', scientific: 'Hirundo rustica' },
    { common: 'Common Chiffchaff', scientific: 'Phylloscopus collybita' }
  ];

  ngOnInit(): void {
    this.map = L.map('map').setView([43.0, 34.0], 5);
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: '&copy; <a href="https://www.esri.com">Esri</a> &mdash; Source: Esri, Earthstar Geographics, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'});
    const stamenToner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="http://maps.stamen.com/">Stamen Design</a>'
    });

    osm.addTo(this.map);

    const customMarker = L.marker([43.0, 34.0], { icon: this.customIcon }).addTo(this.map);
    customMarker.bindPopup('<b>European Robin</b><br>(Erithacus rubecula)').openPopup();

    const baseMaps = {"OpenStreetMap": osm, "Satellite": satellite, "Stamen Toner": stamenToner};
    L.control.layers(baseMaps).addTo(this.map);

    fetch('http://192.168.14.117/overview.php?ajax_detections=true&previous_detection_identifier=undefined').then((response: Response) => {
      console.log(response);
      debugger
    })
    this.addMarkers();
  }

  addMarkers(): void {
    let markerCount = 0;

    const interval = setInterval(() => {
      if (markerCount >= 200) {
        clearInterval(interval);
        return;
      }

      const lat = 35 + (55 - 35) * Math.random();
      const lon = -10 + (30 + 10) * Math.random();

      const birdIndex = Math.floor(Math.random() * this.birdNames.length);
      const bird = this.birdNames[birdIndex];

      const marker = L.marker([lat, lon], {icon: this.customIcon}).addTo(this.map);
      marker.bindPopup(`<b>${bird.common}</b><br>(${bird.scientific})<br>Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`);

      markerCount++;
    }, 500);
  }
}
