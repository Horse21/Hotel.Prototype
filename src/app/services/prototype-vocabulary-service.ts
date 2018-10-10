import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {ICodeNamedEntity, VocabularyService} from 'h21-be-ui-kit';
import {Observable, Subscriber} from 'rxjs';
import {SearchFlightDto, Passenger, SearchResult, City} from 'h21-be-ui-kit';
import {
	IHotelInfo,
	IHotelOption,
	IHotelSearchOptions
} from "h21-be-ui-kit/dto";


@Injectable()
export class PrototypeVocabularyService implements VocabularyService {

	roomType: ICodeNamedEntity[] = [
		{id: 1, code: 'SNGL', name: 'Single'},
		{id: 2, code: 'DBL', name: 'Double'},
		{id: 3, code: 'TWIN', name: 'Twin'},
		{id: 4, code: 'TRPL', name: 'Triple'},
		{id: 5, code: 'PAX ', name: 'Pax'},
		{id: 6, code: 'ADL', name: 'Adl'}
	];

	constructor(private _http: HttpClient) {
	}

	public getCities(pattern: string): Observable<City[]> {
		if (!pattern || pattern.length < 2) {
			return Observable.create();
		}
		return this._http.get<City[]>("./assets/prototype-storage/Cities.json")
			.pipe(map(data => {
				return data.filter(x => x.name.indexOf(pattern) != -1)
					.filter((i, index) => (
						index < 10
					));
			}));
	}

	public searchFlights(options: SearchFlightDto): Observable<SearchResult> {

		switch (options.searchMode) {
			case 'round_trip':
				return this._http.get<SearchResult>('./assets/prototype-storage/round-trip.json');
			case 'one_way':
				return this._http.get<SearchResult>('./assets/prototype-storage/one-way.json');
			case 'multi_city':
				return this._http.get<SearchResult>('./assets/prototype-storage/multicity.json');
			default:
				return undefined;
		}
	}

	public searchPassengers(pattern: string): Observable<Passenger[]> {
		if (!pattern) {
			return Observable.create();
		}
		return this._http.get<Passenger[]>("./assets/prototype-storage/passengers.json")
			.pipe(map(data => {
				return data.filter(x => (x.firstName && x.firstName.indexOf(pattern) != -1)
					|| (x.surname && x.surname.indexOf(pattern) != -1))
					.filter((i, index) => (
						index < 10
					));
			}));
	}

	public searchHotels(options: IHotelSearchOptions): Observable<IHotelInfo[]> {
		var data = [
			<IHotelInfo> {
				id: 1,
				photo: './assets/samples_img/hotel_card/hotel-1.jpg',
				name: 'Pestana Amsterdam Riverside – LVX Preferred Hotels & Resorts',
				rate: 5,
				isFavorite: false,
				location: 'Amsteldijk 67, Oud Zuid, 1074 HZ Amsterdam, Netherlands',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 175.24,
				fee: 1.54,
			},
			<IHotelInfo> {
				id: 2,
				photo: './assets/samples_img/hotel_card/hotel-2.jpg',
				name: 'NH Amsterdam Schiller',
				rate: 4,
				isFavorite: true,
				location: 'Rembrandtplein 26-36, Amsterdam, Netherlands, 1017 CV',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 275.24,
				fee: 1.54,
			},
			<IHotelInfo> {
				id: 3,
				photo: './assets/samples_img/hotel_card/hotel-1.jpg',
				name: 'Pestana Amsterdam Riverside – LVX Preferred Hotels & Resorts',
				rate: 5,
				isFavorite: false,
				location: 'Amsteldijk 67, Oud Zuid, 1074 HZ Amsterdam, Netherlands',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 375.24,
				fee: 1.54,
			},
			<IHotelInfo> {
				id: 4,
				photo: './assets/samples_img/hotel_card/hotel-2.jpg',
				name: 'NH Amsterdam Schiller',
				rate: 3,
				isFavorite: false,
				location: 'Rembrandtplein 26-36, Amsterdam, Netherlands, 1017 CV',
				options: [
					<IHotelOption> {icon: 'check_circle', name: 'Free cancellation'},
					<IHotelOption> {icon: 'check_circle', name: 'Breakfast included'},
				],
				provider: 'GTA',
				price: 475.24,
				fee: 1.54,
			},
		];
		return Observable.create((observer: Subscriber<any>) => {
			observer.next(data);
			observer.complete();
		});
	}


}
