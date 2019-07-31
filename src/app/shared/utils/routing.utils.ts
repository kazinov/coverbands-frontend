import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import flatten from 'lodash-es/flatten';
import { identity } from 'rxjs';

export abstract class RoutingUtils {
  static findPath(state: RouterStateSnapshot, routeMatcher: (route: Route) => boolean): string[] {
    let routes = [];
    RoutingUtils.traceSnapshot(state.root, (path: ActivatedRouteSnapshot[], last: ActivatedRouteSnapshot) => {
      if (routeMatcher(last.routeConfig)) {
        routes = flatten(path.map(mapPath)).filter(identity);
        return false;
      }
    });

    return routes;

    function mapPath(rout: ActivatedRouteSnapshot) {
      return rout.url.map(segment => segment.path);
    }
  }

  static traceSnapshot(root: ActivatedRouteSnapshot, cb: (path: ActivatedRouteSnapshot[], last: ActivatedRouteSnapshot) => boolean | void) {
    const path = [];

    function go(child: ActivatedRouteSnapshot, index: number) {
      path.push(child);

      const last = path[path.length - 1];
      if (cb(path, last) === false) {
        return false;
      }

      if (child.children) {
        child.children.forEach(go);
      }
      path.pop();
    }

    if (root && root.children) {
      root.children.forEach(go);
    }
  }

  static hasRouteId(router: Router, id: any) {
    return RoutingUtils
      .shapshotHasRouteId(router.routerState.snapshot.root, id);
  }

  static routeHasRouteId(routeConfig: Route, id: any) {
    return routeConfig && routeConfig.data && routeConfig.data.id === id;
  }

  static shapshotHasRouteId(root: ActivatedRouteSnapshot, routeId: any) {
    let shapshotHasRouteId = false;
    RoutingUtils.traceSnapshot(root,
      (path: ActivatedRouteSnapshot[], snapshot: ActivatedRouteSnapshot) => {
        if (RoutingUtils.routeHasRouteId(snapshot.routeConfig, routeId)) {
          shapshotHasRouteId = true;
          return false;
        }
      });
    return shapshotHasRouteId;
  }

  static buildUrl(path: string[]): string {
    return '/' + path.join('/');
  }
}
