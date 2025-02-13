"use client";
import React, { useState } from 'react';

type Rooster = {
  id: number;
  name: string;
  rating: number;
};

// Lista de 50 galos – alguns com nomes de pessoas
const roosters: Rooster[] = [
  { id: 1, name: 'Capitão Bico', rating: 80 },
  { id: 2, name: 'General Peninha', rating: 70 },
  { id: 3, name: 'Coronel Asa', rating: 60 },
  { id: 4, name: 'Sargento Penas', rating: 65 },
  { id: 5, name: 'João Galo', rating: 85 },             // Alterado
  { id: 6, name: 'Barão Bicudo', rating: 55 },
  { id: 7, name: 'Doutor Plumagem', rating: 75 },
  { id: 8, name: 'Marujo Plumoso', rating: 50 },
  { id: 9, name: 'Lord Cocoricó', rating: 90 },
  { id: 10, name: 'Carlos Galo', rating: 95 },           // Alterado
  { id: 11, name: 'Imperador Galo', rating: 88 },
  { id: 12, name: 'Duque do Penacho', rating: 78 },
  { id: 13, name: 'Rei do Bico', rating: 82 },
  { id: 14, name: 'Nobre Galonegro', rating: 68 },
  { id: 15, name: 'Baronete das Penas', rating: 73 },
  { id: 16, name: 'Cavaleiro de Asas', rating: 77 },
  { id: 17, name: 'Gladiador de Plumas', rating: 91 },
  { id: 18, name: 'Senhor das Esporas', rating: 83 },
  { id: 19, name: 'Cientista do Bico', rating: 66 },
  { id: 20, name: 'Pedro Penas', rating: 74 },           // Alterado
  { id: 21, name: 'Furacão Alado', rating: 87 },
  { id: 22, name: 'Vórtice de Penas', rating: 69 },
  { id: 23, name: 'Trovão Bicudo', rating: 92 },
  { id: 24, name: 'Falcão de Galo', rating: 64 },
  { id: 25, name: 'Vingador Alado', rating: 86 },
  { id: 26, name: 'Senhor Espora', rating: 72 },
  { id: 27, name: 'Comandante das Asas', rating: 89 },
  { id: 28, name: 'Viajante de Plumas', rating: 67 },
  { id: 29, name: 'Guerreiro do Bico', rating: 93 },
  { id: 30, name: 'Ricardo Galo', rating: 96 },         // Alterado
  { id: 31, name: 'Cyber Galo', rating: 70 },
  { id: 32, name: 'Neon Bico', rating: 75 },
  { id: 33, name: 'Robo Asas', rating: 80 },
  { id: 34, name: 'Hiper Plumagem', rating: 85 },
  { id: 35, name: 'Laser Bicudo', rating: 90 },
  { id: 36, name: 'Alpha Galótico', rating: 95 },
  { id: 37, name: 'Beta Penacho', rating: 78 },
  { id: 38, name: 'Omega Asas', rating: 82 },
  { id: 39, name: 'Quantum Galo', rating: 88 },
  { id: 40, name: 'André Bicudo', rating: 76 },         // Alterado
  { id: 41, name: 'Futuro Alado', rating: 84 },
  { id: 42, name: 'X-Treme Penas', rating: 89 },
  { id: 43, name: 'Ultra Galonegro', rating: 92 },
  { id: 44, name: 'Cybernetic Espora', rating: 87 },
  { id: 45, name: 'Digital Plumagem', rating: 90 },
  { id: 46, name: 'Neon Asas', rating: 83 },
  { id: 47, name: 'Robo Peninha', rating: 79 },
  { id: 48, name: 'Interstelar Galo', rating: 94 },
  { id: 49, name: 'Futuro Bicudo', rating: 86 },
  { id: 50, name: 'Marcos Galonegro', rating: 91 }       // Alterado
];

