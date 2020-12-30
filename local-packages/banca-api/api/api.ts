export * from './consortiums.service';
import { ConsortiumsService } from './consortiums.service';
export * from './consortiums.serviceInterface'
export * from './default.service';
import { DefaultService } from './default.service';
export * from './default.serviceInterface'
export * from './users.service';
import { UsersService } from './users.service';
export * from './users.serviceInterface'
export const APIS = [ConsortiumsService, DefaultService, UsersService];
