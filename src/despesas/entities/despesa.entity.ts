// despesas.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('despesas')
export class Despesa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60 })
  descricao: string;

  @Column({ type: 'varchar' })
  tipo: 'fixa' | 'temporaria';

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valor: number;

  @Column({ nullable: true })
  categoria: string;

  @Column({ nullable: true })
  tipoTemporaria: string;

  @Column({ type: 'int', nullable: true })
  parcelas: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valorParcela: number;

  @Column({ nullable: true })
  cartao: string;

  @Column({ nullable: true })
  mesAnoInicio: string;

  @Column({ nullable: true })
  mesAnoFim: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
