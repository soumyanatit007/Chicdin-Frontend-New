import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserHttpService } from '../../providers/user.Service';
import { Broadcaster } from '../../providers/eventEmitter';
declare var $: any;
@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    providers: [UserHttpService]
})

export class AppHeader implements OnInit {


    userData: any;
    IsLoggedIn = false;
    name: any;

    isDefaultImageShow = true;
    isImageShow = false;

    public userId: any;
    public userImage: any = '';

    public mainCatagories: any;

    constructor(public router: Router,
        public http: UserHttpService,
        public broadcast: Broadcaster) {
    }

    ngOnInit() {

        $('.responsive_nav').click(function () {
            $('.main_navigation').slideToggle();
        });
        $('.main_navigation ul ul').each(function () {
            if ($(this).children().length) {
                $(this, 'li:first').parent().append('<span class="mean-expand"></span>');
            }
        });
        if (localStorage.getItem('UserData')) {
            // this.IsLoggedIn = true;
            // this.userId = JSON.parse(localStorage.getItem('UserData')).id;
            // console.log('userId in ep :', this.userId);

            if (JSON.parse(localStorage.getItem('UserData')).profile_image === '') {
                this.IsLoggedIn = true;

                this.isDefaultImageShow = true;
                this.isImageShow = false;

                // tslint:disable-next-line:max-line-length
                this.name = JSON.parse(localStorage.getItem('UserData')).first_name + ' ' + JSON.parse(localStorage.getItem('UserData')).last_name;
            } else if (JSON.parse(localStorage.getItem('UserData')).profile_image) {
                this.IsLoggedIn = true;

                this.isDefaultImageShow = false;
                this.isImageShow = true;
                // tslint:disable-next-line:max-line-length
                this.name = JSON.parse(localStorage.getItem('UserData')).first_name + ' ' + JSON.parse(localStorage.getItem('UserData')).last_name;
                this.userImage = JSON.parse(localStorage.getItem('UserData')).profile_image;
                // console.log(this.userImage);
            }
        }

        this.broadcast.on<any>('userdata')
            .subscribe(user => {
                if (user && localStorage.getItem('UserData')) {
                    console.log('user :', user);

                    this.IsLoggedIn = true;

                    this.name = user.first_name + ' ' + user.last_name;
                    if (user.profile_image === '') {
                        this.isDefaultImageShow = true;
                        this.isImageShow = false;
                    } else if (user.profile_image) {
                        this.isDefaultImageShow = false;
                        this.isImageShow = true;
                        this.userImage = user.profile_image;
                    }
                } else if (user) {
                    this.IsLoggedIn = false;
                    this.isDefaultImageShow = true;
                    this.isImageShow = false;

                    this.name = user.first_name + ' ' + user.last_name;
                    // this.userImage = user.profile_image;
                }
            });

        this.http.fetchingCatagories().then((success: any) => {
            this.mainCatagories = success.result;
            // console.log('this.mainCatagories :', this.mainCatagories);
        }).catch((error: any) => {
            console.log('error :', error);
        });
    }

    SignIn() {
        this.router.navigate(['/login']);
    }

    SignUp() {
        this.router.navigate(['/signup']);
    }

    // editProfile() {
    //     this.router.navigate(['/profile']);
    // }

    // clear localstorage data
    logout() {
        localStorage.clear();

        this.broadcast.broadcast('userdata', {
            first_name: '',
            last_name: ''
        });
        this.router.navigate(['/login']);
    }

    categoryDetails(value: any) {
        console.log(value);
        let lat: any;
        let long: any;
        // getting location
        if (localStorage.getItem("location1")) {
            lat = JSON.parse(localStorage.getItem("location1")).lat;
            long = JSON.parse(localStorage.getItem("location1")).long;
        }
        const navigationExtras: NavigationExtras = {
            queryParams: {
                'keyword_slug': value.slug,
                'title': value.name,
                'lat': lat,
                'long': long,
                'keyword_type': "subcategory"
            }
        };
        this.router.navigate(['/categorySearch'], navigationExtras);
    }
}