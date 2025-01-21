import {
  PetsRepository,
  SearchPetsUseCaseRequest,
} from '@/repositories/pets-repository';
import { Pet, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { InMemoryUsersRepository } from './in-memory-users-repository';

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private usersRepository?: InMemoryUsersRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independency: data.independency,
      environment: data.environment,
      user_id: data.user_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async searchMany(data: SearchPetsUseCaseRequest) {
    const orgs =
      this.usersRepository &&
      this.usersRepository.items.filter((item) => item.city === data.city);

    return this.items
      .filter((item) => orgs && orgs.some((org) => org.id === item.user_id))
      .filter((item) => (data.age ? item.age.includes(data.age) : true))
      .filter((item) => (data.size ? item.size.includes(data.size) : true))
      .filter((item) =>
        data.energy ? item.energy.includes(data.energy) : true,
      )
      .filter((item) =>
        data.independency
          ? item.independency.includes(data.independency)
          : true,
      )
      .filter((item) =>
        data.environment ? item.environment.includes(data.environment) : true,
      )
      .slice((data.page - 1) * 20, data.page * 20);
  }
}
