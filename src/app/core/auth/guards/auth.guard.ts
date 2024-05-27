import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) =>
{
    const router: Router = inject(Router);

    // Check the authentication status
    return inject(AuthService).check().pipe(
        switchMap((authenticated) =>
        {
            // get redirect url from parameters
            const redirectURL = new URLSearchParams(window.location.search).get('redirectURL');

            // If the user is not authenticated...
            if ( !authenticated )
            {
                let param = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;

                if (redirectURL && (redirectURL.startsWith('http'))) {
                    param = `redirectURL=${redirectURL}`;
                }

                const urlTree = router.parseUrl(`sign-in?${param}`);

                return of(urlTree);
            } else 
            {
                if(redirectURL && redirectURL.startsWith('http')){
                    // Get the access token,tenantId, role, userId, expireDate  from local storage
                    const accessToken = localStorage.getItem('accessToken');
                    const tenantId = localStorage.getItem('tenantId');
                    const role = localStorage.getItem('role');
                    const userId = localStorage.getItem('userId');
                    const expireDate = localStorage.getItem('expireDate');

                    // Pass the access token,tenantId, role, userId, expireDate to the external site
                    window.location.href = `${redirectURL}?accessToken=${accessToken}&tenantId=${tenantId}&role=${role}&userId=${userId}&expireDate=${expireDate}`;
                }}

            // Allow the access
            return of(true);
        }),
    );
};
