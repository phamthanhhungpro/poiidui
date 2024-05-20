import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { DantocComponent } from './modules/admin/categories/dantoc/dantoc.component';
import { DonViComponent } from './modules/admin/settings/don-vi/don-vi.component';
import { ChiNhanhComponent } from './modules/admin/settings/chi-nhanh/chi-nhanh.component';
import { PhongBanBoPhanComponent } from './modules/admin/settings/phong-ban-bo-phan/phong-ban-bo-phan.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'admin'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'admin'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'admin', loadChildren: () => import('app/modules/admin/example/example.routes')},
            {path: 'tenant', loadChildren: () => import('app/modules/admin/tenant/tenant.routes')},
            {path: 'group', loadChildren: () => import('app/modules/admin/group/group.routes')},
            {path: 'user', loadChildren: () => import('app/modules/admin/user/user.routes')},
            {path: 'app-ssa', loadChildren: () => import('app/modules/admin/app/app.routes')},
            {path: 'app-admin', loadChildren: () => import('app/modules/admin/app-admin/app.routes')},
            {path: 'role', loadChildren: () => import('app/modules/admin/role/role.routes')},

            {path: 'function', loadChildren: () => import('app/modules/admin/function/function.routes')},
            {path: 'permission', loadChildren: () => import('app/modules/admin/permission/permission.routes')},

            {path: 'my-profile', component: ProfileComponent},

            {path: 'categories/dan-toc', component: DantocComponent},
            {path: 'categories/ton-giao', component: DantocComponent},

            {path: 'settings/don-vi', component: DonViComponent},
            {path: 'settings/chi-nhanh', component: ChiNhanhComponent},
            {path: 'settings/phong-ban-bo-phan', component: PhongBanBoPhanComponent},


        ]
    }
];
