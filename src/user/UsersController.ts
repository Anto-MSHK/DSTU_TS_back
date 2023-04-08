import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./UsersService";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}
}
