import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  zipCode: string;
  address: string;
  number: string;
  aditionalDescription: string;
  city: string;
  state: string;
  whatsapp: string;
  role: 'ORG' | 'MEMBER';
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    zipCode,
    address,
    number,
    aditionalDescription,
    city,
    state,
    whatsapp,
    role,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      zipcode: zipCode,
      address,
      number,
      aditional_description: aditionalDescription,
      city,
      state,
      whatsapp,
      role,
      password_hash,
    });

    return {
      user,
    };
  }
}
