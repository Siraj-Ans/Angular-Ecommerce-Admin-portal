import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
    constructor(private socialAuthService: SocialAuthService, private router: Router) { }

    ngOnInit(): void {
        this.socialAuthService.authState
        .subscribe({
            next: user => {
                console.log('user: ', user);
                this.router.navigate([''])
            
        },
        error: (err) => {
            console.log('err: ', err)
        }
    })
        

    }


}