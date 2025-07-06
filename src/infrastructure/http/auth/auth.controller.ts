import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { LoginUseCase } from '../../../application/use-cases/login.use-case.js';
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.use-case';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.loginUseCase.execute(body.email, body.password);
  }

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      role?: 'Admin' | 'Editor' | 'Author' | 'Viewer';
    },
  ) {
    return this.registerUserUseCase.execute(
      body.email,
      body.password,
      body.role,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
