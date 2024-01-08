import { PartialType } from '@nestjs/mapped-types';
import { UsuarioPost } from './usuario.post';

export class UsuarioPut extends PartialType(UsuarioPost) {}
