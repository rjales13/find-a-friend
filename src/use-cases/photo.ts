import { PhotosRepository } from '@/repositories/photos-repository';
import { Photo } from '@prisma/client';

interface PhotoUseCaseRequest {
  name: string;
  extension: string;
  petId: string;
}

interface PhotoUseCaseResponse {
  photo: Photo;
}

export class PhotoUseCase {
  constructor(private photosRepository: PhotosRepository) {}

  async execute({
    name,
    extension,
    petId,
  }: PhotoUseCaseRequest): Promise<PhotoUseCaseResponse> {
    const photo = await this.photosRepository.create({
      name,
      extension,
      pet_id: petId,
    });

    return {
      photo,
    };
  }
}
