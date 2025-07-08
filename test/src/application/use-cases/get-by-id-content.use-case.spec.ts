import { Repository } from 'typeorm';
import { Content } from '@entities/content.entity';
import { ContentVersion } from '@entities/content-versions.entity';
import { GetByIdContentUseCase } from '../../../../src/application/use-cases/contents/get-by-id-content.use-case';

describe('GetByIdContentUseCase', () => {
  let useCase: GetByIdContentUseCase;
  let contentRepo: jest.Mocked<Repository<Content>>;
  let versionRepo: jest.Mocked<Repository<ContentVersion>>;

  beforeEach(() => {
    contentRepo = {
      findOneByOrFail: jest.fn(),
    } as any;

    versionRepo = {
      findBy: jest.fn(),
    } as any;

    useCase = new GetByIdContentUseCase(contentRepo, versionRepo);
  });

  it('should return content with its versions', async () => {
    const mockContent = {
      id: '123',
      title: 'Title',
      body: 'Body',
      version: 2,
    } as Content;
    const mockVersions = [
      { contentId: '123', version: 1, title: 'Old Title', body: 'Old Body' },
    ] as ContentVersion[];

    contentRepo.findOneByOrFail.mockResolvedValue(mockContent);
    versionRepo.findBy.mockResolvedValue(mockVersions);

    const result = await useCase.execute('123');

    expect(contentRepo.findOneByOrFail).toHaveBeenCalledWith({ id: '123' });
    expect(versionRepo.findBy).toHaveBeenCalledWith({ contentId: '123' });
    expect(result).toEqual({ ...mockContent, versions: mockVersions });
  });
});
