import { PartialType } from '@nestjs/swagger';
import { VinculoAmigoPost } from './vinculo-amigo.post';

export class VinculoAmigoPut extends PartialType(VinculoAmigoPost) {}
