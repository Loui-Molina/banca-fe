export * from './consortiums.service';
import { ConsortiumsService } from './consortiums.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [ConsortiumsService, DefaultService, UsersService];
