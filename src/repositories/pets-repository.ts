import { Prisma, Pet } from '@prisma/client';

export interface SearchPetsUseCaseRequest {
  city: string;
  age?: 'Filhote' | 'Adulto' | 'Idoso';
  size?: 'Pequenino' | 'Médio' | 'Grande';
  energy?: 'Baixa' | 'Média' | 'Alta';
  independency?: 'Baixo' | 'Médio' | 'Alto';
  environment?: 'Amplo' | 'Pequeno' | 'Médio' | 'Externo' | 'Interno';
  page: number;
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchMany(data: SearchPetsUseCaseRequest): Promise<Pet[]>;
}
