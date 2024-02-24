import { PartialType } from '@nestjs/swagger';
import { CompraPost } from './compra.post';

export class CompraPut extends PartialType(CompraPost) {}
