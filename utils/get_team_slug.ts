import { data, History, stats_franco, stats_gaston, stats_marcos, stats_roma } from " @/models/db";
import { Match, Rank } from " @/types/types";

export const find_team_slug = async (params: string) => {
  const AllTeams: Array<Rank> | [] = data.ranking;
  const Finals: Array<Match> | [] = History.Games;

  const teamID = await AllTeams.find(
    (e) => e.name.toLowerCase() === decodeURI(params.toLowerCase())
  );

  if (!teamID) return;

  // 🔹 Buscar todas las finales del equipo
  const finales = Finals.filter(
    (e) => teamID.name === e.LocalNombre || teamID.name === e.VisitanteNombre
  );

  let golesFavor = 0;
  let golesRecibidos = 0;
  let penalesJugados = 0;
  let penalesGanados = 0;

  finales.forEach((match) => {
    const esLocal =
      match.LocalNombre.toLowerCase() === decodeURI(params.toLowerCase());
    const esVisitante =
      match.VisitanteNombre.toLowerCase() === decodeURI(params.toLowerCase());

    // ⚽ Goles normales
    if (esLocal) {
      golesFavor += match.LocalResultado;
      golesRecibidos += match.VisitanteResultado;
    } else if (esVisitante) {
      golesFavor += match.VisitanteResultado;
      golesRecibidos += match.LocalResultado;
    }

    // 🧤 Si hubo penales
    if (match.Penalty) {
      penalesJugados++;

      const localPenales = match.LocalPenalty ?? 0;
      const visitantePenales = match.VisitantePenalty ?? 0;

      const ganoPorPenales =
        (esLocal && localPenales > visitantePenales) ||
        (esVisitante && visitantePenales > localPenales);

      if (ganoPorPenales) penalesGanados++;
    }
  });

  // 🏆 Cálculo de títulos y porcentaje
  const titles = teamID.titles;
  const finalsLength = finales.length;
  const get_porcent = (100 / (titles + (finalsLength - titles))) * titles;
  const por = !isNaN(get_porcent) ? Math.round(get_porcent) + "%" : "0%";


  return {
    teamID,
    finales,
    titles,
    finalsLength,
    por,
    golesFavor,
    golesRecibidos,
    penalesJugados,
    penalesGanados,
  };
};


export const find_user_slug = async (params : string) => {
 
 
  const dbMap: Record<string, any> = {
    franco: stats_franco,
    gaston: stats_gaston,
    marcos: stats_marcos,
    rodrigo: stats_roma
  }
  if (!(params in dbMap)) {
    return //notfound
  }
  const playerStats: any = dbMap[params];

  const golesFavorFinals =  playerStats.finals.matchs.reduce(
      (total: number, match: any) => total + match.LocalResultado,
      0
    );
  
  const sumarGolesVisitanteFinals = playerStats.finals.matchs.reduce(
      (total: number, match: any) => total + match.VisitanteResultado,
      0
    );
  

    const golesFavorClasics =  playerStats.clasics.matchs.reduce(
      (total: number, match: any) => total + match.LocalResultado,
      0
    );
  
  const sumarGolesVisitanteClasics = playerStats.clasics.matchs.reduce(
      (total: number, match: any) => total + match.VisitanteResultado,
      0
    );

    
 // 👉 Filtrar los partidos con penales
  const partidosConPenales = playerStats.finals.matchs.filter(
    (match: any) => match.Penalty === true
  );

  // 👉 Contar cuántos partidos tuvieron penales
  const cantidadPenales = partidosConPenales.length;

  // 👉 Contar cuántos de esos penales se ganaron
  // (suponiendo que Result === "Victory" significa que el jugador ganó)
  const penalesGanados = partidosConPenales.filter(
    (match: any) => match.Result === "Victory"
  ).length;

  return {playerStats,
    golesFavorFinals,
    sumarGolesVisitanteFinals,
    golesFavorClasics,
    sumarGolesVisitanteClasics,
    cantidadPenales,
    penalesGanados
  }


}