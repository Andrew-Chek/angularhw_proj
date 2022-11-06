import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Params, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/', '/admin', '/admin/board/1', '/admin/task/1'];
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceStub: Partial<AuthService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigateByUrl']); // [1]
    serviceStub = {}; 
    guard = new AuthGuard(serviceStub as AuthService, routerSpy);
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      serviceStub.isAuthorized = true;
    });
    fakeUrls.forEach((fakeUrl) => {
      it('grants access', () => {
        const isAccessGranted = guard.isAuthorized(fakeUrl);

        expect(isAccessGranted).toBeTrue();
      });

      describe('and navigates to a guarded route configuration', () => {
        it('grants route access', () => {
          const canActivate = guard.canActivate(dummyRoute, fakeRouterState(fakeUrl));

          expect(canActivate).toBeTrue();
        });

        it('grants child route access', () => {
          const canActivateChild = guard.canActivateChild(dummyRoute, fakeRouterState(fakeUrl)); 

          expect(canActivateChild).toBeTrue();
        });

        const paths = fakeUrl.split('/').filter((path) => path !== ''); 

        paths.forEach((path) => {
          it('grants feature access', () => {
            const fakeRoute: Route = { path }; 
            const fakeUrlSegment = { path } as UrlSegment; 

            const canLoad = guard.canLoad(fakeRoute, [fakeUrlSegment]);

            expect(canLoad).toBeTrue();
          });
        });
      });
    });
  });

  describe('when the user is logged out', () => {
    beforeEach(() => {
      serviceStub.isAuthorized = false;
    });
    fakeUrls.forEach((fakeUrl) => {
      // [2]
      it('rejects access', () => {
        const isAccessGranted = guard.isAuthorized(fakeUrl);

        expect(isAccessGranted).toBeFalse();
      });

      it('stores the redirect URL', () => {
        guard.isAuthorized(fakeUrl);

        expect(serviceStub.redirectUrl).toBe(fakeUrl);
      });

      it('navigates to the login page', () => {
        // [1]
        guard.isAuthorized(fakeUrl);

        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
      });
    });
  });
});
