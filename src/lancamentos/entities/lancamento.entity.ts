import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lancamentos')
export class Lancamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  data: string;

  @Column({ length: 60 })
  descricao: string;

  @Column({ type: 'text' })
  cartao: string;

  @Column({ type: 'real' })
  valor: number;
}
