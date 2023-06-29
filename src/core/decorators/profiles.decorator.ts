import { SetMetadata } from '@nestjs/common';
import { ProfileNameEnum } from '../enums/profile.enum';

export const PROFILES_KEY = 'profiles';
export const Profiles = (...profiles: ProfileNameEnum[]) =>
  SetMetadata(PROFILES_KEY, profiles);
