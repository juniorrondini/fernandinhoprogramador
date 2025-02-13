"use client";
import React, { useState } from 'react';

// Gerador pseudo-aleatório com semente fixa (linear congruential generator)
let seed = 12345;
function seededRandom() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}
function getRandomInt(min: number, max: number) {
  return Math.floor(seededRandom() * (max - min + 1)) + min;
}

type Rooster = {
  id: number;
  name: string;
  rating: number;
  hp: number;
  specialAttack: string;
};

// Arrays com nomes de galos para cada time
const teamANames = [
  'Capitão Bico', 'General Peninha', 'Coronel Cocoricó', 'Sargento Piufrio', 'João Galão',
  'Carlos Bicudo', 'Pedro Penas', 'Ricardo Riscado', 'André do Bico', 'Marcos Maluco',
  'Bruno Berrante', 'Miguel Frangão', 'Felipe do Frango', 'Fernando Foguinho', 'Gustavo Grão',
  'Lucas Lero', 'Eduardo Estrondo', 'Victor Voador', 'Henrique Humor', 'Samuel Sorriso',
  'Roberto Risonho', 'Leandro Ligeiro', 'Fábio Fanfarrão', 'Diego Destro', 'Rafael Riso',
  'Sérgio Sônico', 'Renato Rabugento', 'Rodrigo Rabeca', 'Daniel Dourado', 'Thiago Treme',
  'Vitor Veloz', 'Anderson Animado', 'Alex Alegre', 'Julio Jactancioso', 'Caio Cômico',
  'Ramon Risonho', 'Otávio Ousado', 'Marcio Maroto', 'Elias Enrolado', 'Igor Incrível'
];

const teamBNames = [
  'Luiz do Bico', 'Victor Frango', 'Pedro do Galo', 'Zé do Frango', 'Cyber Galo',
  'Neon Bico', 'Robo Asas', 'Hiper Plumagem', 'Laser Bicudo', 'Alpha Galótico',
  'Beta Penacho', 'Omega Asas', 'Quantum Galo', 'Futuro Alado', 'X-Treme Penas',
  'Ultra Galonegro', 'Cybernetic Espora', 'Digital Plumagem', 'Neon Asas', 'Robo Peninha',
  'Interstelar Galo', 'Futuro Bicudo', 'Zé do Galo', 'Xenon Galo', 'Solar Bicudo',
  'Lunar Penas', 'Pixel Galo', 'Nano Asas', 'Fusion Bicudo', 'Robo-X Penas',
  'Xenon Penas', 'Digital Asas', 'Futura Galonegro', 'Techno Bicudo', 'Cosmo Galo',
  'Vortex Asas', 'Omega Pulse', 'Plasma Penas', 'Neon Cyborg', 'Hyper Flux'
];

// Arrays de ataques especiais para cada time (10 variações cada)
const teamASpecialAttacks = [
  "Bico Explosivo", "Pena Voadora", "Frangão Turbo", "Chute do Galinheiro",
  "Rugido do Frango", "Bicada Surpresa", "Rabada Relâmpago", "Pena de Ouro",
  "Golpe do Porco", "Frango Nuclear"
];
const teamBSpecialAttacks = [
  "Laser de Neon", "Pulso Cibernético", "Explosão Digital", "Ataque de Plasma",
  "Soco Galáctico", "Impacto Cósmico", "Bicada Futurista", "Tiro Quântico",
  "Raio X Digital", "Golpe de Bytes"
];

// Cria os arrays de galos para cada time (40 cada)
const teamA: Rooster[] = teamANames.map((name, index) => ({
  id: index + 1,
  name,
  rating: getRandomInt(75, 95),
  hp: getRandomInt(90, 120),
  specialAttack: teamASpecialAttacks[getRandomInt(0, teamASpecialAttacks.length - 1)]
}));

const teamB: Rooster[] = teamBNames.map((name, index) => ({
  id: index + 41,
  name,
  rating: getRandomInt(75, 95),
  hp: getRandomInt(90, 120),
  specialAttack: teamBSpecialAttacks[getRandomInt(0, teamBSpecialAttacks.length - 1)]
}));

// Função para exibir mensagens especiais (golpe fatal)
const specialAttackMessages = (playerName: string, special: string, oppName: string) => [
  `💥 Inacreditável! ${playerName} usa ${special} e aniquila ${oppName}!`,
  `⚡ ${playerName} ativa ${special} e detona tudo!`,
  `🔥 Golpe fatal: ${playerName} lança ${special} e garante a vitória!`,
  `🚀 Surpresa cósmica! ${playerName} dispara ${special} e vence com louvor!`,
  `🤩 Espetacular! ${playerName} libera ${special} e derruba ${oppName}!`,
  `💫 Milagre de batalha! ${playerName} usa ${special} e conquista a vitória!`,
  `🥇 ${playerName} surpreende a todos com ${special}, um golpe decisivo!`,
  `🎉 ${playerName} explode com ${special} e transforma a luta!`,
  `🌟 Golpe de mestre! ${playerName} ativa ${special} e arrasa ${oppName}!`,
  `🚨 ${playerName} libera ${special} e sela a vitória!`
];

