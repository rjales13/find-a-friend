import { PhotosRepository } from '@/repositories/photos-repository';
import { Photo } from '@prisma/client';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetPhotoDetailsUseCaseRequest {
  photoId: string;
}

interface GetPhotoDetailsUseCaseResponse {
  photo: Photo;
}

export class GetPhotoDetailsUseCase {
  constructor(private photosRepository: PhotosRepository) {}

  async execute({
    photoId,
  }: GetPhotoDetailsUseCaseRequest): Promise<GetPhotoDetailsUseCaseResponse> {
    const photo = await this.photosRepository.findById(photoId);

    if (!photo) {
      throw new ResourceNotFoundError();
    }

    return {
      photo,
    };
  }
}
