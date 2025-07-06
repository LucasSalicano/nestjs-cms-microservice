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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.loginUseCase.execute(body.email, body.password);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['Admin', 'Editor', 'Author', 'Viewer'] },
      },
    },
  })
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