const Rinha: React.FC = () => {
  const [roosterA, setRoosterA] = useState<Rooster | null>(null);
  const [roosterB, setRoosterB] = useState<Rooster | null>(null);
  const [selectedBet, setSelectedBet] = useState<'A' | 'B' | null>(null);
  // Estado para o valor cru digitado e para o valor formatado
  const [rawBet, setRawBet] = useState<string>('');
  const [betAmount, setBetAmount] = useState<string>('');
  const [result, setResult] = useState<{ outcome: 'Vitória' | 'Derrota'; amount: number } | null>(null);
  const [fightNarrative, setFightNarrative] = useState<string>('');
  const [isFighting, setIsFighting] = useState<boolean>(false);

  // HP atual dos galos
  const [currentHpA, setCurrentHpA] = useState<number>(0);
  const [currentHpB, setCurrentHpB] = useState<number>(0);

  // Seleciona os galos e define seus HP
  const handleRoosterASelect = (r: Rooster) => {
    if (isFighting) return;
    setResult(null);
    setFightNarrative('');
    setRoosterA(r);
    setCurrentHpA(r.hp);
  };

  const handleRoosterBSelect = (r: Rooster) => {
    if (isFighting) return;
    setResult(null);
    setFightNarrative('');
    setRoosterB(r);
    setCurrentHpB(r.hp);
  };

  const handleRadioChange = (bet: 'A' | 'B') => {
    if (isFighting) return;
    setResult(null);
    setFightNarrative('');
    setSelectedBet(bet);
  };

  // Atualiza o valor cru digitado e exibe sem formatação enquanto digita
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setRawBet(newValue);
    setBetAmount(newValue);
  };

  // Ao perder o foco, formata o valor para o padrão BRL com duas casas decimais
  const handleBetBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let input = rawBet;
    input = input.replace(/[^\d.,]/g, '');
    input = input.replace(/\./g, '');
    input = input.replace(',', '.');
    const numeric = parseFloat(input) || 0;
    const formatted = numeric.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    setBetAmount(formatted);
    setRawBet(formatted);
  };

  // Função recursiva que simula cada turno do combate
  const runTurn = (
    turn: number,
    hpA: number,
    hpB: number,
    messages: string[],
    callback: () => void
  ) => {
    // Se algum galo já estiver com 0 ou menos HP, finaliza a luta
    if (hpA <= 0 || hpB <= 0) {
      callback();
      return;
    }

    // Calcula a probabilidade de A atacar (baseada no rating)
    const baseProbA = roosterA!.rating / (roosterA!.rating + roosterB!.rating);
    const roll = Math.random();
    const attacker = roll < baseProbA ? 'A' : 'B';

    // Verifica golpe especial com 35% de chance
    const specialRoll = Math.random();
    if (specialRoll < 0.35) {
      // Golpe especial finaliza o oponente imediatamente
      const turnMessage = attacker === 'A'
        ? `🔥 ${roosterA!.name} usa ${roosterA!.specialAttack} e FINALIZA ${roosterB!.name} em um golpe fatal!`
        : `⚡ ${roosterB!.name} usa ${roosterB!.specialAttack} e FINALIZA ${roosterA!.name} em um golpe fatal!`;
      messages.push(turnMessage);
      if (attacker === 'A') {
        hpB = 0;
      } else {
        hpA = 0;
      }
      setCurrentHpA(hpA < 0 ? 0 : hpA);
      setCurrentHpB(hpB < 0 ? 0 : hpB);
      setFightNarrative(turnMessage);
      // Aguarda 3 segundos e finaliza a luta
      setTimeout(() => callback(), 3000);
      return;
    }

    // Ataque normal
    let dmg = getRandomInt(8, 12);
    const turnMessage = attacker === 'A'
      ? `💥 ${roosterA!.name} ataca e causa ${dmg} de dano!`
      : `💥 ${roosterB!.name} ataca e causa ${dmg} de dano!`;
    messages.push(turnMessage);

    if (attacker === 'A') {
      hpB = hpB - dmg;
    } else {
      hpA = hpA - dmg;
    }

    setCurrentHpA(hpA < 0 ? 0 : hpA);
    setCurrentHpB(hpB < 0 ? 0 : hpB);
    setFightNarrative(turnMessage);

    // Aguarda 3 segundos para o próximo turno
    setTimeout(() => {
      if (hpA > 0 && hpB > 0) {
        runTurn(turn + 1, hpA, hpB, messages, callback);
      } else {
        callback();
      }
    }, 3000);
  };

  const simulateFight = () => {
    // Processa o valor de aposta
    let numericBetString = betAmount.replace(/[^\d.,]/g, '');
    numericBetString = numericBetString.replace(/\./g, '');
    numericBetString = numericBetString.replace(',', '.');
    const numericBet = parseFloat(numericBetString) || 0;

    if (!roosterA || !roosterB || !selectedBet || numericBet <= 0) {
      alert('Selecione dois galos, escolha em qual apostar e informe um valor válido.');
      return;
    }
    if (isFighting) return;

    // Reseta os HP para o início da luta
    setCurrentHpA(roosterA.hp);
    setCurrentHpB(roosterB.hp);
    setResult(null);
    setFightNarrative('');
    setIsFighting(true);

    const messages: string[] = [];

    // Inicia a simulação dos turnos até que um galo fique com HP <= 0
    runTurn(1, roosterA.hp, roosterB.hp, messages, () => {
      // Determina o vencedor com base no HP restante
      let winner: 'A' | 'B';
      if (currentHpA <= 0 && currentHpB > 0) {
        winner = 'B';
      } else if (currentHpB <= 0 && currentHpA > 0) {
        winner = 'A';
      } else {
        winner = currentHpA >= currentHpB ? 'A' : 'B';
      }

      // Calcula o resultado da aposta usando os ratings iniciais
      const baseProb = selectedBet === 'A'
        ? roosterA.rating / (roosterA.rating + roosterB.rating)
        : roosterB.rating / (roosterA.rating + roosterB.rating);
      const multiplier = 1 / baseProb;
      const finalOutcome = selectedBet === winner ? 'Vitória' : 'Derrota';
      const finalWinnings = selectedBet === winner ? numericBet * multiplier : 0;

      messages.push(
        finalOutcome === 'Vitória'
          ? `🏆 ${selectedBet === 'A' ? roosterA.name : roosterB.name} vence com ${selectedBet === 'A' ? currentHpA : currentHpB} HP restantes!`
          : `💔 ${selectedBet === 'A' ? roosterA.name : roosterB.name} perdeu a luta!`
      );

      setFightNarrative(messages[messages.length - 1]);
      setResult({ outcome: finalOutcome, amount: finalWinnings });
      setIsFighting(false);
    });
  };

  // Cálculo das probabilidades para as barras de vida
  let baseProbADisplay = 0;
  let baseProbBDisplay = 0;
  if (roosterA && roosterB) {
    const total = roosterA.rating + roosterB.rating;
    baseProbADisplay = Math.round((roosterA.rating / total) * 100);
    baseProbBDisplay = 100 - baseProbADisplay;
  }

  // Renderiza cada card de galo
  const renderCard = (r: Rooster, onClick: () => void, isSelected: boolean) => {
    const cardStyle: React.CSSProperties = {
      position: 'relative',
      padding: '10px',
      border: '2px solid slategray',
      borderRadius: '8px',
      background: '#333',
      cursor: isFighting ? 'default' : 'pointer',
      textAlign: 'center',
      ...(isSelected && {
        animation: 'neonPulse 2s ease-in-out infinite',
        borderColor: '#fff'
      })
    };
    return (
      <div onClick={onClick} style={cardStyle}>
        <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '14px' }}>{r.name}</p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>Rating: {r.rating}</p>
        <p style={{ margin: '5px 0', fontSize: '12px' }}>HP: {r.hp}</p>
        <p style={{ margin: '5px 0', fontSize: '10px', fontStyle: 'italic' }}>{r.specialAttack}</p>
      </div>
    );
  };

  return (
    <div
      style={{
        background: '#111',
        color: '#eee',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Roboto, Arial, sans-serif',
        boxSizing: 'border-box'
      }}
    >
      {/* CSS injetado para keyframes e radio buttons */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes neonPulse {
            0% { box-shadow: 0 0 5px #fff; }
            50% { box-shadow: 0 0 20px #fff; }
            100% { box-shadow: 0 0 5px #fff; }
          }
          input[type="radio"].square-radio {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border: 2px solid #ccc;
            border-radius: 0;
            margin-right: 5px;
            outline: none;
            cursor: pointer;
          }
          input[type="radio"].square-radio:checked {
            background-color: #2196f3;
            border-color: #2196f3;
          }
          `
        }}
      />

      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '36px' }}>
        Arena de Rinha de Galos
      </h1>

      {/* Seleção de Times */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Time A */}
        <div style={{ flex: '1 1 300px', background: '#222', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '24px' }}>Time A</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
            {teamA.map((r) => {
              const isSelected = roosterA?.id === r.id;
              return (
                <div key={r.id}>
                  {renderCard(r, () => {
                    handleRoosterASelect(r);
                    setResult(null);
                  }, isSelected)}
                </div>
              );
            })}
          </div>
          {roosterA && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <label style={{ cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="radio"
                  className="square-radio"
                  name="bet"
                  checked={selectedBet === 'A'}
                  onChange={() => handleRadioChange('A')}
                />
                Apostar no {roosterA.name}
              </label>
            </div>
          )}
        </div>

        {/* Time B */}
        <div style={{ flex: '1 1 300px', background: '#222', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '24px' }}>Time B</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
            {teamB.map((r) => {
              const isSelected = roosterB?.id === r.id;
              return (
                <div key={r.id}>
                  {renderCard(r, () => {
                    handleRoosterBSelect(r);
                    setResult(null);
                  }, isSelected)}
                </div>
              );
            })}
          </div>
          {roosterB && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <label style={{ cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="radio"
                  className="square-radio"
                  name="bet"
                  checked={selectedBet === 'B'}
                  onChange={() => handleRadioChange('B')}
                  style={{ marginRight: '5px' }}
                />
                Apostar no {roosterB.name}
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Exibição das Probabilidades */}
      {roosterA && roosterB && (
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', margin: '30px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px' }}>
              Chance {roosterA.name}: {baseProbADisplay}%
            </p>
            <div style={{ width: '200px', height: '20px', background: '#555', borderRadius: '10px', margin: '0 auto' }}>
              <div style={{ transition: 'width 0.5s ease', width: `${(currentHpA / (roosterA ? roosterA.hp : 1)) * 100}%`, height: '100%', background: '#4caf50', borderRadius: '10px' }}></div>
            </div>
            {roosterA && <p style={{ fontSize: '14px', marginTop: '5px' }}>{currentHpA} / {roosterA.hp} HP</p>}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px' }}>
              Chance {roosterB.name}: {baseProbBDisplay}%
            </p>
            <div style={{ width: '200px', height: '20px', background: '#555', borderRadius: '10px', margin: '0 auto' }}>
              <div style={{ transition: 'width 0.5s ease', width: `${(currentHpB / (roosterB ? roosterB.hp : 1)) * 100}%`, height: '100%', background: '#f44336', borderRadius: '10px' }}></div>
            </div>
            {roosterB && <p style={{ fontSize: '14px', marginTop: '5px' }}>{currentHpB} / {roosterB.hp} HP</p>}
          </div>
        </div>
      )}

      {/* Área de Aposta */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="R$ 0,00"
          value={betAmount}
          onChange={handleCurrencyChange}
          onBlur={handleBetBlur}
          style={{
            padding: '10px',
            width: '250px',
            marginRight: '10px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            fontSize: '18px',
            color: '#000'
          }}
        />
        <button
          onClick={simulateFight}
          disabled={isFighting}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            borderRadius: '5px',
            border: 'none',
            background: isFighting ? '#888' : '#2196f3',
            color: '#fff',
            cursor: isFighting ? 'not-allowed' : 'pointer'
          }}
        >
          Apostar
        </button>
      </div>

      {/* Janela de Narrativa da Luta */}
      {isFighting && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '2px solid #666',
            borderRadius: '10px',
            background: '#000',
            maxWidth: '600px',
            margin: '0 auto 20px',
            fontSize: '20px',
            minHeight: '80px'
          }}
        >
          {fightNarrative}
        </div>
      )}

      {/* Exibição do Resultado Final */}
      {result && !isFighting && (
        <div
          style={{
            textAlign: 'center',
            padding: '20px',
            border: '2px solid #666',
            borderRadius: '10px',
            background: '#000',
            maxWidth: '400px',
            margin: '0 auto'
          }}
        >
          <h2 style={{ color: result.outcome === 'Vitória' ? '#4caf50' : '#f44336', fontSize: '36px', marginBottom: '10px' }}>
            {result.outcome}
          </h2>
          <p style={{ color: '#fff', fontSize: '24px' }}>
            {result.outcome === 'Vitória'
              ? `Você ganhou R$ ${result.amount.toFixed(2)}`
              : `Você perdeu R$ ${parseFloat(betAmount.replace(/[^\d.,]/g, '').replace(',', '.')).toFixed(2)}`}
          </p>
        </div>
      )}
    </div>
  );
};

// Função para formatar o valor de aposta ao sair do campo
const handleBetBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  let input = e.target.value;
  input = input.replace(/[^\d.,]/g, '');
  input = input.replace(/\./g, '');
  input = input.replace(',', '.');
  const numeric = parseFloat(input) || 0;
  const formatted = numeric.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  e.target.value = formatted;
};

export default Rinha;
