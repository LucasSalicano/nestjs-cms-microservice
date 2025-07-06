import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateContentUseCase } from '../../../application/use-cases/create-content.use-case.js';
import { UpdateContentUseCase } from '../../../application/use-cases/update-content.use-case';
import { GetAllContentWithVersionsUseCase } from '../../../application/use-cases/get-all-content-with-versions.use-case';
import { DeleteContentUseCase } from '../../../application/use-cases/delete-content.use-case';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../../../shared/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Content')
@Controller({ path: 'contents', version: '1' })
export class ContentController {
  constructor(
    private readonly createContent: CreateContentUseCase,
    private readonly updateContent: UpdateContentUseCase,
    private readonly getAllContentWithVersions: GetAllContentWithVersionsUseCase,
    private readonly deleteContent: DeleteContentUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.getAllContentWithVersions.execute();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor', 'Author')
  @Post()
  async create(@Req() req, @Body() body: { title: string; body: string }) {
    const userId: string = req.user.userId;
    return this.createContent.execute(body, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; body: string },
  ) {
    return this.updateContent.execute(id, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor', 'Author')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteContent.execute(id);
  }
}
