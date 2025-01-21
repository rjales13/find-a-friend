import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { PetsRepository, SearchPetsUseCaseRequest } from '../pets-repository';

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }

  async searchMany(data: SearchPetsUseCaseRequest) {
    const pets = await prisma.pet.findMany({
      where: {
        user: {
          city: {
            contains: data.city,
          },
        },
        ...(data.age && {
          age: {
            equals: data.age,
          },
        }),
        ...(data.size && {
          size: {
            equals: data.size,
          },
        }),
        ...(data.energy && {
          energy: {
            equals: data.energy,
          },
        }),
        ...(data.independency && {
          independency: {
            equals: data.independency,
          },
        }),
        ...(data.environment && {
          environment: {
            equals: data.environment,
          },
        }),
      },
      take: 20,
      skip: (data.page - 1) * 20,
    });

    return pets;
  }
}
