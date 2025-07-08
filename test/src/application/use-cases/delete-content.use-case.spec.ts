import { Repository } from 'typeorm';
import { Content } from '@entities/content.entity';
import { ContentVersion } from '@entities/content-versions.entity';
import { NotFoundException } from '@nestjs/common';
import { DeleteContentUseCase } from '../../../../src/application/use-cases/contents/delete-content.use-case';

describe('DeleteContentUseCase', () => {
  let useCase: DeleteContentUseCase;
  let contentRepo: jest.Mocked<Repository<Content>>;
  let versionRepo: jest.Mocked<Repository<ContentVersion>>;

  beforeEach(() => {
    contentRepo = {
      findOneBy: jest.fn(),
      remove: jest.fn(),
    } as any;

    versionRepo = {} as any;

    useCase = new DeleteContentUseCase(contentRepo, versionRepo);
  });

  it('should delete content when found', async () => {
    const mockContent = {
      id: '123',
      title: 'Old Title',
      body: 'Body',
    } as Content;
    contentRepo.findOneBy.mockResolvedValue(mockContent);
    contentRepo.remove.mockResolvedValue(mockContent);

    const result = await useCase.execute('123');

    expect(contentRepo.findOneBy).toHaveBeenCalledWith({ id: '123' });
    expect(contentRepo.remove).toHaveBeenCalledWith(mockContent);
    expect(result).toEqual({ success: true });
  });

  it('should throw NotFoundException if content is not found', async () => {
    contentRepo.findOneBy.mockResolvedValue(null);

    await expect(useCase.execute('invalid-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
