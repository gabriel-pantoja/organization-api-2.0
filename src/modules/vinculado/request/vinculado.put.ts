import { PartialType } from '@nestjs/mapped-types';
import { VinculadoPost } from './vinculado.post';

export class VinculadoPut extends PartialType(VinculadoPost) {}
