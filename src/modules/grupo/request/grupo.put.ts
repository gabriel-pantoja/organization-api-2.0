import { PartialType } from '@nestjs/swagger';
import { GrupoPost } from './grupo.post';

export class GrupoPut extends PartialType(GrupoPost) {}
