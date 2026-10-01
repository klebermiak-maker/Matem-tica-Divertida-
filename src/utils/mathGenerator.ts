import { DifficultyLevel, MathQuestion, Operation } from '../types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Fisher-Yates unbiased shuffle algorithm.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Generates 4 mathematically plausible, distinct distractors based on the scale of the answer.
 * Thoroughly shuffles the resulting options so the correct answer is equally likely in all positions.
 */
function generateOptions(answer: number, num1?: number, num2?: number, symbol?: string): number[] {
  const optionsSet = new Set<number>();
  optionsSet.add(answer);

  // Common pedagogical misconceptions (e.g. adding instead of subtracting or multiplying)
  if (num1 !== undefined && num2 !== undefined && symbol !== undefined) {
    if (symbol === '-' && num1 + num2 !== answer) {
      optionsSet.add(num1 + num2); // added instead of subtracted
    }
    if (symbol === '×' && num1 + num2 !== answer && num1 + num2 > 0) {
      optionsSet.add(num1 + num2); // added instead of multiplied
    }
    if (symbol === '÷' && num1 - num2 > 0 && num1 - num2 !== answer) {
      optionsSet.add(num1 - num2); // subtracted instead of divided
    }
  }

  // Scale-dependent candidate deltas
  let candidateDeltas: number[] = [];

  if (answer <= 25) {
    // Small values (Tabuadas baixas, somas simples, divisões)
    candidateDeltas = [-2, 2, -1, 1, -3, 3, -4, 4, -5, 5, 6, -6];
  } else if (answer <= 100) {
    // Dezenas
    candidateDeltas = [-10, 10, -1, 1, -2, 2, -5, 5, -20, 20, -3, 3];
  } else if (answer <= 1000) {
    // Centenas
    candidateDeltas = [-10, 10, -100, 100, -20, 20, -50, 50, -1, 1, -200, 200];
  } else {
    // Milhares (até 9.999)
    candidateDeltas = [-100, 100, -10, 10, -1000, 1000, -200, 200, -500, 500, -50, 50];
  }

  const shuffledDeltas = shuffleArray(candidateDeltas);

  for (const delta of shuffledDeltas) {
    const candidate = answer + delta;
    if (candidate > 0 && candidate !== answer) {
      optionsSet.add(candidate);
    }
    if (optionsSet.size === 4) break;
  }

  // Fallback to guarantee exactly 4 unique positive options
  let step = 1;
  while (optionsSet.size < 4) {
    const delta = step * (answer > 1000 ? 100 : answer > 100 ? 10 : 1);
    if (answer - delta > 0) optionsSet.add(answer - delta);
    if (optionsSet.size < 4) optionsSet.add(answer + delta);
    step++;
  }

  return shuffleArray(Array.from(optionsSet).slice(0, 4));
}

/**
 * Generates a single verified question according to BNCC 3º ano guidelines.
 */
