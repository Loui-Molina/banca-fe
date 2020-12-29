// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {User} from '../../local-packages/banca-api';

export const environment = {
  production: false,
  jwtEnabled: true,
  urlApi: 'http://localhost:3000',
  users: [
    {
      username: 'banking',
      name: 'Seba',
      role: User.RoleEnum.Banker,
      password: 'h9M4duPk'
    } as User,
    {
      username: 'consortium',
      name: 'Engelbert',
      role: User.RoleEnum.Consortium,
      password: 'h9M4duPk'
    } as User, {
      username: 'admin',
      name: 'Loui',
      role: User.RoleEnum.Admin,
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
