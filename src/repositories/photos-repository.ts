import { Prisma, Photo } from '@prisma/client';

export interface PhotosRepository {
  findById(id: string): Promise<Photo | null>;
  create(data: Prisma.PhotoUncheckedCreateInput): Promise<Photo>;
}
