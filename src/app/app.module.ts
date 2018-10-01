import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NouisliderModule} from 'ng2-nouislider';
import {PrototypePermissionService} from '../app/services/prototype-permission-service';
import {PrototypeVocabularyService} from '../app/services/prototype-vocabulary-service';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {AppComponent} from './components/app/app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './modules/app-material.module';
import {
	AppSubscriberService,
	VocabularyService,
	OrderService,
	PermissionService,
	H21RightOverlayPanelService,
	H21HeaderModule,
	H21TopToolbarModule,
	H21HotelSearchResultModule,
	H21HotelFilterPanelModule,
	H21HistoryPanelModule,
	H21HotelSearchPanelModule,
	H21SidebarNavModule,
	H21HotelBookModule,
	H21HotelBookComponent,
	H21HotelReservationModule,
	H21HotelReservationComponent,
	H21AccountSelectModule,
	H21AccountSelectService,
} from 'h21-be-ui-kit';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {H21MapComponent} from './components/h21-map/h21-map.component';

const routes: Routes = [
	{path: '', redirectTo: 'map', pathMatch: 'full'},
	{path: 'profile', redirectTo: 'map', pathMatch: 'full'},
	{path: 'orders', redirectTo: 'map', pathMatch: 'full'},
	{path: 'map', component: H21MapComponent},
	{path: 'cart', component: H21HotelReservationComponent},
	{path: 'hotelbook/:id', component: H21HotelBookComponent},
	{path: '**', redirectTo: '/'}
];

@NgModule({
		declarations: [
			AppComponent,
			H21MapComponent,
		],
		imports: [
			BrowserModule,
			RouterModule.forRoot(routes),
			BrowserAnimationsModule,
			AppMaterialModule,
			ReactiveFormsModule,
			FormsModule,
			HttpClientModule,
			MatInputModule,
			MatNativeDateModule,
			NouisliderModule,
			H21HeaderModule,
			H21TopToolbarModule,
			H21HotelSearchResultModule,
			H21HotelFilterPanelModule,
			H21HistoryPanelModule,
			H21HotelSearchPanelModule,
			H21SidebarNavModule,
			H21HotelBookModule,
			H21HotelReservationModule,
			H21AccountSelectModule
		],
		providers: [
			{
				provide: PermissionService,
				useClass: PrototypePermissionService
			},
			{
				provide: VocabularyService,
				useClass: PrototypeVocabularyService
			},
			H21RightOverlayPanelService,
			AppSubscriberService,
			H21AccountSelectService,
			OrderService
		],
		bootstrap: [AppComponent],
		entryComponents: []
	}
)
export class AppModule {
}
