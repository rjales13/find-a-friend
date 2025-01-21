import { UsersRepository } from '@/repositories/users-repository';
import { User, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      number: data.number ?? '',
      aditional_description: data.aditional_description ?? '',
      city: data.city,
      state: data.state,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      role: data.role,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
