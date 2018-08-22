export interface ISearchFilter {
	destination?: string;
	checkInDate?: Date;
	checkOutDate?: Date;
	nightQuantity?: number;
	nationality?: number;
	adultQuantity?: number;
	childQuantity?: number;
	children? : number[];
	roomQuantity?: number;

	hotelName?: string;
	costFrom?: number;
	costTo?: number;
	ratings?: number[];
	carbonFootprintFrom?: number;
	carbonFootprintTo?: number;
	tags?: string[];
}
