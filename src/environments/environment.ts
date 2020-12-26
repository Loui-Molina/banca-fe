// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {User, UserRole} from '../../local-packages/banca-api';

export const environment = {
  production: false,
  urlApi: 'http://localhost:3000',
  users: [
    {
      username: 'banking',
      name: 'Seba',
      role: UserRole.banker,
      password: 'h9M4duPk'
    } as User,
    {
      username: 'consortium',
      name: 'Engelbert',
      role: UserRole.consortium,
      password: 'h9M4duPk'
    } as User, {
      username: 'admin',
      name: 'Loui',
      role: UserRole.admin,
      password: 'h9M4duPk'
    } as User],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
