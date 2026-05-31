"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./draft.module.css";
import { useMyContext } from " @/context/ListContext";
import Image from "next/image";
import { Team } from " @/types/types";
import gsap from "gsap";
import Particles from " @/components/particles";

const Draft = () => {
  const { FrancoCopy, MarcosCopy, GastonCopy, RomaCopy } =
    useMyContext();

  let franco: Team[] | [] = FrancoCopy;
  let gaston: Team[] | [] = GastonCopy;
  let marcos: Team[] | [] = MarcosCopy;
  let roma: Team[] | [] = RomaCopy;

  const remainingTeams = [...franco, ...gaston, ...marcos, ...roma];

  let base: Team = {
    nombre: "",
    escudo: "",
    rank: "",
  };
  const [forceRender, setForceRender] = useState(0);
  const setTestTeam = (val: any) => setForceRender(p => p + 1);

  const [showTeamsPopup, setShowTeamsPopup] = useState(false);
  const [initialTeams, setInitialTeams] = useState<any>({
    franco: [], gaston: [], marcos: [], roma: []
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const f = JSON.parse(localStorage.getItem('francoTeams') || '[]');
      const g = JSON.parse(localStorage.getItem('gastonTeams') || '[]');
      const m = JSON.parse(localStorage.getItem('marcosTeams') || '[]');
      const r = JSON.parse(localStorage.getItem('romaTeams') || '[]');
      setInitialTeams({ franco: f, gaston: g, marcos: m, roma: r });
    }
  }, []);
  const A1Ref = useRef<HTMLDivElement>(null);
  const A2Ref = useRef<HTMLDivElement>(null);
  const B1Ref = useRef<HTMLDivElement>(null);
  const B2Ref = useRef<HTMLDivElement>(null);
  const C1Ref = useRef<HTMLDivElement>(null);
  const C2Ref = useRef<HTMLDivElement>(null);
  const D1Ref = useRef<HTMLDivElement>(null);
  const D2Ref = useRef<HTMLDivElement>(null);
  const E1Ref = useRef<HTMLDivElement>(null);
  const E2Ref = useRef<HTMLDivElement>(null);
  const F1Ref = useRef<HTMLDivElement>(null);
  const F2Ref = useRef<HTMLDivElement>(null);
  const G1Ref = useRef<HTMLDivElement>(null);
  const G2Ref = useRef<HTMLDivElement>(null);
  const H1Ref = useRef<HTMLDivElement>(null);
  const H2Ref = useRef<HTMLDivElement>(null);

  const I1Ref = useRef<HTMLDivElement>(null);
  const I2Ref = useRef<HTMLDivElement>(null);
  const J1Ref = useRef<HTMLDivElement>(null);
  const J2Ref = useRef<HTMLDivElement>(null);
  const K1Ref = useRef<HTMLDivElement>(null);
  const K2Ref = useRef<HTMLDivElement>(null);
  const L1Ref = useRef<HTMLDivElement>(null);
  const L2Ref = useRef<HTMLDivElement>(null);
  const M1Ref = useRef<HTMLDivElement>(null);
  const M2Ref = useRef<HTMLDivElement>(null);
  const N1Ref = useRef<HTMLDivElement>(null);
  const N2Ref = useRef<HTMLDivElement>(null);
  const O1Ref = useRef<HTMLDivElement>(null);
  const O2Ref = useRef<HTMLDivElement>(null);
  const P1Ref = useRef<HTMLDivElement>(null);
  const P2Ref = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);

  const shootTeamAndSet = (team: any, targetRef: React.RefObject<HTMLDivElement>, setter: Function) => {
    setForceRender(prev => prev + 1);

    const pileBox = pileRef.current;
    const target = targetRef.current;
    if (!pileBox || !target) {
      setter(team);
      return;
    }

    const flyingDiv = document.createElement("div");
    flyingDiv.className = "fixed top-0 left-0 z-50 pointer-events-none";

    const img = document.createElement("img");
    img.src = team.escudo;
    img.alt = team.nombre;
    img.width = 40;
    img.height = 40;
    img.className = "object-contain";

    flyingDiv.appendChild(img);
    document.body.appendChild(flyingDiv);

    const pileRect = pileBox.getBoundingClientRect();
    const startX = pileRect.left + pileRect.width / 2 - 20;
    const startY = pileRect.top + pileRect.height / 2 - 20;

    gsap.set(flyingDiv, { x: startX, y: startY, scale: 0.5, opacity: 0 });

    const targetRect = target.getBoundingClientRect();
    const endX = targetRect.left + 10;
    const endY = targetRect.top - 5;

    gsap.to(flyingDiv, {
      x: endX,
      y: endY,
      scale: 1,
      opacity: 1,
      duration: 1.1,
      ease: "power2.out",
      onComplete: () => {
        flyingDiv.remove();
        setter(team);
      }
    });
  };

  const [A1, _setA1] = useState(base);
  const setA1 = (val: any) => shootTeamAndSet(val, A1Ref, _setA1);
  const [A2, _setA2] = useState(base);
  const setA2 = (val: any) => shootTeamAndSet(val, A2Ref, _setA2);
  const [B1, _setB1] = useState(base);
  const setB1 = (val: any) => shootTeamAndSet(val, B1Ref, _setB1);
  const [B2, _setB2] = useState(base);
  const setB2 = (val: any) => shootTeamAndSet(val, B2Ref, _setB2);
  const [C1, _setC1] = useState(base);
  const setC1 = (val: any) => shootTeamAndSet(val, C1Ref, _setC1);
  const [C2, _setC2] = useState(base);
  const setC2 = (val: any) => shootTeamAndSet(val, C2Ref, _setC2);
  const [D1, _setD1] = useState(base);
  const setD1 = (val: any) => shootTeamAndSet(val, D1Ref, _setD1);
  const [D2, _setD2] = useState(base);
  const setD2 = (val: any) => shootTeamAndSet(val, D2Ref, _setD2);
  const [E1, _setE1] = useState(base);
  const setE1 = (val: any) => shootTeamAndSet(val, E1Ref, _setE1);
  const [E2, _setE2] = useState(base);
  const setE2 = (val: any) => shootTeamAndSet(val, E2Ref, _setE2);
  const [F1, _setF1] = useState(base);
  const setF1 = (val: any) => shootTeamAndSet(val, F1Ref, _setF1);
  const [F2, _setF2] = useState(base);
  const setF2 = (val: any) => shootTeamAndSet(val, F2Ref, _setF2);
  const [G1, _setG1] = useState(base);
  const setG1 = (val: any) => shootTeamAndSet(val, G1Ref, _setG1);
  const [G2, _setG2] = useState(base);
  const setG2 = (val: any) => shootTeamAndSet(val, G2Ref, _setG2);
  const [H1, _setH1] = useState(base);
  const setH1 = (val: any) => shootTeamAndSet(val, H1Ref, _setH1);
  const [H2, _setH2] = useState(base);
  const setH2 = (val: any) => shootTeamAndSet(val, H2Ref, _setH2);

  const [I1, _setI1] = useState(base);
  const setI1 = (val: any) => shootTeamAndSet(val, I1Ref, _setI1);
  const [I2, _setI2] = useState(base);
  const setI2 = (val: any) => shootTeamAndSet(val, I2Ref, _setI2);
  const [J1, _setJ1] = useState(base);
  const setJ1 = (val: any) => shootTeamAndSet(val, J1Ref, _setJ1);
  const [J2, _setJ2] = useState(base);
  const setJ2 = (val: any) => shootTeamAndSet(val, J2Ref, _setJ2);
  const [K1, _setK1] = useState(base);
  const setK1 = (val: any) => shootTeamAndSet(val, K1Ref, _setK1);
  const [K2, _setK2] = useState(base);
  const setK2 = (val: any) => shootTeamAndSet(val, K2Ref, _setK2);
  const [L1, _setL1] = useState(base);
  const setL1 = (val: any) => shootTeamAndSet(val, L1Ref, _setL1);
  const [L2, _setL2] = useState(base);
  const setL2 = (val: any) => shootTeamAndSet(val, L2Ref, _setL2);
  const [M1, _setM1] = useState(base);
  const setM1 = (val: any) => shootTeamAndSet(val, M1Ref, _setM1);
  const [M2, _setM2] = useState(base);
  const setM2 = (val: any) => shootTeamAndSet(val, M2Ref, _setM2);
  const [N1, _setN1] = useState(base);
  const setN1 = (val: any) => shootTeamAndSet(val, N1Ref, _setN1);
  const [N2, _setN2] = useState(base);
  const setN2 = (val: any) => shootTeamAndSet(val, N2Ref, _setN2);
  const [O1, _setO1] = useState(base);
  const setO1 = (val: any) => shootTeamAndSet(val, O1Ref, _setO1);
  const [O2, _setO2] = useState(base);
  const setO2 = (val: any) => shootTeamAndSet(val, O2Ref, _setO2);
  const [P1, _setP1] = useState(base);
  const setP1 = (val: any) => shootTeamAndSet(val, P1Ref, _setP1);
  const [P2, _setP2] = useState(base);
  const setP2 = (val: any) => shootTeamAndSet(val, P2Ref, _setP2);

  const [A3, setA3] = useState(base);
  const [B3, setB3] = useState(base);
  const [C3, setC3] = useState(base);
  const [D3, setD3] = useState(base);
  const [E3, setE3] = useState(base);
  const [F3, setF3] = useState(base);
  const [G3, setG3] = useState(base);
  const [H3, setH3] = useState(base);

  const [A4, setA4] = useState(base);
  const [B4, setB4] = useState(base);
  const [C4, setC4] = useState(base);
  const [D4, setD4] = useState(base);

  const [A5, setA5] = useState(base);
  const [B5, setB5] = useState(base);

  const [A6, setA6] = useState(base);
  const [A7, setA7] = useState(base);

  const [I3, setI3] = useState(base);
  const [J3, setJ3] = useState(base);
  const [K3, setK3] = useState(base);
  const [L3, setL3] = useState(base);
  const [M3, setM3] = useState(base);
  const [N3, setN3] = useState(base);
  const [O3, setO3] = useState(base);
  const [P3, setP3] = useState(base);

  const [I4, setI4] = useState(base);
  const [J4, setJ4] = useState(base);
  const [K4, setK4] = useState(base);
  const [L4, setL4] = useState(base);

  const [I5, setI5] = useState(base);
  const [J5, setJ5] = useState(base);

  const [I6, setI6] = useState(base);
  const [baraja, setBaraja] = useState(false);

  // const steps = [
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(G1Ref);
  //     setG1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(C1Ref);
  //     setC1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(K1Ref);
  //     setK1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(E1Ref);
  //     setE1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(F1Ref);
  //     setF1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(A1Ref);
  //     setA1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(H1Ref);
  //     setH1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(J1Ref);
  //     setJ1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(B1Ref);
  //     setB1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(H2Ref);
  //     setH2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(L1Ref);
  //     setL1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(B2Ref);
  //     setB2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(M1Ref);
  //     setM1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(N1Ref);
  //     setN1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(G2Ref);
  //     setG2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(L2Ref);
  //     setL2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(O1Ref);
  //     setO1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(I1Ref);
  //     setI1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(P1Ref);
  //     setP1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(D1Ref);
  //     setD1(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(A2Ref);
  //     setA2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(K2Ref);
  //     setK2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(D2Ref);
  //     setD2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(E2Ref);
  //     setE2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(I2Ref);
  //     setI2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(P2Ref);
  //     setP2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(J2Ref);
  //     setJ2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(marcos);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(M2Ref);
  //     setM2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(N2Ref);
  //     setN2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(franco);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(F2Ref);
  //     setF2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(gaston);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(O2Ref);
  //     setO2(val);
  //   },
  //   async () => {
  //     const val = getRandomAndSplice(roma);
  //     setTestTeam(val);
  //     await delay(300);
  //     await animateTeamTo(C2Ref);
  //     setC2(val);
  //   },
  //   async () => {
  //     await delay(300);
  //     setBaraja(false);
  //   }
  // ];
  const steps_two = [
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(G1Ref);
      setG1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(C1Ref);
      setC1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(K1Ref);
      setK1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(E1Ref);
      setE1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(F1Ref);
      setF1(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(A1Ref);
      setA1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(H1Ref);
      setH1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(J1Ref);
      setJ1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(B1Ref);
      setB1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(H2Ref);
      setH2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(L1Ref);
      setL1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(B2Ref);
      setB2(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(M1Ref);
      setM1(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(N1Ref);
      setN1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(G2Ref);
      setG2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(L2Ref);
      setL2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(O1Ref);
      setO1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(I1Ref);
      setI1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(P1Ref);
      setP1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(D1Ref);
      setD1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(A2Ref);
      setA2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(K2Ref);
      setK2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(D2Ref);
      setD2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(E2Ref);
      setE2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(I2Ref);
      setI2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(P2Ref);
      setP2(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(J2Ref);
      setJ2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(M2Ref);
      setM2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(N2Ref);
      setN2(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(F2Ref);
      setF2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(O2Ref);
      setO2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(C2Ref);
      setC2(val);
    },
    async () => {
      await delay(300);
      setBaraja(false);
    }
  ];

  const steps_three = [
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(G1Ref);
      setG1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(C1Ref);
      setC1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(K1Ref);
      setK1(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(E1Ref);
      setE1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(F1Ref);
      setF1(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(A1Ref);
      setA1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(H1Ref);
      setH1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(J1Ref);
      setJ1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(B1Ref);
      setB1(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(H2Ref);
      setH2(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(L1Ref);
      setL1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(B2Ref);
      setB2(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(M1Ref);
      setM1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(N1Ref);
      setN1(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(G2Ref);
      setG2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(L2Ref);
      setL2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(O1Ref);
      setO1(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(I1Ref);
      setI1(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(P1Ref);
      setP1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(D1Ref);
      setD1(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(A2Ref);
      setA2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(K2Ref);
      setK2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(D2Ref);
      setD2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(E2Ref);
      setE2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(I2Ref);
      setI2(val);
    },
    async () => {
      const val = getRandomAndSplice(gaston);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(P2Ref);
      setP2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(J2Ref);
      setJ2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(M2Ref);
      setM2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(N2Ref);
      setN2(val);
    },
    async () => {
      const val = getRandomAndSplice(marcos);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(F2Ref);
      setF2(val);
    },
    async () => {
      const val = getRandomAndSplice(roma);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(O2Ref);
      setO2(val);
    },
    async () => {
      const val = getRandomAndSplice(franco);
      setTestTeam(val);
      await delay(300);
      await animateTeamTo(C2Ref);
      setC2(val);
    },
    async () => {
      await delay(300);
      setBaraja(false);
    }
  ];

  function clean() {
    setA3(base);
    setB3(base);
    setC3(base);
    setD3(base);
    setE3(base);
    setF3(base);
    setG3(base);
    setH3(base);

    setA4(base);
    setB4(base);
    setC4(base);
    setD4(base);

    setA5(base);
    setB5(base);

    setA6(base);
    setA7(base);

    setI3(base);
    setJ3(base);
    setK3(base);
    setL3(base);
    setM3(base);
    setN3(base);
    setO3(base);
    setP3(base);

    setI4(base);
    setJ4(base);
    setK4(base);
    setL4(base);

    setI5(base);
    setJ5(base);

    setI6(base);
  }
  function getRandomAndSplice(array: any) {
    const index = Math.floor(Math.random() * array.length);
    return array.splice(index, 1)[0];
  }

  const animateTeamTo = async (targetRef: React.RefObject<HTMLDivElement>) => {
    // We do nothing! The wrapped setter does the work!
  };


function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

  async function lolo() {
    if (franco.length === 0 && gaston.length === 0 && marcos.length === 0 && roma.length === 0)
      return;

    setBaraja(true);

  // 🔹 Definimos los 3 posibles arreglos
  const allSteps = [ steps_two, steps_three];

  // 🔹 Elegimos uno al azar
  const randomIndex = Math.floor(Math.random() * allSteps.length);
  const chosenSteps = allSteps[randomIndex];

  console.log(`🎲 Se eligió el set de pasos #${randomIndex + 1}`);

  // 🔹 Ejecutamos los pasos
  for (const step of chosenSteps) {
    step();
    await delay(500);
  }
  }


  return (
    <>
      <div className={`${styles.containerAll} relative font-geistRegular overflow-hidden`}>
        <Particles
          quantityDesktop={350}
          quantityMobile={100}
          ease={80}
          color={"#F7FF9B"}
          refresh
        />
        {/* Cuadrado blanco con los 32 equipos restantes */}
        <div ref={pileRef} className={`absolute bg-white left-1/2 -translate-x-1/2 z-30 top-[30%] -translate-y-1/2 w-[340px] sm:w-[400px] h-[260px] sm:h-[300px] p-5 flex flex-wrap justify-center content-center gap-2 sm:gap-3 rounded-xl shadow-2xl transition-opacity duration-500 ${remainingTeams.length > 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          {remainingTeams.map((team: any, idx: number) => (
            <div key={`${team.nombre}-${idx}`} className="w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center transition-all duration-300">
              {team.escudo && <Image src={team.escudo} alt={team.nombre} width={40} height={40} className="object-contain" />}
            </div>
          ))}
        </div>

        <div className={styles.containerBraket}>
          <div style={{ marginTop: "7px" }} ref={A1Ref} onClick={() => setA3(A1)}>
            {A1?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={A1?.escudo} alt={A1?.nombre} />
            )}
            <span className={styles.number_rank}>{A1 && A1.rank}</span>
          </div>
          <div ref={A2Ref} onClick={() => setA3(A2)}>
            {A2?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={A2?.escudo} alt={A2?.nombre} />
            )}
            <span className={styles.number_rank}>{A2 && A2.rank}</span>
          </div>
          <div ref={B1Ref} onClick={() => setB3(B1)}>
            {B1?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={B1?.escudo} alt={B1?.nombre} />
            )}
            <span className={styles.number_rank}>{B1 && B1.rank}</span>
          </div>

          <div ref={B2Ref} onClick={() => setB3(B2)}>
            {B2?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={B2?.escudo} alt={B2?.nombre} />
            )}
            <span className={styles.number_rank}>{B2 && B2.rank}</span>
          </div>

          <div ref={C1Ref} onClick={() => setC3(C1)}>
            {C1?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={C1?.escudo} alt={C1?.nombre} />
            )}
            <span className={styles.number_rank}>{C1 && C1.rank}</span>
          </div>

          <div ref={C2Ref} onClick={() => setC3(C2)}>
            {C2?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={C2?.escudo} alt={C2?.nombre} />
            )}
            <span className={styles.number_rank}>{C2 && C2.rank}</span>
          </div>

          <div ref={D1Ref} onClick={() => setD3(D1)}>
            {D1?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={D1?.escudo} alt={D1?.nombre} />
            )}
            <span className={styles.number_rank}>{D1 && D1.rank}</span>
          </div>

          <div ref={D2Ref} onClick={() => setD3(D2)} style={{ marginBottom: "18px" }}>
            {D2?.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={D2?.escudo} alt={D2?.nombre} />
            )}
            <span className={styles.number_rank}>{D2 && D2.rank}</span>
          </div>

          <div ref={E1Ref} onClick={() => setE3(E1)}>
            {E1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={E1?.escudo} alt={E1?.nombre} />
            )}
            <span className={styles.number_rank}>{E1 && E1.rank}</span>
          </div>

          <div ref={E2Ref} onClick={() => setE3(E2)}>
            {E2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={E2?.escudo} alt={E2?.nombre} />
            )}
            <span className={styles.number_rank}>{E2 && E2.rank}</span>
          </div>

          <div ref={F1Ref} onClick={() => setF3(F1)}>
            {F1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={F1?.escudo} alt={F1?.nombre} />
            )}
            <span className={styles.number_rank}>{F1 && F1.rank}</span>
          </div>

          <div ref={F2Ref} onClick={() => setF3(F2)}>
            {F2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={F2?.escudo} alt={F2?.nombre} />
            )}
            <span className={styles.number_rank}>{F2 && F2.rank}</span>
          </div>

          <div ref={G1Ref} onClick={() => setG3(G1)}>
            {G1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={G1?.escudo} alt={G1?.nombre} />
            )}
            <span className={styles.number_rank}>{G1 && G1.rank}</span>
          </div>

          <div ref={G2Ref} onClick={() => setG3(G2)}>
            {G2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={G2?.escudo} alt={G2?.nombre} />
            )}
            <span className={styles.number_rank}>{G2 && G2.rank}</span>
          </div>

          <div ref={H1Ref} onClick={() => setH3(H1)}>
            {H1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={H1?.escudo} alt={H1?.nombre} />
            )}
            <span className={styles.number_rank}>{H1 && H1.rank}</span>
          </div>

          <div ref={H2Ref} onClick={() => setH3(H2)}>
            {H2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={H2?.escudo} alt={H2?.nombre} />
            )}
            <span className={styles.number_rank}>{H2 && H2.rank}</span>
          </div>
        </div>
        <div className={styles.diome}>
          <div className={styles.octavosLeft}>
            <div onClick={() => setA4(A3)} style={{ marginTop: "50px" }}>
              {A3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={A3?.escudo} alt={A3?.nombre} />
              )}
              <span className={styles.number_rank}>{A3 && A3.rank}</span>
            </div>

            <div onClick={() => setA4(B3)}>
              {B3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={B3?.escudo} alt={B3?.nombre} />
              )}
              <span className={styles.number_rank}>{B3 && B3.rank}</span>
            </div>

            <div onClick={() => setB4(C3)}>
              {C3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={C3?.escudo} alt={C3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setB4(D3)} style={{ marginBottom: "100px" }}>
              {D3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={D3?.escudo} alt={D3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setC4(E3)}>
              {E3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={E3?.escudo} alt={E3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setC4(F3)}>
              {F3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={F3?.escudo} alt={F3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setD4(G3)}>
              {G3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={G3?.escudo} alt={G3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setD4(H3)}>
              {H3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={H3?.escudo} alt={H3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.cuartosLeft}>
            <div onClick={() => setA5(A4)} style={{ marginTop: "150px" }}>
              {A4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={A4?.escudo} alt={A4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setA5(B4)} style={{ marginBottom: "280px" }}>
              {B4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={B4?.escudo} alt={B4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setB5(C4)}>
              {C4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={C4?.escudo} alt={C4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setB5(D4)}>
              {D4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={D4?.escudo} alt={D4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.semifinalesLeft}>
            <div
              onClick={() => setA6(A5)}
              style={{ marginTop: "190px", marginBottom: "380px" }}
            >
              {A5?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={A5?.escudo} alt={A5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setA6(B5)}>
              {B5?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={B5?.escudo} alt={B5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.FianalsLeft}>
            <div onClick={() => setA7(A6)}>
              {A6?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={A6?.escudo} alt={A6?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>

          <div className={styles.arooba}>
            <div className={`${styles.top} gap-4`}>
              <button
                onClick={() => lolo()}
                disabled={baraja}
                className="w-[120px] xl:w-[160px] h-[60px] relative bg-[#313133] text-white rounded-[8px] font-geistRegular overflow-hidden group"
              >
                <span className="relative z-10">DRAFT</span>
                <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
              </button>

              <button
                onClick={() => clean()}
                className="w-[120px] xl:w-[160px] h-[60px] relative bg-[#313133] text-white rounded-[8px] font-geistRegular overflow-hidden group"
              >
                <span className="relative z-10">CLEAN</span>
                <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
              </button>

              <button
                onClick={() => setShowTeamsPopup(true)}
                className="w-[120px] xl:w-[160px] h-[60px] relative bg-[#313133] text-white rounded-[8px] font-geistRegular overflow-hidden group"
              >
                <span className="relative z-10">TEAMS</span>
                <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
              </button>
            </div>

            <div className={styles.bot}>
              <div className={styles.champions}>
                <span>CHAMPIONS</span>
              </div>
              <div className={styles.championsPicture}>
                <div className={styles.championsProfile}>
                  <div className={styles.izq}>
                    {A7?.nombre && (
                      <Image
                        width={43} height={43}
                        src={A7?.escudo}
                        alt={A7?.nombre}
                      />
                    )}
                    <span className={`${styles.number_rank}`}>{A1 && A1.rank}</span>
                  </div>

                  <div className={styles.der}>
                    {A7?.nombre && <span>{A7?.nombre}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.FianalsLeft}>
            <div onClick={() => setA7(I6)}>
              {I6?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={I6?.escudo} alt={I6?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.semifinalesLeft}>
            <div
              onClick={() => setI6(I5)}
              style={{ marginTop: "190px", marginBottom: "380px" }}
            >
              {I5?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={I5?.escudo} alt={I5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setI6(J5)}>
              {J5?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={J5?.escudo} alt={J5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.cuartosLeft}>
            <div onClick={() => setI5(I4)} style={{ marginTop: "150px" }}>
              {I4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={I4?.escudo} alt={I4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setI5(J4)} style={{ marginBottom: "280px" }}>
              {J4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={J4?.escudo} alt={J4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ5(K4)}>
              {K4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={K4?.escudo} alt={K4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ5(L4)}>
              {L4?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={L4?.escudo} alt={L4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.octavosLeft}>
            <div onClick={() => setI4(I3)} style={{ marginTop: "50px" }}>
              {I3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={I3?.escudo} alt={I3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setI4(J3)}>
              {J3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={J3?.escudo} alt={J3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ4(K3)}>
              {K3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={K3?.escudo} alt={K3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ4(L3)} style={{ marginBottom: "100px" }}>
              {L3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={L3?.escudo} alt={L3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setK4(M3)}>
              {M3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={M3?.escudo} alt={M3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setK4(N3)}>
              {N3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={N3?.escudo} alt={N3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setL4(O3)}>
              {O3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={O3?.escudo} alt={O3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setL4(P3)}>
              {P3?.nombre && (
                <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={P3?.escudo} alt={P3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
        </div>
        <div className={styles.containerBraket}>
          <div ref={I1Ref} onClick={() => setI3(I1)} style={{ marginTop: "7px" }}>
            {I1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={I1?.escudo} alt={I1?.nombre} />
            )}
            <span className={styles.number_rank}>{I1 && I1.rank}</span>
          </div>
          <div ref={I2Ref} onClick={() => setI3(I2)}>
            {I2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={I2?.escudo} alt={I2?.nombre} />
            )}
            <span className={styles.number_rank}>{I2 && I2.rank}</span>
          </div>
          <div ref={J1Ref} onClick={() => setJ3(J1)}>
            {J1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={J1?.escudo} alt={J1?.nombre} />
            )}
            <span className={styles.number_rank}>{J1 && J1.rank}</span>
          </div>
          <div ref={J2Ref} onClick={() => setJ3(J2)}>
            {J2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={J2?.escudo} alt={J2?.nombre} />
            )}
            <span className={styles.number_rank}>{J2 && J2.rank}</span>
          </div>
          <div ref={K1Ref} onClick={() => setK3(K1)}>
            {K1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={K1?.escudo} alt={K1?.nombre} />
            )}
            <span className={styles.number_rank}>{K1 && K1.rank}</span>
          </div>
          <div ref={K2Ref} onClick={() => setK3(K2)}>
            {K2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={K2?.escudo} alt={K2?.nombre} />
            )}
            <span className={styles.number_rank}>{K2 && K2.rank}</span>
          </div>
          <div ref={L1Ref} onClick={() => setL3(L1)}>
            {L1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={L1?.escudo} alt={L1?.nombre} />
            )}
            <span className={styles.number_rank}>{L1 && L1.rank}</span>
          </div>
          <div ref={L2Ref} onClick={() => setL3(L2)} style={{ marginBottom: "18px" }}>
            {L2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={L2?.escudo} alt={L2?.nombre} />
            )}
            <span className={styles.number_rank}>{L2 && L2.rank}</span>
          </div>
          <div ref={M1Ref} onClick={() => setM3(M1)}>
            {M1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={M1?.escudo} alt={M1?.nombre} />
            )}
            <span className={styles.number_rank}>{M1 && M1.rank}</span>
          </div>
          <div ref={M2Ref} onClick={() => setM3(M2)}>
            {M2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={M2?.escudo} alt={M2?.nombre} />
            )}
            <span className={styles.number_rank}>{M2 && M2.rank}</span>
          </div>
          <div ref={N1Ref} onClick={() => setN3(N1)}>
            {N1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={N1?.escudo} alt={N1?.nombre} />
            )}
            <span className={styles.number_rank}>{N1 && N1.rank}</span>
          </div>
          <div ref={N2Ref} onClick={() => setN3(N2)}>
            {N2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={N2?.escudo} alt={N2?.nombre} />
            )}
            <span className={styles.number_rank}>{N2 && N2.rank}</span>
          </div>
          <div ref={O1Ref} onClick={() => setO3(O1)}>
            {O1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={O1?.escudo} alt={O1?.nombre} />
            )}
            <span className={styles.number_rank}>{O1 && O1.rank}</span>
          </div>
          <div ref={O2Ref} onClick={() => setO3(O2)}>
            {O2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={O2?.escudo} alt={O2?.nombre} />
            )}
            <span className={styles.number_rank}>{O2 && O2.rank}</span>
          </div>
          <div ref={P1Ref} onClick={() => setP3(P1)}>
            {P1.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={P1?.escudo} alt={P1?.nombre} />
            )}
            <span className={styles.number_rank}>{P1 && P1.rank}</span>
          </div>
          <div ref={P2Ref} onClick={() => setP3(P2)}>
            {P2.nombre && (
              <Image width={43} height={43} placeholder="blur" blurDataURL="/images/blur-block.png" loading="lazy" src={P2?.escudo} alt={P2?.nombre} />
            )}
            <span className={styles.number_rank}>{P2 && P2.rank}</span>
          </div>
        </div>
      </div>

      {showTeamsPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setShowTeamsPopup(false)}>
          <div className="bg-[#18181a] p-6 lg:p-8 rounded-xl w-[95%] max-w-6xl max-h-[90vh] overflow-y-auto text-white shadow-2xl border border-[#313133]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-geistBold text-fontTitle">Assigned Teams</h2>
              <button onClick={() => setShowTeamsPopup(false)} className="text-gray-400 hover:text-white transition p-1 bg-[#313133] rounded-full hover:bg-[#3f3f46]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 font-geistRegular">
              {Object.entries(initialTeams).map(([player, teams]: [string, any]) => (
                <div key={player} className="bg-[#2a2a2d] rounded-lg overflow-hidden flex flex-col shadow-lg border border-[#313133]">
                  <div className="p-4 bg-[#232325] flex justify-between items-center border-b border-[#3f3f46]">
                    <h3 className="capitalize font-geistBold text-lg">{player === 'roma' ? 'Rodrigo' : player}</h3>
                    <span className="font-geistBold text-sm text-gray-400">
                      {teams.reduce((acc: number, t: any) => acc + parseInt(t.rank.replace('#', '') || '0', 10), 0)}
                    </span>
                  </div>
                  <div className="p-2 flex flex-col gap-1 h-full">
                    {teams.map((team: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-2 hover:bg-[#313133] rounded transition group">
                        <span className="w-8 font-bold text-gray-500 text-sm group-hover:text-gray-300 transition">{team.rank}</span>
                        <div className="min-w-[32px] min-h-[32px] flex justify-center items-center">
                          {team.escudo && <Image src={team.escudo} alt={team.nombre} width={32} height={32} className="object-contain" />}
                        </div>
                        <span className="text-sm font-semibold flex-1 truncate group-hover:text-white transition">{team.nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Draft;

// async function lolo() {
//   if (franco.length === 0 && gaston.length === 0 && marcos.length === 0 && roma.length === 0)
//     return;
//   setBaraja(true);

//   const steps = [
//     () => {
//       const val = getRandomAndSplice(roma);
//       setA1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setA2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setB1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setB2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setC1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setC2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setD1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setD2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setE1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setE2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setF1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setF2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setG1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setG2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setH1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setH2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setI1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setI2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setJ1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setJ2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setK1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setK2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setL1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setL2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setM1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setM2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setN1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setN2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(roma);
//       setO1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(gaston);
//       setO2(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(marcos);
//       setP1(val);
//       setTestTeam(val);
//     },
//     () => {
//       const val = getRandomAndSplice(franco);
//       setP2(val);
//       setTestTeam(val);
//     },
//     () => setBaraja(false)
//   ];
//   for (let step of steps) {
//     step();
//     await delay(1200); // ajustá el tiempo que quieras (en milisegundos)
//   }
// }