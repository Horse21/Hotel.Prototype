import {ICodeNamedEntity} from "h21-be-ui-kit";

export interface ISearchList extends ICodeNamedEntity {
	picture?: string;

	addressName?: string;
	addressLatitude?: number;
	addressLongitude?: number;

	rating?: number;

	isFreeCancel?: boolean;
	isBreakfastInclude?: boolean;

	cost?: number;
	margin?: number;
}
