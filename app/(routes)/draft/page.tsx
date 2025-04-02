"use client";
import { useState } from "react";
import styles from "./draft.module.css";
import { useMyContext } from " @/context/ListContext";

const Draft = () => {
    const {  FrancoCopy,  MarcosCopy, GastonCopy, RomaCopy } =
    useMyContext();

  let franco: any | [] = FrancoCopy;
  let gaston: any | [] = GastonCopy;
  let marcos: any | [] = MarcosCopy;
  let roma: any | [] = RomaCopy;


  let base = {
    nombre: "",
    escudo: "",
    rank: "",
  };

  const [A1, setA1] = useState(base);
  const [A2, setA2] = useState(base);
  const [B1, setB1] = useState(base);
  const [B2, setB2] = useState(base);
  const [C1, setC1] = useState(base);
  const [C2, setC2] = useState(base);
  const [D1, setD1] = useState(base);
  const [D2, setD2] = useState(base);
  const [E1, setE1] = useState(base);
  const [E2, setE2] = useState(base);
  const [F1, setF1] = useState(base);
  const [F2, setF2] = useState(base);
  const [G1, setG1] = useState(base);
  const [G2, setG2] = useState(base);
  const [H1, setH1] = useState(base);
  const [H2, setH2] = useState(base);

  const [I1, setI1] = useState(base);
  const [I2, setI2] = useState(base);
  const [J1, setJ1] = useState(base);
  const [J2, setJ2] = useState(base);
  const [K1, setK1] = useState(base);
  const [K2, setK2] = useState(base);
  const [L1, setL1] = useState(base);
  const [L2, setL2] = useState(base);
  const [M1, setM1] = useState(base);
  const [M2, setM2] = useState(base);
  const [N1, setN1] = useState(base);
  const [N2, setN2] = useState(base);
  const [O1, setO1] = useState(base);
  const [O2, setO2] = useState(base);
  const [P1, setP1] = useState(base);
  const [P2, setP2] = useState(base);

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

  function lolo() {
    if (franco.length === 0 && gaston.length === 0 && marcos.length === 0 && roma.length === 0)
      return;
  
      let indiceAleatorio = Math.floor(Math.random() * roma.length);
      let equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setA1(equipoAleatorio);
       indiceAleatorio = Math.floor(Math.random() * marcos.length);
       equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setA2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setB1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setB2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setC1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setC2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setD1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setD2(equipoAleatorio);

      
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setE1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setE2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setF1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setF2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setG1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setG2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setH1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setH2(equipoAleatorio);

      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setI1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setI2(equipoAleatorio);   
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setJ1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setJ2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setK1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setK2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setL1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setL2(equipoAleatorio);

      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setM1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setM2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setN1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setN2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * roma.length);
      equipoAleatorio = roma.splice(indiceAleatorio, 1)[0];
      setO1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * gaston.length);
      equipoAleatorio = gaston.splice(indiceAleatorio, 1)[0];
      setO2(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * marcos.length);
      equipoAleatorio = marcos.splice(indiceAleatorio, 1)[0];
      setP1(equipoAleatorio);
      indiceAleatorio = Math.floor(Math.random() * franco.length);
      equipoAleatorio = franco.splice(indiceAleatorio, 1)[0];
      setP2(equipoAleatorio);
   
  }
  
  return (
    <>
      <div className={`${styles.containerAll} font-geistRegular overflow-hidden` }>
        <div className={styles.containerBraket}>
          <div style={{ marginTop: "7px" }} onClick={() => setA3(A1)}>
            {A1?.nombre && (
              <img className={styles.img} src={A1?.escudo} alt={A1?.nombre} />
            )}
            <span className={styles.number_rank}>{A1 && A1.rank}</span>
          </div>
          <div onClick={() => setA3(A2)}>
            {A2?.nombre && (
              <img className={styles.img} src={A2?.escudo} alt={A2?.nombre} />
            )}
            <span className={styles.number_rank}>{A2 && A2.rank}</span>
          </div>
          <div onClick={() => setB3(B1)}>
            {B1?.nombre && (
              <img className={styles.img} src={B1?.escudo} alt={B1?.nombre} />
            )}
            <span className={styles.number_rank}>{B1 && B1.rank}</span>
          </div>

          <div onClick={() => setB3(B2)}>
            {B2?.nombre && (
              <img className={styles.img} src={B2?.escudo} alt={B2?.nombre} />
            )}
            <span className={styles.number_rank}>{B2 && B2.rank}</span>
          </div>

          <div onClick={() => setC3(C1)}>
            {C1?.nombre && (
              <img className={styles.img} src={C1?.escudo} alt={C1?.nombre} />
            )}
            <span className={styles.number_rank}>{C1 && C1.rank}</span>
          </div>

          <div onClick={() => setC3(C2)}>
            {C2?.nombre && (
              <img className={styles.img} src={C2?.escudo} alt={C2?.nombre} />
            )}
            <span className={styles.number_rank}>{C2 && C2.rank}</span>
          </div>

          <div onClick={() => setD3(D1)}>
            {D1?.nombre && (
              <img className={styles.img} src={D1?.escudo} alt={D1?.nombre} />
            )}
            <span className={styles.number_rank}>{D1 && D1.rank}</span>
          </div>

          <div onClick={() => setD3(D2)} style={{ marginBottom: "18px" }}>
            {D2?.nombre && (
              <img className={styles.img} src={D2?.escudo} alt={D2?.nombre} />
            )}
            <span className={styles.number_rank}>{D2 && D2.rank}</span>
          </div>

          <div onClick={() => setE3(E1)}>
            {E1.nombre && (
              <img className={styles.img} src={E1?.escudo} alt={E1?.nombre} />
            )}
            <span className={styles.number_rank}>{E1 && E1.rank}</span>
          </div>

          <div onClick={() => setE3(E2)}>
            {E2.nombre && (
              <img className={styles.img} src={E2?.escudo} alt={E2?.nombre} />
            )}
            <span className={styles.number_rank}>{E2 && E2.rank}</span>
          </div>

          <div onClick={() => setF3(F1)}>
            {F1.nombre && (
              <img className={styles.img} src={F1?.escudo} alt={F1?.nombre} />
            )}
            <span className={styles.number_rank}>{F1 && F1.rank}</span>
          </div>

          <div onClick={() => setF3(F2)}>
            {F2.nombre && (
              <img className={styles.img} src={F2?.escudo} alt={F2?.nombre} />
            )}
            <span className={styles.number_rank}>{F2 && F2.rank}</span>
          </div>

          <div onClick={() => setG3(G1)}>
            {G1.nombre && (
              <img className={styles.img} src={G1?.escudo} alt={G1?.nombre} />
            )}
            <span className={styles.number_rank}>{G1 && G1.rank}</span>
          </div>

          <div onClick={() => setG3(G2)}>
            {G2.nombre && (
              <img className={styles.img} src={G2?.escudo} alt={G2?.nombre} />
            )}
            <span className={styles.number_rank}>{G2 && G2.rank}</span>
          </div>

          <div onClick={() => setH3(H1)}>
            {H1.nombre && (
              <img className={styles.img} src={H1?.escudo} alt={H1?.nombre} />
            )}
            <span className={styles.number_rank}>{H1 && H1.rank}</span>
          </div>

          <div onClick={() => setH3(H2)}>
            {H2.nombre && (
              <img className={styles.img} src={H2?.escudo} alt={H2?.nombre} />
            )}
            <span className={styles.number_rank}>{H2 && H2.rank}</span>
          </div>
        </div>
        <div className={styles.diome}>
          <div className={styles.octavosLeft}>
            <div onClick={() => setA4(A3)} style={{ marginTop: "50px" }}>
              {A3?.nombre && (
                <img className={styles.img} src={A3?.escudo} alt={A3?.nombre} />
              )}
              <span className={styles.number_rank}>{A3 && A3.rank}</span>
            </div>

            <div onClick={() => setA4(B3)}>
              {B3?.nombre && (
                <img className={styles.img} src={B3?.escudo} alt={B3?.nombre} />
              )}
              <span className={styles.number_rank}>{B3 && B3.rank}</span>
            </div>

            <div onClick={() => setB4(C3)}>
              {C3?.nombre && (
                <img className={styles.img} src={C3?.escudo} alt={C3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setB4(D3)} style={{ marginBottom: "100px" }}>
              {D3?.nombre && (
                <img className={styles.img} src={D3?.escudo} alt={D3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setC4(E3)}>
              {E3?.nombre && (
                <img className={styles.img} src={E3?.escudo} alt={E3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setC4(F3)}>
              {F3?.nombre && (
                <img className={styles.img} src={F3?.escudo} alt={F3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setD4(G3)}>
              {G3?.nombre && (
                <img className={styles.img} src={G3?.escudo} alt={G3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setD4(H3)}>
              {H3?.nombre && (
                <img className={styles.img} src={H3?.escudo} alt={H3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.cuartosLeft}>
            <div onClick={() => setA5(A4)} style={{ marginTop: "150px" }}>
              {A4?.nombre && (
                <img className={styles.img} src={A4?.escudo} alt={A4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setA5(B4)} style={{ marginBottom: "280px" }}>
              {B4?.nombre && (
                <img className={styles.img} src={B4?.escudo} alt={B4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setB5(C4)}>
              {C4?.nombre && (
                <img className={styles.img} src={C4?.escudo} alt={C4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setB5(D4)}>
              {D4?.nombre && (
                <img className={styles.img} src={D4?.escudo} alt={D4?.nombre} />
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
                <img className={styles.img} src={A5?.escudo} alt={A5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>

            <div onClick={() => setA6(B5)}>
              {B5?.nombre && (
                <img className={styles.img} src={B5?.escudo} alt={B5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.FianalsLeft}>
            <div onClick={() => setA7(A6)}>
              {A6?.nombre && (
                <img className={styles.img} src={A6?.escudo} alt={A6?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>

          <div className={styles.arooba}>
            <div className={`${styles.top} gap-4`}>
              <button
                onClick={() => lolo()}
                className="w-[160px] h-[60px] relative bg-bgPrimary text-white rounded-[8px] font-geistRegular overflow-hidden group"
              >
                <span className="relative z-10">DRAFT</span>
                <div className="absolute inset-0 bg-hoverCard translate-x-[-100%] transition-transform duration-80 ease-out group-hover:translate-x-0"></div>
              </button>

              <button
                onClick={() => clean()}
                className="w-[160px] h-[60px] relative bg-bgPrimary text-white rounded-[8px] font-geistRegular overflow-hidden group"
              >
                <span className="relative z-10">CLEAN</span>
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
                      <img
                        className={styles.img}
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
                <img className={styles.img} src={I6?.escudo} alt={I6?.nombre} />
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
                <img className={styles.img} src={I5?.escudo} alt={I5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setI6(J5)}>
              {J5?.nombre && (
                <img className={styles.img} src={J5?.escudo} alt={J5?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.cuartosLeft}>
            <div onClick={() => setI5(I4)} style={{ marginTop: "150px" }}>
              {I4?.nombre && (
                <img className={styles.img} src={I4?.escudo} alt={I4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setI5(J4)} style={{ marginBottom: "280px" }}>
              {J4?.nombre && (
                <img className={styles.img} src={J4?.escudo} alt={J4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ5(K4)}>
              {K4?.nombre && (
                <img className={styles.img} src={K4?.escudo} alt={K4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ5(L4)}>
              {L4?.nombre && (
                <img className={styles.img} src={L4?.escudo} alt={L4?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
          <div className={styles.octavosLeft}>
            <div onClick={() => setI4(I3)} style={{ marginTop: "50px" }}>
              {I3?.nombre && (
                <img className={styles.img} src={I3?.escudo} alt={I3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setI4(J3)}>
              {J3?.nombre && (
                <img className={styles.img} src={J3?.escudo} alt={J3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ4(K3)}>
              {K3?.nombre && (
                <img className={styles.img} src={K3?.escudo} alt={K3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setJ4(L3)} style={{ marginBottom: "100px" }}>
              {L3?.nombre && (
                <img className={styles.img} src={L3?.escudo} alt={L3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setK4(M3)}>
              {M3?.nombre && (
                <img className={styles.img} src={M3?.escudo} alt={M3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setK4(N3)}>
              {N3?.nombre && (
                <img className={styles.img} src={N3?.escudo} alt={N3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setL4(O3)}>
              {O3?.nombre && (
                <img className={styles.img} src={O3?.escudo} alt={O3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
            <div onClick={() => setL4(P3)}>
              {P3?.nombre && (
                <img className={styles.img} src={P3?.escudo} alt={P3?.nombre} />
              )}
              <span className={styles.number_rank}>{A1 && A1.rank}</span>
            </div>
          </div>
        </div>
        <div className={styles.containerBraket}>
          <div onClick={() => setI3(I1)} style={{ marginTop: "7px" }}>
            {I1.nombre && (
              <img className={styles.img} src={I1?.escudo} alt={I1?.nombre} />
            )}
            <span className={styles.number_rank}>{I1 && I1.rank}</span>
          </div>
          <div onClick={() => setI3(I2)}>
            {I2.nombre && (
              <img className={styles.img} src={I2?.escudo} alt={I2?.nombre} />
            )}
            <span className={styles.number_rank}>{I2 && I2.rank}</span>
          </div>
          <div onClick={() => setJ3(J1)}>
            {J1.nombre && (
              <img className={styles.img} src={J1?.escudo} alt={J1?.nombre} />
            )}
            <span className={styles.number_rank}>{J1 && J1.rank}</span>
          </div>
          <div onClick={() => setJ3(J2)}>
            {J2.nombre && (
              <img className={styles.img} src={J2?.escudo} alt={J2?.nombre} />
            )}
            <span className={styles.number_rank}>{J2 && J2.rank}</span>
          </div>
          <div onClick={() => setK3(K1)}>
            {K1.nombre && (
              <img className={styles.img} src={K1?.escudo} alt={K1?.nombre} />
            )}
            <span className={styles.number_rank}>{K1 && K1.rank}</span>
          </div>
          <div onClick={() => setK3(K2)}>
            {K2.nombre && (
              <img className={styles.img} src={K2?.escudo} alt={K2?.nombre} />
            )}
            <span className={styles.number_rank}>{K2 && K2.rank}</span>
          </div>
          <div onClick={() => setL3(L1)}>
            {L1.nombre && (
              <img className={styles.img} src={L1?.escudo} alt={L1?.nombre} />
            )}
            <span className={styles.number_rank}>{L1 && L1.rank}</span>
          </div>
          <div onClick={() => setL3(L2)} style={{ marginBottom: "18px" }}>
            {L2.nombre && (
              <img className={styles.img} src={L2?.escudo} alt={L2?.nombre} />
            )}
            <span className={styles.number_rank}>{L2 && L2.rank}</span>
          </div>
          <div onClick={() => setM3(M1)}>
            {M1.nombre && (
              <img className={styles.img} src={M1?.escudo} alt={M1?.nombre} />
            )}
            <span className={styles.number_rank}>{M1 && M1.rank}</span>
          </div>
          <div onClick={() => setM3(M2)}>
            {M2.nombre && (
              <img className={styles.img} src={M2?.escudo} alt={M2?.nombre} />
            )}
            <span className={styles.number_rank}>{M2 && M2.rank}</span>
          </div>
          <div onClick={() => setN3(N1)}>
            {N1.nombre && (
              <img className={styles.img} src={N1?.escudo} alt={N1?.nombre} />
            )}
            <span className={styles.number_rank}>{N1 && N1.rank}</span>
          </div>
          <div onClick={() => setN3(N2)}>
            {N2.nombre && (
              <img className={styles.img} src={N2?.escudo} alt={N2?.nombre} />
            )}
            <span className={styles.number_rank}>{N2 && N2.rank}</span>
          </div>
          <div onClick={() => setO3(O1)}>
            {O1.nombre && (
              <img className={styles.img} src={O1?.escudo} alt={O1?.nombre} />
            )}
            <span className={styles.number_rank}>{O1 && O1.rank}</span>
          </div>
          <div onClick={() => setO3(O2)}>
            {O2.nombre && (
              <img className={styles.img} src={O2?.escudo} alt={O2?.nombre} />
            )}
            <span className={styles.number_rank}>{O2 && O2.rank}</span>
          </div>
          <div onClick={() => setP3(P1)}>
            {P1.nombre && (
              <img className={styles.img} src={P1?.escudo} alt={P1?.nombre} />
            )}
            <span className={styles.number_rank}>{P1 && P1.rank}</span>
          </div>
          <div onClick={() => setP3(P2)}>
            {P2.nombre && (
              <img className={styles.img} src={P2?.escudo} alt={P2?.nombre} />
            )}
            <span className={styles.number_rank}>{P2 && P2.rank}</span>
          </div>
        </div>
      </div>
      <div />
    </>
  );
};

export default Draft;
