import { SetMetadata } from '@nestjs/common';
import { ETipoPerfil } from '../enums/perfil.enum';

export const PROFILES_KEY = 'profiles';
export const Profiles = (...profiles: ETipoPerfil[]) =>
  SetMetadata(PROFILES_KEY, profiles);
