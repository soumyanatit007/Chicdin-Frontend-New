import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Layout } from './containers/layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'home',
                loadChildren: './home/home.module#HomeModule',
            },
            {
                path: 'signup',
                data: {
                    breadcrumb: "Sign-Up"
                },
                loadChildren: './signup/signup.module#SignupModule',
            },
            {
                path: 'login',
                data: {
                    breadcrumb: "Login"
                },
                loadChildren: './login/login.module#LoginModule',
            },
            {
                path: 'forgotPassword',
                data: {
                    breadcrumb: "ForgotPassword"
                },
                loadChildren: './forgotPassword/forgotPassword.module#ForgotPasswordModule',
            },
            {
                path: 'profile',
                data: {
                    breadcrumb: "Profile"
                },
                loadChildren: './profile/profile.module#ProfileModule',
            },
            {
                path: 'card',
                loadChildren: './card/card.module#CardModule',
            },
            {
                path: 'booking',
                loadChildren: './booking/booking.module#BookingModule',
            },
            {
                path: 'categorySearch',
                data: {
                    breadcrumb: "Category-Search"
                },
                loadChildren: './categorySearch/categorySearch.module#CategorySearchModule',
            },
            {
                path: 'details',
                data: {
                    breadcrumb: "Details"
                },
                loadChildren: './details/details.module#DetailsModule',
            },
            {
                path: 'startbooking',
                data: {
                    breadcrumb: "Booking"
                },
                loadChildren: './startBooking/startBooking.module#startBookingModule',
            },
            {
                path: 'pay-and-book/:id',
                data: {
                    breadcrumb: "checkoutStep2"
                },
                loadChildren: './checkoutStep2/checkoutStep2.module#checkoutStep2Module',
            },
            {
                path: 'confirmation/:id',
                data: {
                    breadcrumb: "confirmation"
                },
                loadChildren: './confirmation/confirmation.module#confirmationModule',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
