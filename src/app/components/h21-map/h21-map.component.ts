import {AfterContentInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {IMarker} from "../../dto/map/i-marker";
import Marker = google.maps.Marker;
import {IPosition} from "../../dto/map/i-position";

@Component({
	selector: 'h21-map',
	templateUrl: './h21-map.component.html',
	styleUrls: ['./h21-map.component.css']
})
export class H21MapComponent implements AfterContentInit {

	@ViewChild('gmap') gmapElement: any;

	private mapPromise: Promise<google.maps.Map>;
	private _mapResolver: (value?: google.maps.Map) => void;

	// google map
	map: google.maps.Map;

	//map center
	@Input() center: IPosition = {lat: 55.7, lng: 37.6};
	//zoom
	@Input() zoom: number = 5;

	// google map markers
	googleMarkers: Marker[];
	// h21 markers
	private _markers: IMarker[];

	get markers(): IMarker[] {
		return this._markers;
	}

	@Input()
	set markers(value: IMarker[]) {
		this._markers = value;
		this.clearMarkers();
		this.setMarkers();
	}

	constructor() {
		this.mapPromise = new Promise<google.maps.Map>((resolve: () => void) => {
			this._mapResolver = resolve;
		});
	}

	ngAfterContentInit() {
		this.createMap();
	}

	createMap(){
		let mapProp = {
			center: this.center,
			zoom: 5,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

		this._mapResolver(this.map);
	}

	clearMarkers(): void {
		if (this.googleMarkers) {
			this.googleMarkers.forEach(e => e.setMap(null));
		}
		this.googleMarkers = [];
	}

	addMarker(marker: IMarker): void {
		this.mapPromise.then(e => {
			let value = new google.maps.Marker({
				position: marker.position,
				title: marker.title,
				map: e
			});
			this.googleMarkers.push(value);
		});
	}

	setMarkers(): void {
		if (this.markers && this.markers.length > 0) {
			this.markers.forEach(e => this.addMarker(e));
		}
	}
}
