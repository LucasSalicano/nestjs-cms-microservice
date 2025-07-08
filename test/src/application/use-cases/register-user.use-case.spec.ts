import { RegisterUserUseCase } from '../../../../src/application/use-cases/register-user.use-case';
import { Repository } from 'typeorm';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  let userRepo: jest.Mocked<Repository<any>>;

  beforeEach(() => {
    userRepo = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn((user: any) => user),
    } as any;

    useCase = new RegisterUserUseCase(userRepo);
  });

  it('should register a new user with hashed password', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'password',
      role: 'Viewer',
    };

    userRepo.findOneBy.mockResolvedValue(null);
    userRepo.save.mockImplementation(async (user: any) => {
      return {
        ...user,
        id: '1',
        password: 'hashed-password',
        createdAt: new Date(),
      };
    });

    const result = await useCase.execute(dto.email, dto.password);

    expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: dto.email });
    expect(userRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        email: dto.email,
        role: dto.role,
      }),
    );
    expect(result.id).toBe('1');
  });
});
