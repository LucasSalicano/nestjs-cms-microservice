import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateContentUseCase } from '../../../application/use-cases/create-content.use-case.js';
import { UpdateContentUseCase } from '../../../application/use-cases/update-content.use-case';
import { GetAllContentWithVersionsUseCase } from '../../../application/use-cases/get-all-content-with-versions.use-case';
import { DeleteContentUseCase } from '../../../application/use-cases/delete-content.use-case';

@Controller({ path: 'contents', version: '1' })
export class ContentController {
  constructor(
    private readonly createContent: CreateContentUseCase,
    private readonly updateContent: UpdateContentUseCase,
    private readonly getAllContentWithVersions: GetAllContentWithVersionsUseCase,
    private readonly deleteContent: DeleteContentUseCase,
  ) {}

  @Get()
  async findAll() {
    return this.getAllContentWithVersions.execute();
  }

  @Post()
  async create(@Body() body: { title: string; body: string }) {
    return this.createContent.execute(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; body: string },
  ) {
    return this.updateContent.execute(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteContent.execute(id);
  }
}
