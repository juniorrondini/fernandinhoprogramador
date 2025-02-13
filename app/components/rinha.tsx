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

// Cria os arrays de galos para cada time, usando a função getRandomInt determinística
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

// Função para exibir mensagens especiais (golpe fatal) – 10 variações
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
  const [betAmount, setBetAmount] = useState<string>('');
  const [result, setResult] = useState<{ outcome: 'Vitória' | 'Derrota'; amount: number } | null>(null);
  const [fightNarrative, setFightNarrative] = useState<string>('');
  const [isFighting, setIsFighting] = useState<boolean>(false);

  // Seleciona os galos (quando não está em luta) e limpa o resultado anterior
  const handleRoosterASelect = (r: Rooster) => {
    if (isFighting) return;
    setResult(null);
    setFightNarrative('');
    setRoosterA(r);
  };

  const handleRoosterBSelect = (r: Rooster) => {
    if (isFighting) return;
    setResult(null);
    setFightNarrative('');
    setRoosterB(r);
  };

  const handleRadioChange = (bet: 'A' | 'B') => {
    if (isFighting) return;
    setResult(null);
    setFightNarrative('');
    setSelectedBet(bet);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numericValue = input.replace(/[^\d]/g, '');
    if (!numericValue) {
      setBetAmount('');
      return;
    }
    const valueNumber = parseInt(numericValue, 10);
    const formatted = (valueNumber / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    setBetAmount(formatted);
  };

  const simulateFight = () => {
    const numericBet = parseFloat(betAmount.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!roosterA || !roosterB || !selectedBet || isNaN(numericBet) || numericBet <= 0) {
      alert('Selecione dois galos, escolha em qual apostar e informe um valor válido.');
      return;
    }
    if (isFighting) return;

    const randomFactorA = 0.85 + Math.random() * 0.3;
    const randomFactorB = 0.85 + Math.random() * 0.3;
    const effectiveA = roosterA.rating * randomFactorA;
    const effectiveB = roosterB.rating * randomFactorB;
    const sumEffective = effectiveA + effectiveB;
    const effectiveProbA = effectiveA / sumEffective;
    const random = Math.random();
    const winner = random < effectiveProbA ? 'A' : 'B';

    let outcome: 'Vitória' | 'Derrota';
    let winnings = 0;
    if (selectedBet === winner) {
      const baseProb =
        selectedBet === 'A'
          ? roosterA.rating / (roosterA.rating + roosterB.rating)
          : roosterB.rating / (roosterA.rating + roosterB.rating);
      const multiplier = 1 / baseProb;
      winnings = numericBet * multiplier;
      outcome = 'Vitória';
    } else {
      outcome = 'Derrota';
    }
    // Golpe especial com 25% de chance
    let specialUsed = false;
    if (Math.random() < 0.25) {
      specialUsed = true;
      outcome = 'Vitória';
      const baseProbSpecial =
        selectedBet === 'A'
          ? roosterA.rating / (roosterA.rating + roosterB.rating)
          : roosterB.rating / (roosterA.rating + roosterB.rating);
      winnings = numericBet * (1 / baseProbSpecial) * 2;
    }
    const resultData = { outcome, amount: winnings };

    const betName = selectedBet === 'A' ? roosterA.name : roosterB.name;
    const opponentName = selectedBet === 'A' ? roosterB.name : roosterA.name;

    const stage1Messages = [
      "🥊 A arena se ilumina para o combate!",
      "⚔️ Prepare-se! A batalha vai começar!",
      "🔥 O clima esquenta... a luta está prestes a iniciar!",
      "🚀 Os gladiadores se posicionam para a ação!",
      "🏟️ A multidão ruge em expectativa!",
      "✨ Os holofotes se acendem no ringue!",
      "🌌 Energia cósmica invade a arena!"
    ];

    const stage2Messages = [
      `👀 Olhe! ${roosterA.name} vs ${roosterB.name} se preparam para o embate!`,
      `🤼‍♂️ Confronto anunciado: ${roosterA.name} desafia ${roosterB.name}!`,
      `💥 Choque de titãs: ${roosterA.name} e ${roosterB.name} se encaram!`,
      `🎯 Os competidores se alinham: ${roosterA.name} contra ${roosterB.name}!`,
      `⚡ Que duelo! ${roosterA.name} e ${roosterB.name} estão prontos para a batalha!`
    ];

    const stage3NormalMessages = [
      `⚡ ${betName} desferiu um golpe fulminante! 💥`,
      `🔥 ${betName} avança com um ataque devastador! 🚀`,
      `💪 Força suprema: ${betName} acerta um golpe certeiro! 🔥`,
      `🤩 Manobra brilhante! ${betName} surpreende o adversário! 🌟`,
      `💥 Impacto total! ${betName} derruba ${opponentName} com estilo! 🏆`,
      "💥 Um soco de mestre! O público aplaude de pé!",
      "🎇 Explosão de energia! A vitória se aproxima!"
    ];
    const stage3Messages = specialUsed
      ? specialAttackMessages(
          betName,
          selectedBet === 'A' ? (roosterA.specialAttack || "") : (roosterB.specialAttack || ""),
          opponentName
        )
      : stage3NormalMessages;

    const stage4Messages = [
      "🌟 O clímax se aproxima... A tensão está no ar!",
      "🎇 A luta atinge seu auge, e tudo pode acontecer!",
      "🚨 O momento decisivo se aproxima, prepare-se!",
      "🔔 A multidão silencia enquanto o destino se decide!",
      "🔥 O embate esquenta e a vitória está a um passo!",
      "⏳ Cada segundo conta nesse duelo eletrizante!",
      "🎆 A arena vibra com a energia do confronto!"
    ];

    const stage5Messages = outcome === 'Vitória'
      ? [
          `🏆 AVASSALADOR! ${betName} conquista a vitória com honra! 💥`,
          `🎉 Vitória gloriosa! ${betName} reina absoluto! ⚡`,
          `💥 Domínio total! ${betName} prevaleceu com força inigualável! 🔥`,
          `👏 ${betName} demonstra sua superioridade e triunfa! 🚀`,
          `🥇 Triunfo épico! ${betName} leva a glória ao topo! 🌟`,
          "🎊 Uma vitória que ecoará na história!",
          `${betName} encerra a luta com um feito inesquecível!`
        ]
      : [
          `💔 DESASTROSO! ${betName} sucumbe aos ataques implacáveis! 😱`,
          `😢 Infelicidade total! ${betName} não resiste ao poder de ${opponentName}! 💥`,
          `😞 Derrota amarga! ${betName} é superado e cai! 🥀`,
          `🙁 O golpe final foi devastador para ${betName}! ⚠️`,
          `🚫 Sem chances! ${betName} foi derrotado de forma impressionante! 💔`,
          "😩 Um fim trágico: a luta não foi suficiente!",
          `${opponentName} domina a batalha e leva ${betName} à derrota!`
        ];

    setIsFighting(true);
    setFightNarrative(stage1Messages[Math.floor(Math.random() * stage1Messages.length)]);
    setTimeout(() => {
      setFightNarrative(stage2Messages[Math.floor(Math.random() * stage2Messages.length)]);
    }, 4000);
    setTimeout(() => {
      setFightNarrative(stage3Messages[Math.floor(Math.random() * stage3Messages.length)]);
    }, 8000);
    setTimeout(() => {
      setFightNarrative(stage4Messages[Math.floor(Math.random() * stage4Messages.length)]);
    }, 12000);
    setTimeout(() => {
      setFightNarrative(stage5Messages[Math.floor(Math.random() * stage5Messages.length)]);
    }, 16000);
    setTimeout(() => {
      setResult(resultData);
      setIsFighting(false);
      setFightNarrative('');
    }, 20000);
  };

  let baseProbA = 0;
  let baseProbB = 0;
  if (roosterA && roosterB) {
    const total = roosterA.rating + roosterB.rating;
    baseProbA = Math.round((roosterA.rating / total) * 100);
    baseProbB = 100 - baseProbA;
  }

  const renderCard = (
    r: Rooster,
    onClick: () => void,
    isSelected: boolean
  ) => {
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
        {r.hp && <p style={{ margin: '5px 0', fontSize: '12px' }}>HP: {r.hp}</p>}
        {r.specialAttack && (
          <p style={{ margin: '5px 0', fontSize: '10px', fontStyle: 'italic' }}>
            {r.specialAttack}
          </p>
        )}
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
                <input type="radio" className="square-radio" name="bet" checked={selectedBet === 'A'} onChange={() => handleRadioChange('A')} />
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
                <input type="radio" className="square-radio" name="bet" checked={selectedBet === 'B'} onChange={() => handleRadioChange('B')} style={{ marginRight: '5px' }} />
                Apostar no {roosterB.name}
              </label>
            </div>
          )}
        </div>
      </div>

      {roosterA && roosterB && (
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', margin: '30px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px' }}>
              Chance {roosterA.name}: {baseProbA}%
            </p>
            <div style={{ width: '200px', height: '20px', background: '#555', borderRadius: '10px', margin: '0 auto' }}>
              <div style={{ width: `${baseProbA}%`, height: '100%', background: '#4caf50', borderRadius: '10px' }}></div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '16px' }}>
              Chance {roosterB.name}: {baseProbB}%
            </p>
            <div style={{ width: '200px', height: '20px', background: '#555', borderRadius: '10px', margin: '0 auto' }}>
              <div style={{ width: `${baseProbB}%`, height: '100%', background: '#f44336', borderRadius: '10px' }}></div>
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="R$ 0,00"
          value={betAmount}
          onChange={handleCurrencyChange}
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

      {isFighting && (
        <div style={{ textAlign: 'center', padding: '20px', border: '2px solid #666', borderRadius: '10px', background: '#000', maxWidth: '600px', margin: '0 auto 30px', fontSize: '20px', minHeight: '80px' }}>
          {fightNarrative}
        </div>
      )}

      {result && !isFighting && (
        <div style={{ textAlign: 'center', padding: '20px', border: '2px solid #666', borderRadius: '10px', background: '#000', maxWidth: '400px', margin: '0 auto' }}>
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

export default Rinha;
