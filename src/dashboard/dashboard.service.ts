import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receita } from 'src/receitas/entities/receita.entity';
import { Despesa } from 'src/despesas/entities/despesa.entity';
import { Parcelamento } from 'src/parcelamentos/entities/parcelamento.entity';
import { Lancamento } from 'src/lancamentos/entities/lancamento.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Receita) private receitaRepo: Repository<Receita>,
    @InjectRepository(Despesa) private despesaRepo: Repository<Despesa>,
    @InjectRepository(Parcelamento)
    private parcelamentoRepo: Repository<Parcelamento>,
    @InjectRepository(Lancamento)
    private lancamentoRepo: Repository<Lancamento>,
  ) {}

  private isParcelaDoMes(item: { inicio?: string; fim?: string }): boolean {
    if (!item?.inicio || !item?.fim) return false;

    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const anoAtual = hoje.getFullYear();

    const parse = (str: string): Date => {
      const [mm, aa] = str.split('/');
      const ano = Number(aa.length === 2 ? '20' + aa : aa);
      const mes = Number(mm);
      return new Date(ano, mes - 1);
    };

    const inicio = parse(item.inicio);
    const fim = parse(item.fim);
    const referencia = new Date(anoAtual, mesAtual - 1);

    return referencia >= inicio && referencia <= fim;
  }

  async getDashboardData() {
    const [receitas, despesas, parcelamentos, lancamentos] = await Promise.all([
      this.receitaRepo.find(),
      this.despesaRepo.find(),
      this.parcelamentoRepo.find(),
      this.lancamentoRepo.find(),
    ]);

    const toNumber = (v: any): number => {
      if (typeof v === 'string') {
        return Number(v.replace(/[^\d,-]/g, '').replace(',', '.')) || 0;
      }
      return Number(v) || 0;
    };

    console.log('🚀 Parcelamentos encontrados:', parcelamentos);

    const parcelamentosDoMes = parcelamentos.filter((p) => {
      const resultado = this.isParcelaDoMes(p);

      return resultado;
    });

    console.log('✅ Parcelamentos válidos para este mês:', parcelamentosDoMes);

    const totalReceitas = receitas.reduce(
      (acc, r) => acc + toNumber(r.valor),
      0,
    );
    const totalFixas = despesas
      .filter((d) => d.tipo === 'fixa')
      .reduce((acc, d) => acc + toNumber(d.valor), 0);

    const totalTemporarias = despesas
      .filter(
        (d) =>
          d.tipo === 'temporaria' &&
          this.isParcelaDoMes({
            inicio: d.mesAnoInicio,
            fim: d.mesAnoFim,
          }),
      )

      .reduce((acc, d) => acc + toNumber(d.valorParcela), 0);

    const totalParcelamentos = parcelamentosDoMes.reduce(
      (acc, p) => acc + toNumber(p.valorParcela),
      0,
    );

    const totalLancamentos = lancamentos.reduce(
      (acc, l) => acc + toNumber(l.valor),
      0,
    );

    const totalDespesasGerais =
      totalFixas + totalTemporarias + totalParcelamentos + totalLancamentos;
    const saldoMensal = totalReceitas - totalDespesasGerais;



    const ultimosLancamentos = [...despesas, ...parcelamentos, ...lancamentos]
      .map((e: any) => {
        const novo = { ...e };

        novo.valor = toNumber(e.valor ?? e.valorParcela);

        // Adicionar data fake se não houver
        if (!novo.data) {
          if (novo.mesAnoInicio) {
            // converte 05/25 em uma data (primeiro dia do mês)
            const [mm, aa] = novo.mesAnoInicio.split('/');
            const ano = Number(aa.length === 2 ? '20' + aa : aa);
            const mes = Number(mm);
            novo.data = new Date(ano, mes - 1, 1);
          } else {
            novo.data = new Date(); // fallback
          }
        }

        return novo;
      })
      .filter((e) => !!e.data)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
      .slice(0, 5);

    return {
      totalReceitas,
      totalFixas,
      totalTemporarias,
      totalParcelamentos,
      totalLancamentos,
      saldoMensal,
      ultimosLancamentos,
    };
  }
}