const Rinha: React.FC = () => {
  // Estados para seleção, aposta, resultado, narrativa e controle da simulação
  const [roosterA, setRoosterA] = useState<Rooster | null>(null);
  const [roosterB, setRoosterB] = useState<Rooster | null>(null);
  const [selectedBet, setSelectedBet] = useState<'A' | 'B' | null>(null);
  const [betAmount, setBetAmount] = useState<string>(''); // valor com máscara
  const [result, setResult] = useState<{ outcome: 'Vitória' | 'Derrota'; amount: number } | null>(null);
  const [fightNarrative, setFightNarrative] = useState<string>('');
  const [isFighting, setIsFighting] = useState<boolean>(false);

  // Sempre que houver alteração, limpa resultados e narrativa
  const handleRoosterASelect = (r: Rooster) => {
    if (roosterB?.id === r.id) return;
    setResult(null);
    setFightNarrative('');
    setRoosterA(r);
  };

  const handleRoosterBSelect = (r: Rooster) => {
    if (roosterA?.id === r.id) return;
    setResult(null);
    setFightNarrative('');
    setRoosterB(r);
  };

  const handleBetChange = (value: string) => {
    setResult(null);
    setFightNarrative('');
    setBetAmount(value);
  };

  const handleRadioChange = (bet: 'A' | 'B') => {
    setResult(null);
    setFightNarrative('');
    setSelectedBet(bet);
  };

  // Função para simular a luta com narrativa (cada etapa dura 4 segundos)
  const simulateFight = () => {
    const numericBet = parseFloat(betAmount.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!roosterA || !roosterB || !selectedBet || isNaN(numericBet) || numericBet <= 0) {
      alert('Selecione dois galos, escolha em qual apostar e informe um valor válido.');
      return;
    }
    if (isFighting) return;

    // Fatores aleatórios de sorte
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
    const resultData = { outcome, amount: winnings };

    // Definindo nomes para uso na narrativa
    const betName = selectedBet === 'A' ? roosterA.name : roosterB.name;
    const opponentName = selectedBet === 'A' ? roosterB.name : roosterA.name;

    // Arrays de mensagens (várias variações com emojis)
    const stage1Messages = [
      "🥊 A arena se ilumina para o combate!",
      "⚔️ Prepare-se! A batalha vai começar!",
      "🔥 O clima esquenta... a luta está prestes a iniciar!",
      "🚀 Os gladiadores se posicionam para a ação!",
      "🏟️ A multidão ruge em expectativa!"
    ];

    const stage2Messages = [
      `👀 Olhe! ${roosterA.name} vs ${roosterB.name} estão prontos para o embate!`,
      `🤼‍♂️ Confronto anunciado: ${roosterA.name} desafia ${roosterB.name}!`,
      `💥 Choque de titãs: ${roosterA.name} e ${roosterB.name} se encaram!`,
      `🎯 Os competidores se alinham: ${roosterA.name} contra ${roosterB.name}!`,
      `⚡ Que duelo! ${roosterA.name} e ${roosterB.name} estão prontos para a batalha!`
    ];

    const stage3VictoryMessages = [
      `⚡ ${betName} desferiu um golpe fulminante! 💥`,
      `🔥 ${betName} avança com um ataque devastador! 🚀`,
      `💪 ${betName} mostra sua força suprema com um golpe certeiro! 🔥`,
      `🤩 ${betName} surpreende com uma manobra brilhante! 🌟`,
      `💥 Impacto total! ${betName} derruba o adversário com estilo! 🏆`
    ];

    const stage3DefeatMessages = [
      `😵 ${betName} tenta se defender, mas falha miseravelmente! 💔`,
      `💔 Uma esquiva falha! ${betName} sofre um golpe brutal! 😱`,
      `🛡️ A defesa vacila: ${betName} é atingido com força! ⚠️`,
      `👎 ${betName} não teve chance e leva um golpe devastador! 😞`,
      `😢 Dor e derrota: ${betName} é dominado pelo adversário! 🥀`
    ];

    const stage4Messages = [
      "🌟 O clímax se aproxima... A tensão está no ar!",
      "🎇 A luta atinge seu auge, e tudo pode acontecer!",
      "🚨 O momento decisivo se aproxima, prepare-se!",
      "🔔 A multidão silencia enquanto o destino se decide!",
      "🔥 O embate esquenta e a vitória está a um passo!"
    ];

    const stage5VictoryMessages = [
      `🏆 AVASSALADOR! ${betName} conquista a vitória com honra! 💥`,
      `🎉 Vitória gloriosa! ${betName} reina absoluto! ⚡`,
      `💥 Domínio total! ${betName} prevaleceu com força inigualável! 🔥`,
      `👏 ${betName} demonstra sua superioridade e triunfa! 🚀`,
      `🥇 Triunfo épico! ${betName} leva a glória ao topo! 🌟`
    ];

    const stage5DefeatMessages = [
      `💔 DESASTROSO! ${betName} sucumbe aos ataques implacáveis! 😱`,
      `😢 Infelicidade total! ${betName} não resiste ao poder do adversário! 💥`,
      `😞 Derrota amarga! ${betName} é superado e cai! 🥀`,
      `🙁 O golpe final foi devastador para ${betName}! ⚠️`,
      `🚫 Sem chances! ${betName} foi derrotado de forma impressionante! 💔`
    ];

    // Inicia a sequência de narrativa – cada etapa dura 4000ms
    setIsFighting(true);
    setFightNarrative(stage1Messages[Math.floor(Math.random() * stage1Messages.length)]);

    setTimeout(() => {
      setFightNarrative(stage2Messages[Math.floor(Math.random() * stage2Messages.length)]);
    }, 4000);

    setTimeout(() => {
      if (resultData.outcome === 'Vitória') {
        setFightNarrative(stage3VictoryMessages[Math.floor(Math.random() * stage3VictoryMessages.length)]);
      } else {
        setFightNarrative(stage3DefeatMessages[Math.floor(Math.random() * stage3DefeatMessages.length)]);
      }
    }, 8000);

    setTimeout(() => {
      setFightNarrative(stage4Messages[Math.floor(Math.random() * stage4Messages.length)]);
    }, 12000);

    setTimeout(() => {
      if (resultData.outcome === 'Vitória') {
        setFightNarrative(stage5VictoryMessages[Math.floor(Math.random() * stage5VictoryMessages.length)]);
      } else {
        setFightNarrative(stage5DefeatMessages[Math.floor(Math.random() * stage5DefeatMessages.length)]);
      }
    }, 16000);

    setTimeout(() => {
      setResult(resultData);
      setIsFighting(false);
      setFightNarrative('');
    }, 20000);
  };

  // Cálculo das probabilidades base para exibição
  let baseProbA = 0;
  let baseProbB = 0;
  if (roosterA && roosterB) {
    const total = roosterA.rating + roosterB.rating;
    baseProbA = Math.round((roosterA.rating / total) * 100);
    baseProbB = 100 - baseProbA;
  }

  return (
    <div
      style={{
        background: '#111',
        color: '#eee',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: "'Orbitron', 'Press Start 2P', cursive, Arial, sans-serif",
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '36px' }}>
        Arena de Rinha de Galos
      </h1>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Time A */}
        <div style={{ flex: '1 1 400px', background: '#222', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '24px' }}>Time A</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '10px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {roosters.map((r) => {
              const isSelected = roosterA?.id === r.id;
              const disabled = roosterB?.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => handleRoosterASelect(r)}
                  style={{
                    padding: '10px',
                    border: isSelected ? '2px solid #4caf50' : '2px solid transparent',
                    borderRadius: '8px',
                    background: disabled ? '#444' : '#333',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '14px' }}>{r.name}</p>
                  <p style={{ margin: '5px 0', fontSize: '12px' }}>Rating: {r.rating}</p>
                </div>
              );
            })}
          </div>
          {roosterA && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <label style={{ cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="bet"
                  checked={selectedBet === 'A'}
                  onChange={() => handleRadioChange('A')}
                  style={{ marginRight: '5px' }}
                />
                Apostar neste galo
              </label>
            </div>
          )}
        </div>

        {/* Time B */}
        <div style={{ flex: '1 1 400px', background: '#222', padding: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '24px' }}>Time B</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '10px',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {roosters.map((r) => {
              const isSelected = roosterB?.id === r.id;
              const disabled = roosterA?.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => handleRoosterBSelect(r)}
                  style={{
                    padding: '10px',
                    border: isSelected ? '2px solid #f44336' : '2px solid transparent',
                    borderRadius: '8px',
                    background: disabled ? '#444' : '#333',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '14px' }}>{r.name}</p>
                  <p style={{ margin: '5px 0', fontSize: '12px' }}>Rating: {r.rating}</p>
                </div>
              );
            })}
          </div>
          {roosterB && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <label style={{ cursor: 'pointer', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="bet"
                  checked={selectedBet === 'B'}
                  onChange={() => handleRadioChange('B')}
                  style={{ marginRight: '5px' }}
                />
                Apostar neste galo
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

      {/* Área de Aposta */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="R$ 0,00"
          value={betAmount}
          onChange={(e) => handleBetChange(e.target.value)}
          style={{
            padding: '10px',
            width: '250px',
            marginRight: '10px',
            borderRadius: '5px',
            border: 'none',
            outline: 'none',
            fontSize: '18px',
            color: '#000',
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
            cursor: isFighting ? 'not-allowed' : 'pointer',
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
            margin: '0 auto 30px',
            fontSize: '20px',
            minHeight: '80px',
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
            margin: '0 auto',
          }}
        >
          <h2
            style={{
              color: result.outcome === 'Vitória' ? '#4caf50' : '#f44336',
              fontSize: '36px',
              marginBottom: '10px',
            }}
          >
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
