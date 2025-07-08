import { Repository } from 'typeorm';
import { Content } from '@entities/content.entity';
import { ContentVersion } from '@entities/content-versions.entity';
import { GetAllContentWithVersionsUseCase } from '../../../../src/application/use-cases/contents/get-all-content-with-versions.use-case';

describe('GetAllContentWithVersionsUseCase', () => {
  let useCase: GetAllContentWithVersionsUseCase;
  let contentRepo: jest.Mocked<Repository<Content>>;
  let versionRepo: jest.Mocked<Repository<ContentVersion>>;

  beforeEach(() => {
    contentRepo = {
      find: jest.fn(),
    } as any;

    versionRepo = {
      find: jest.fn(),
    } as any;

    useCase = new GetAllContentWithVersionsUseCase(contentRepo, versionRepo);
  });

  it('should return all contents with their respective versions', async () => {
    const mockContents = [
      { id: '1', title: 'First', body: 'Body 1' },
      { id: '2', title: 'Second', body: 'Body 2' },
    ] as Content[];

    const mockVersions = [
      { contentId: '1', version: 1, title: 'First v1', body: 'v1 body' },
      { contentId: '2', version: 1, title: 'Second v1', body: 'v1 body' },
      { contentId: '1', version: 2, title: 'First v2', body: 'v2 body' },
    ] as ContentVersion[];

    contentRepo.find.mockResolvedValue(mockContents);
    versionRepo.find.mockResolvedValue(mockVersions);

    const result = await useCase.execute();

    expect(contentRepo.find).toHaveBeenCalled();
    expect(versionRepo.find).toHaveBeenCalled();

    expect(result).toEqual([
      {
        ...mockContents[0],
        versions: [mockVersions[0], mockVersions[2]],
      },
      {
        ...mockContents[1],
        versions: [mockVersions[1]],
      },
    ]);
  });
});