export function generateQuestion(
  op: Operation,
  difficulty: DifficultyLevel,
  usedSignatures = new Set<string>()
): MathQuestion {
  const actualOp: 'addition' | 'subtraction' | 'multiplication' | 'division' =
    op === 'mixed'
      ? (['addition', 'subtraction', 'multiplication', 'division'] as const)[randomInt(0, 3)]
      : op;

  const id = `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // ADIÇÃO
  if (actualOp === 'addition') {
    if (difficulty === 1) {
      // Somas até 50 sem reagrupamento
      const u1 = randomInt(1, 5);
      const u2 = randomInt(1, 4); // u1 + u2 <= 9 (sem vai 1)
      const d1 = randomInt(0, 2);
      const d2 = randomInt(0, 2);
      const num1 = d1 * 10 + u1;
      const num2 = d2 * 10 + u2;
      const answer = num1 + num2;

      return {
        id,
        operation: 'addition',
        num1,
        num2,
        answer,
        symbol: '+',
        options: generateOptions(answer, num1, num2, '+'),
        promptText: `Quanto é ${num1} + ${num2}?`,
        hint: `Comece somando as unidades: ${u1} + ${u2} = ${u1 + u2}. Depois junte com as dezenas!`,
        explanation: `${num1} + ${num2} = ${answer}. Somando as unidades e dezenas, o total é ${answer}.`,
        visualGroup: answer <= 24 ? { itemsCount: answer, icon: '⭐' } : undefined,
      };
    } else if (difficulty === 2) {
      // Somas até 100 com reagrupamento simples (vai 1)
      const u1 = randomInt(5, 9);
      const u2 = randomInt(11 - u1, 9); // garante u1 + u2 >= 11 (com agrupamento)
      const d1 = randomInt(1, 4);
      const d2 = randomInt(1, 4);
      const num1 = d1 * 10 + u1;
      const num2 = d2 * 10 + u2;
      const answer = num1 + num2;

      return {
        id,
        operation: 'addition',
        num1,
        num2,
        answer,
        symbol: '+',
        options: generateOptions(answer, num1, num2, '+'),
        promptText: `Calcule: ${num1} + ${num2}`,
        hint: `As unidades somam ${(u1 + u2)}. Deixe a unidade e suba 1 dezena para a ordem seguinte ('vai 1')!`,
        explanation: `${num1} + ${num2} = ${answer}. Unidades: ${u1} + ${u2} = ${u1 + u2}. Reagrupando 1 dezena com as demais dezenas dá ${answer}!`,
      };
    } else if (difficulty === 3) {
      // Centenas e Milhar Inicial (até 2.000)
      const isThousands = Math.random() > 0.45;
      const num1 = isThousands ? randomInt(500, 1350) : randomInt(120, 480);
      const num2 = isThousands ? randomInt(250, 950) : randomInt(80, 450);
      const answer = num1 + num2;

      return {
        id,
        operation: 'addition',
        num1,
        num2,
        answer,
        symbol: '+',
        options: generateOptions(answer, num1, num2, '+'),
        promptText: `Calcule a soma: ${num1.toLocaleString('pt-BR')} + ${num2.toLocaleString('pt-BR')}`,
        hint: `Some da direita para a esquerda: unidades, dezenas, centenas e milhar. Não esqueça dos reagrupamentos!`,
        explanation: `${num1.toLocaleString('pt-BR')} + ${num2.toLocaleString('pt-BR')} = ${answer.toLocaleString('pt-BR')}. Excelente trabalho!`,
      };
    } else {
      // Unidade de Milhar (até 9.999) e Problemas Contextuais
      const isWordProblem = Math.random() > 0.4;
      if (isWordProblem) {
        const scenarios = [
          { place: 'A biblioteca central', item: 'livros infantis', extra: 'livros de aventura', n1: randomInt(1200, 3600), n2: randomInt(900, 2800) },
          { place: 'Uma fábrica de brinquedos', item: 'carrinhos montados', extra: 'carrinhos no turno da tarde', n1: randomInt(1500, 4500), n2: randomInt(1100, 3400) },
          { place: 'Uma gincana solidária', item: 'pontos na etapa amarela', extra: 'pontos na etapa verde', n1: randomInt(2200, 4800), n2: randomInt(1300, 3700) },
          { place: 'Um parque ecológico', item: 'visitantes no sábado', extra: 'visitantes no domingo', n1: randomInt(2400, 5100), n2: randomInt(1200, 3800) },
        ];
        const scn = scenarios[randomInt(0, scenarios.length - 1)];
        const answer = scn.n1 + scn.n2;

        return {
          id,
          operation: 'addition',
          num1: scn.n1,
          num2: scn.n2,
          answer,
          symbol: '+',
          isWordProblem: true,
          options: generateOptions(answer, scn.n1, scn.n2, '+'),
          promptText: `${scn.place} registrou ${scn.n1.toLocaleString('pt-BR')} ${scn.item} e recebeu mais ${scn.n2.toLocaleString('pt-BR')} ${scn.extra}. Qual é o total na unidade de milhar?`,
          hint: `Junte as duas quantidades: ${scn.n1.toLocaleString('pt-BR')} + ${scn.n2.toLocaleString('pt-BR')}.`,
          explanation: `${scn.n1.toLocaleString('pt-BR')} + ${scn.n2.toLocaleString('pt-BR')} = ${answer.toLocaleString('pt-BR')}. Perfeito domínio da Unidade de Milhar!`,
        };
      } else {
        const num1 = randomInt(1400, 5200);
        const num2 = randomInt(1100, 4500);
        const answer = num1 + num2;

        return {
          id,
          operation: 'addition',
          num1,
          num2,
          answer,
          symbol: '+',
          options: generateOptions(answer, num1, num2, '+'),
          promptText: `Desafio dos Milhares: Quanto é ${num1.toLocaleString('pt-BR')} + ${num2.toLocaleString('pt-BR')}?`,
          hint: `Arme o cálculo alinhando unidades, dezenas, centenas e milhares!`,
          explanation: `${num1.toLocaleString('pt-BR')} + ${num2.toLocaleString('pt-BR')} = ${answer.toLocaleString('pt-BR')}.`,
        };
      }
    }
  }

  // SUBTRAÇÃO
  if (actualOp === 'subtraction') {
    if (difficulty === 1) {
      // Subtrações simples até 50 sem recurso
      const u2 = randomInt(1, 4);
      const u1 = randomInt(u2, 8); // u1 >= u2 (sem recurso)
      const d2 = randomInt(0, 2);
      const d1 = randomInt(d2 + 1, 4);
      const num1 = d1 * 10 + u1;
      const num2 = d2 * 10 + u2;
      const answer = num1 - num2;

      return {
        id,
        operation: 'subtraction',
        num1,
        num2,
        answer,
        symbol: '-',
        options: generateOptions(answer, num1, num2, '-'),
        promptText: `Quanto é ${num1} - ${num2}?`,
        hint: `Comece tirando as unidades: ${u1} - ${u2} = ${u1 - u2}. Depois subtraia as dezenas!`,
        explanation: `${num1} - ${num2} = ${answer}. Subtração direta sem necessidade de empréstimo.`,
        visualGroup: answer <= 20 ? { itemsCount: answer, icon: '🍎' } : undefined,
      };
    } else if (difficulty === 2) {
      // Subtrações até 100 com empréstimo da dezena
      const u1 = randomInt(1, 5);
      const u2 = randomInt(u1 + 2, 9); // u1 < u2 (obriga empréstimo)
      const d2 = randomInt(1, 3);
      const d1 = randomInt(d2 + 1, 6);
      const num1 = d1 * 10 + u1;
      const num2 = d2 * 10 + u2;
      const answer = num1 - num2;

      return {
        id,
        operation: 'subtraction',
        num1,
        num2,
        answer,
        symbol: '-',
        options: generateOptions(answer, num1, num2, '-'),
        promptText: `Resolva a subtração: ${num1} - ${num2}`,
        hint: `Como ${u1} é menor que ${u2}, pegue 1 dezena emprestada! O ${u1} vira ${u1 + 10}.`,
        explanation: `${num1} - ${num2} = ${answer}. Emprestando 1 dezena para a unidade, calculamos ${u1 + 10} - ${u2} = ${u1 + 10 - u2}, resultando em ${answer}!`,
      };
    } else if (difficulty === 3) {
      // Centenas e Milhar Inicial (até 2.000)
      const isThousands = Math.random() > 0.45;
      const num2 = isThousands ? randomInt(250, 850) : randomInt(45, 180);
      const num1 = num2 + (isThousands ? randomInt(400, 1150) : randomInt(60, 250));
      const answer = num1 - num2;

      return {
        id,
        operation: 'subtraction',
        num1,
        num2,
        answer,
        symbol: '-',
        options: generateOptions(answer, num1, num2, '-'),
        promptText: `Efetue a subtração: ${num1.toLocaleString('pt-BR')} - ${num2.toLocaleString('pt-BR')}`,
        hint: `Subtraia por ordens (unidades, dezenas, centenas e milhar). Se faltar, empreste da ordem vizinha!`,
        explanation: `${num1.toLocaleString('pt-BR')} - ${num2.toLocaleString('pt-BR')} = ${answer.toLocaleString('pt-BR')}. Muito bem!`,
      };
    } else {
      // Unidade de Milhar (até 9.999) e Problemas Contextuais
      const isWordProblem = Math.random() > 0.4;
      if (isWordProblem) {
        const scenarios = [
          { place: 'Um teatro municipal', item: 'poltronas disponíveis', sold: 'ingressos já reservados', n2: randomInt(1100, 2600), delta: randomInt(1300, 3100) },
          { place: 'Um depósito de grãos', item: 'sacas de feijão no armazém', sold: 'sacas já entregues aos feirantes', n2: randomInt(1300, 2900), delta: randomInt(1400, 3500) },
          { place: 'Uma papelaria escolar', item: 'cadernos para o início das aulas', sold: 'cadernos já vendidos', n2: randomInt(1200, 3100), delta: randomInt(1500, 3600) },
        ];
        const scn = scenarios[randomInt(0, scenarios.length - 1)];
        const num1 = scn.n2 + scn.delta;
        const num2 = scn.n2;
        const answer = num1 - num2;

        return {
          id,
          operation: 'subtraction',
          num1,
          num2,
          answer,
          symbol: '-',
          isWordProblem: true,
          options: generateOptions(answer, num1, num2, '-'),
          promptText: `${scn.place} contava com ${num1.toLocaleString('pt-BR')} ${scn.item}. Após ${num2.toLocaleString('pt-BR')} ${scn.sold}, quantos ainda restam?`,
          hint: `Faça a subtração para achar o restante: ${num1.toLocaleString('pt-BR')} - ${num2.toLocaleString('pt-BR')}.`,
          explanation: `${num1.toLocaleString('pt-BR')} - ${num2.toLocaleString('pt-BR')} = ${answer.toLocaleString('pt-BR')}. Restam exatamente ${answer.toLocaleString('pt-BR')}!`,
        };
      } else {
        const num2 = randomInt(1200, 4200);
        const num1 = num2 + randomInt(1200, 4600);
        const answer = num1 - num2;

        return {
          id,
          operation: 'subtraction',
          num1,
          num2,
          answer,
          symbol: '-',
          options: generateOptions(answer, num1, num2, '-'),
          promptText: `Desafio dos Milhares: Quanto é ${num1.toLocaleString('pt-BR')} - ${num2.toLocaleString('pt-BR')}?`,
          hint: `Arme o cálculo e resolva ordem por ordem com atenção aos empréstimos!`,
          explanation: `${num1.toLocaleString('pt-BR')} - ${num2.toLocaleString('pt-BR')} = ${answer.toLocaleString('pt-BR')}. Excelente raciocínio!`,
        };
      }
    }
  }

  // MULTIPLICAÇÃO
  if (actualOp === 'multiplication') {
    if (difficulty === 1) {
      // Tabuadas do 2, 5 e 10
      const tables = [2, 5, 10];
      const num1 = tables[randomInt(0, tables.length - 1)];
      const num2 = randomInt(2, 9);
      const answer = num1 * num2;

      return {
        id,
        operation: 'multiplication',
        num1,
        num2,
        answer,
        symbol: '×',
        options: generateOptions(answer, num1, num2, '×'),
        promptText: `Quanto é ${num1} × ${num2}?`,
        hint: `Multiplicar por ${num1} é o mesmo que somar o número ${num2}, ${num1} vezes!`,
        explanation: `${num1} × ${num2} = ${answer}. Tabuada do ${num1} conquistada!`,
        visualGroup: answer <= 25 ? { itemsCount: answer, groupsCount: num2, icon: '🌟' } : undefined,
      };
    } else if (difficulty === 2) {
      // Tabuadas do 3 e 4
      const tables = [3, 4];
      const num1 = tables[randomInt(0, tables.length - 1)];
      const num2 = randomInt(3, 9);
      const answer = num1 * num2;

      return {
        id,
        operation: 'multiplication',
        num1,
        num2,
        answer,
        symbol: '×',
        options: generateOptions(answer, num1, num2, '×'),
        promptText: `Calcule o produto: ${num1} × ${num2}`,
        hint: `Pense em ${num1} grupos com ${num2} elementos em cada um.`,
        explanation: `${num1} × ${num2} = ${answer}. Parabéns!`,
        visualGroup: answer <= 28 ? { itemsCount: answer, groupsCount: num2, icon: '🚀' } : undefined,
      };
    } else if (difficulty === 3) {
      // Tabuadas do 6, 7, 8 e 9
      const tables = [6, 7, 8, 9];
      const num1 = tables[randomInt(0, tables.length - 1)];
      const num2 = randomInt(3, 9);
      const answer = num1 * num2;

      return {
        id,
        operation: 'multiplication',
        num1,
        num2,
        answer,
        symbol: '×',
        options: generateOptions(answer, num1, num2, '×'),
        promptText: `Desafio da tabuada: ${num1} × ${num2}`,
        hint: `Dica esperta: ${num1} × 5 = ${num1 * 5}. A partir daí fica fácil somar os restantes!`,
        explanation: `${num1} × ${num2} = ${answer}. Craque da tabuada!`,
      };
    } else {
      // Problemas contextuais de multiplicação do 3º ano
      const packs = ['caixas de lápis', 'pacotes de figurinhas', 'bandejas de maçãs', 'estojos de canetas'];
      const pack = packs[randomInt(0, packs.length - 1)];
      const num1 = randomInt(4, 9); // itens por pacote
      const num2 = randomInt(3, 7); // quantidade de pacotes
      const answer = num1 * num2;

      return {
        id,
        operation: 'multiplication',
        num1,
        num2,
        answer,
        symbol: '×',
        isWordProblem: true,
        options: generateOptions(answer, num1, num2, '×'),
        promptText: `Em uma loja, cada uma das ${num2} ${pack} contém ${num1} itens. Quantos itens há ao todo?`,
        hint: `Temos ${num2} grupos iguais com ${num1} itens cada. Multiplique ${num2} × ${num1}!`,
        explanation: `${num2} grupos de ${num1} = ${num2} × ${num1} = ${answer} itens no total.`,
      };
    }
  }

  // DIVISÃO (Sempre exata, sem resto)
  if (difficulty === 1) {
    // Divisões simples por 2, 5 e 10
    const divisors = [2, 5, 10];
    const num2 = divisors[randomInt(0, divisors.length - 1)];
    const answer = randomInt(2, 9);
    const num1 = answer * num2;

    return {
      id,
      operation: 'division',
      num1,
      num2,
      answer,
      symbol: '÷',
      options: generateOptions(answer, num1, num2, '÷'),
      promptText: `Quanto é ${num1} ÷ ${num2}?`,
      hint: `Qual número multiplicado por ${num2} resulta em ${num1}?`,
      explanation: `${num1} ÷ ${num2} = ${answer}, pois ${answer} × ${num2} = ${num1}.`,
      visualGroup: num1 <= 24 ? { itemsCount: num1, groupsCount: num2, icon: '⚽' } : undefined,
    };
  } else if (difficulty === 2) {
    // Divisões exatas por 3 e 4
    const divisors = [3, 4];
    const num2 = divisors[randomInt(0, divisors.length - 1)];
    const answer = randomInt(3, 9);
    const num1 = answer * num2;

    return {
      id,
      operation: 'division',
      num1,
      num2,
      answer,
      symbol: '÷',
      options: generateOptions(answer, num1, num2, '÷'),
      promptText: `Divida: ${num1} ÷ ${num2}`,
      hint: `Reparta ${num1} em ${num2} partes iguais. Pense na tabuada do ${num2}!`,
      explanation: `${num1} ÷ ${num2} = ${answer}. Repartição exata sem sobras!`,
      visualGroup: num1 <= 24 ? { itemsCount: num1, groupsCount: num2, icon: '🎈' } : undefined,
    };
  } else if (difficulty === 3) {
    // Divisões exatas por 6, 7, 8 e 9
    const divisors = [6, 7, 8, 9];
    const num2 = divisors[randomInt(0, divisors.length - 1)];
    const answer = randomInt(3, 9);
    const num1 = answer * num2;

    return {
      id,
      operation: 'division',
      num1,
      num2,
      answer,
      symbol: '÷',
      options: generateOptions(answer, num1, num2, '÷'),
      promptText: `Desafio da divisão: ${num1} ÷ ${num2}`,
      hint: `Lembre da tabuada do ${num2}: ${num2} × ? = ${num1}.`,
      explanation: `${num1} ÷ ${num2} = ${answer}, porque ${num2} × ${answer} = ${num1}!`,
    };
  } else {
    // Problemas práticos de partilha do 3º ano
    const things = ['balas de frutas', 'figurinhas colecionáveis', 'bolinhas de gude', 'adesivos brilhantes'];
    const item = things[randomInt(0, things.length - 1)];
    const kids = randomInt(3, 6);
    const answer = randomInt(4, 9);
    const total = kids * answer;

    return {
      id,
      operation: 'division',
      num1: total,
      num2: kids,
      answer,
      symbol: '÷',
      isWordProblem: true,
      options: generateOptions(answer, total, kids, '÷'),
      promptText: `Uma professora comprou ${total} ${item} para distribuir igualmente entre ${kids} alunos. Quantos ${item} cada aluno recebeu?`,
      hint: `Dividir igualmente significa fazer a conta: ${total} ÷ ${kids}.`,
      explanation: `${total} ÷ ${kids} = ${answer}. Cada aluno recebeu ${answer} ${item}!`,
    };
  }
}

/**
 * Generates an entire pre-shuffled pool of non-repeating questions for a round.
 * Guarantees balanced operations in mixed mode and varied challenge styles.
 */
export function generateQuestionPool(
  op: Operation,
  difficulty: DifficultyLevel,
  count: number
): MathQuestion[] {
  const pool: MathQuestion[] = [];
  const signatures = new Set<string>();

  if (op === 'mixed') {
    const ops: Operation[] = ['addition', 'subtraction', 'multiplication', 'division'];
    for (let i = 0; i < count; i++) {
      const currentOp = ops[i % ops.length];
      let q = generateQuestion(currentOp, difficulty, signatures);
      let attempts = 0;
      while (signatures.has(`${q.operation}_${q.num1}_${q.num2}`) && attempts < 10) {
        q = generateQuestion(currentOp, difficulty, signatures);
        attempts++;
      }
      signatures.add(`${q.operation}_${q.num1}_${q.num2}`);
      pool.push(q);
    }
  } else {
    for (let i = 0; i < count; i++) {
      let q = generateQuestion(op, difficulty, signatures);
      let attempts = 0;
      while (signatures.has(`${q.operation}_${q.num1}_${q.num2}`) && attempts < 10) {
        q = generateQuestion(op, difficulty, signatures);
        attempts++;
      }
      signatures.add(`${q.operation}_${q.num1}_${q.num2}`);
      pool.push(q);
    }
  }

  // Thoroughly shuffle the order of questions in the pool
  return shuffleArray(pool);
}
