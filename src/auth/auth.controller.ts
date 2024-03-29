import {
  Body,
  Controller,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from './dto/response.dto';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { Public } from './auth.decorator';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'регистрация/создание пользователя' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @Post('/register')
  @Public()
  async register(@Body() dto: CreateUserDTO, @Response() res) {
    const result = await this.authService.register(dto);
    this.setRefreshAndSendAccess(res, result.tokens, result.user);
  }

  @ApiOperation({ summary: 'логин' })
  @ApiResponse({ status: 200, type: ResponseDto })
  @Post('/login')
  @Public()
  async login(@Body() dto: CreateUserDTO, @Response() res) {
    const result = await this.authService.login(dto);
    this.setRefreshAndSendAccess(res, result.tokens, result.user);
  }

  @Post('/logout')
  async logout(@Request() req, @Response() res) {
    const refreshToken = req.cookies.refreshToken;
    await this.authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json();
  }

  @UseGuards(AuthGuard('refresh-str'))
  @Post('/refresh')
  async refreshTokens(@Request() req, @Response() res) {
    const result = await this.authService.refresh(req.user);
    this.setRefreshAndSendAccess(res, result.tokens, result.user);
  }

  private setRefreshAndSendAccess(
    res,
    tokens: { accessToken: string; refreshToken: string },
    user,
  ) {
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.json(new ResponseDto(user, tokens));
  }
}
