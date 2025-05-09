import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Receita {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  nome: string;

  @Column({ type: 'date', nullable: true }) // ← alterado aqui
  data: string;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  fonte: string;

  @Column('float')
  valor: number;
}
