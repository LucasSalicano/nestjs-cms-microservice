import { Repository } from 'typeorm';
import { Content } from '@entities/content.entity';
import { CreateContentUseCase } from '../../../../src/application/use-cases/contents/create-content.use-case';
import { EventPublisher } from '../../../../src/application/services/event-emitter.port';

describe('CreateContentUseCase', () => {
  let useCase: CreateContentUseCase;
  let contentRepo: jest.Mocked<Repository<Content>>;
  let eventPublisher: jest.Mocked<EventPublisher>;

  beforeEach(() => {
    contentRepo = {
      save: jest.fn(),
    } as any;

    eventPublisher = {
      publish: jest.fn(),
    };

    contentRepo = {
      save: jest.fn(),
      create: jest.fn((entity) => entity),
    } as any;

    useCase = new CreateContentUseCase(contentRepo);
  });

  it('should create and save a new content', async () => {
    const dto = { title: 'Title', body: 'Body', createdBy: '1' };
    const savedContent = { ...dto, id: '1' } as Content;

    contentRepo.save.mockResolvedValue(savedContent);

    const result = await useCase.execute(dto, '1');

    expect(contentRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Title',
        body: 'Body',
        createdBy: '1',
      }),
    );
    expect(result.id).toBe('1');
  });
});
