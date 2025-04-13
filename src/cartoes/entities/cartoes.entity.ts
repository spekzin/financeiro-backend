import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cartao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 15 })
  bandeira: string;

  @Column({ length: 10 })
  titular: string;

  @Column({ length: 2 })
  vencimento: string;

  @Column({ length: 2 })
  melhorDia: string;

  @Column({ length: 30 })
  instituicao: string;
}
