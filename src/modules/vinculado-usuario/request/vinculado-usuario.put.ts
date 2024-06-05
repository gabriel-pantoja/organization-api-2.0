import { PartialType } from '@nestjs/mapped-types';
import { VinculadoUsuarioPost } from './vinculado-usuario.post';

export class VinculadoUsuarioPut extends PartialType(VinculadoUsuarioPost) {}
