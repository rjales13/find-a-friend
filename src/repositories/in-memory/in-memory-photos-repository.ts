import { PhotosRepository } from '@/repositories/photos-repository';
import { Photo, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryPhotosRepository implements PhotosRepository {
  public items: Photo[] = [];

  async findById(id: string) {
    const photo = this.items.find((item) => item.id === id);

    if (!photo) {
      return null;
    }

    return photo;
  }

  async create(data: Prisma.PhotoUncheckedCreateInput) {
    const photo = {
      id: randomUUID(),
      name: data.name,
      extension: data.extension,
      pet_id: data.pet_id,
      created_at: new Date(),
    };

    this.items.push(photo);

    return photo;
  }
}
