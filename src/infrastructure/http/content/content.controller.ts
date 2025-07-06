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
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { Roles } from '../../../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../../../shared/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetByIdContentUseCase } from '../../../application/use-cases/contents/get-by-id-content.use-case';
import { CreateContentUseCase } from '../../../application/use-cases/contents/create-content.use-case';
import { UpdateContentUseCase } from '../../../application/use-cases/contents/update-content.use-case';
import { GetAllContentWithVersionsUseCase } from '../../../application/use-cases/contents/get-all-content-with-versions.use-case';
import { DeleteContentUseCase } from '../../../application/use-cases/contents/delete-content.use-case';

@ApiTags('Content')
@Controller({ path: 'contents', version: '1' })
export class ContentController {
  constructor(
    private readonly createContent: CreateContentUseCase,
    private readonly updateContent: UpdateContentUseCase,
    private readonly getAllContentWithVersions: GetAllContentWithVersionsUseCase,
    private readonly deleteContent: DeleteContentUseCase,
    private readonly getByIdContentUseCase: GetByIdContentUseCase,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Editor', 'Author', 'Viewer')
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
    @Req() req,
    @Param('id') id: string,
    @Body() body: { title: string; body: string },
  ) {
    const userId: string = req.user.userId;
    return this.updateContent.execute(id, body, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Editor', 'Author')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteContent.execute(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin', 'Editor', 'Author', 'Viewer')
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.getByIdContentUseCase.execute(id);
  }
}
