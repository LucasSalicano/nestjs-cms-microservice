import { Repository } from 'typeorm';
import { UpdateContentUseCase } from '../../../../src/application/use-cases/contents/update-content.use-case';
import { EventPublisher } from '../../../../src/application/services/event-emitter.port';
import { Content } from '@entities/content.entity';
import { ContentVersion } from '@entities/content-versions.entity';

describe('UpdateContentUseCase', () => {
  let useCase: UpdateContentUseCase;
  let contentRepo: jest.Mocked<Repository<Content>>;
  let versionRepo: jest.Mocked<Repository<ContentVersion>>;
  let eventPublisher: jest.Mocked<EventPublisher>;

  beforeEach(() => {
    contentRepo = {
      findOneByOrFail: jest.fn(),
      save: jest.fn(),
    } as any;

    versionRepo = {
      save: jest.fn(),
    } as any;

    eventPublisher = {
      publish: jest.fn(),
    };

    useCase = new UpdateContentUseCase(
      contentRepo,
      versionRepo,
      eventPublisher,
    );
  });

  it('should update content and create a version', async () => {
    const oldContent = {
      id: '1',
      title: 'Old',
      body: 'Body',
      version: 1,
    } as Content;
    const updatedContent = {
      ...oldContent,
      title: 'New',
      body: 'New Body',
      version: 2,
    } as Content;

    contentRepo.findOneByOrFail.mockResolvedValue(oldContent);
    contentRepo.save.mockResolvedValue(updatedContent);

    const result = await useCase.execute(
      '1',
      {
        title: 'New',
        body: 'New Body',
      },
      '1',
    );

    expect(contentRepo.findOneByOrFail).toHaveBeenCalledWith({ id: '1' });
    expect(versionRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        contentId: '1',
        title: 'Old',
        version: 1,
      }),
    );
    expect(contentRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New',
        body: 'New Body',
        version: 2,
      }),
    );
    expect(eventPublisher.publish).toHaveBeenCalledWith(
      'Content:Updated',
      expect.anything(),
    );
    expect(result.title).toBe('New');
  });
});
