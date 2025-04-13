import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parcelamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data: string;

  @Column({ length: 60 })
  descricao: string;

  @Column()
  cartao: string;

  @Column()
  parcelas: number;

  @Column('float')
  valorParcela: number;

  @Column('float')
  valorTotal: number;

  @Column()
  inicio: string; // formato MM/AA

  @Column()
  fim: string; // formato MM/AA
}
