import {AfterContentChecked, Component, ViewChild} from '@angular/core';
import {MatIconRegistry, MatSidenav} from '@angular/material';
import {
	H21HotelSearchResultComponent,
	IHotelSearchOptions,
	INotifyItem,
	ISidebarNavTab, IUserCardData,
} from 'h21-be-ui-kit';
import { PermissionService } from 'h21-be-ui-kit';
import { AuthData } from '../../dto/auth-data';
import { IMarker } from "../../dto/map/i-marker";
import {Router} from "@angular/router";

const SIDEBAR_NAV_TABS: Array<ISidebarNavTab> = [
	{name: 'search', label: 'Search', icon: 'search', type: 'button', url: null, disabled: false},
	{name: 'filter', label: 'Filter', icon: 'filter_list', type: 'button', url: null, disabled: true},
	{name: 'history', label: 'History', icon: 'history', type: 'button', url: null, disabled: false},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [MatIconRegistry],
})

export class AppComponent implements AfterContentChecked {

	title = 'prototype';
	username: string;
	private permissionService: PermissionService;

	markers: IMarker[] = [
		{position: {lat:55.6, lng: 37.3}, title: '1'},
		{position: {lat:55.5, lng: 37.4}, title: '2'},
		{position: {lat:55.4, lng: 37.5}, title: '3'}];

	constructor(permissionService: PermissionService,
				private _router: Router) {
		this.permissionService = permissionService;
		if(this.permissionService.isAuth()) {
			this.username = this.permissionService.getUsername();
		}
		this.testInit();
	}

	prototypeAuth(data: any): void {
		var authData: AuthData = <AuthData> {
			name: data.name,
			roles: data.roles,
			claims: data.claims
		};
		localStorage.setItem("authData", JSON.stringify(authData));
		location.reload();
	}

	logout(): void {
		localStorage.setItem("authData", null);
		location.reload();
	}

	getNotifyList(): INotifyItem[] {
		return [
			<INotifyItem>{text: 'First notification'},
			<INotifyItem>{text: 'Second notification'}
		];
	}


	@ViewChild('leftSidenav') private leftSidenav: MatSidenav;
	@ViewChild('rightSidenav') private rightSidenav: MatSidenav;
	// @ViewChild('contentSidenav') private contentSidenav: MatSidenavContent;
	@ViewChild('searchResult') private searchResult: H21HotelSearchResultComponent;

	userName: string;
	userCardData: IUserCardData;

	activeLeftSidenavPanel: string = 'search';
	searchMode: 'hotel' | 'room' = 'hotel';
	sidenavOpened: boolean = false;
	sidenavToggleDisabled: boolean = false;
	searchResultVisibility: boolean = false;
	searchResultViewMode: string = 'list';
	sidebarNavDisabled: boolean = true;
	sidebarNavTabs: Array<ISidebarNavTab> = SIDEBAR_NAV_TABS;
	sidebarNavActiveTab: string = '';

	/* Left sidenav configuration */
	leftSidenavOpened: boolean = false;
	leftSidenavMode: string = ''; // 'side', 'over', 'push'

	/* Right sidenav configuration */
	rightSidenavOpened: boolean = false;
	rightSidenavMode: string = ''; // 'side', 'over', 'push'

	/* Sidenav content configuration */
	contentSidenavHasBackdrop: boolean = false;

	ngAfterContentChecked() {
		if (this.isRoute('cart')) {
			if (this.sidenavOpened) {
				this.leftSidenavToggle();
			}
			this.sidenavToggleDisabled = true;
			this.searchMode = 'hotel';
		}
		else if (this.isRoute('hotelbook')) {
			this.sidenavOpened = true;
			this.sidebarNavDisabled = true;
			this.sidenavToggleDisabled = true;
			this.searchMode = 'room';
		}
		else {
			this.sidenavToggleDisabled = false;
			this.searchMode = 'hotel';
		}
	}

	leftSidenavToggle(): void {
		this.leftSidenav.toggle();
		if (this.leftSidenav.opened) {
			this.sidebarNavDisabled = false;
			this.searchResultViewMode = 'list';
			this.sidenavOpened = true;
		} else {
			this.sidebarNavDisabled = true;
			this.sidenavOpened = false;
		}
	}

	sidebarNavAction(tab: ISidebarNavTab): void {
		if (!this.leftSidenav.opened) {
			this.leftSidenavToggle();
		}
		this.activeLeftSidenavPanel = tab.name;
	}

	search(options: IHotelSearchOptions): void {
		this.searchResultVisibility = true;
		this.sidebarNavTabs.find((item) => { return item.name == 'filter'; }).disabled = false;
		setTimeout(() => {
			this.searchResult.search(options);
			this.activeLeftSidenavPanel = 'filter';
			this.sidebarNavActiveTab = 'filter';
		}, 0);
	}

	clearSearch(): void {
		this.searchResultVisibility = false;
		this.sidebarNavTabs.find((item) => { return item.name == 'filter'; }).disabled = true;
		this.searchResult.clear();
	}

	changeResultViewMode(mode: string): void {
		this.searchResultViewMode = mode;
	}

	isRoute(route: string){
		return this._router.url.indexOf(route) >= 0;
	}

	testInit() {
		this.userName = 'Horse B.V. | Sergey Strovatikov';
		this.userCardData = {
			user: {
				name: 'Sergey Strovatikov',
				email: 'darkdes6@gmail.com',
				avatarUrl: './assets/avatar-picture.png',
			},
			actions: [
				{
					name: 	'profile',
					label:	'My profile',
					icon:	'person',
					route:	'profile',
					type:	'link'
				},
				{
					name: 	'orders',
					label: 	'Orders',
					icon: 	'insert_drive_file',
					route: 	'orders',
					type: 	'link'
				},
				{
					name: 	'cart',
					label: 	'Cart',
					icon: 	'shopping_cart',
					route: 	'cart',
					type: 	'link'
				}
			]
		};
	}
}
