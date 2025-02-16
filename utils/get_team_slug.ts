import { data, History, stats_franco, stats_gaston, stats_marcos } from " @/models/db";
import { Match, Rank } from " @/types/types";

export const find_team_slug = async (params: string) => {
  console.log(params, "params");
  
  const AllTeams: Array<Rank> | [] = data.ranking;
  const Finals: Array<Match> | [] = History.Games;

  const teamID = await AllTeams.find(
    (e) => e.name.toLowerCase() === decodeURI(params.toLowerCase())
  );
  if (teamID) {
    const finales = await Finals.filter(
      (e) => teamID.name === e.LocalNombre || teamID.name === e.VisitanteNombre
    );

    let golesFavor = 0;
    let golesRecibidos = 0;
  
    finales?.forEach((match) => {
      if (
        match.LocalNombre.toLocaleLowerCase() ===
        decodeURI(params.toLowerCase())
      ) {
        golesFavor += match.LocalResultado;
        golesRecibidos += match.VisitanteResultado;
      } else if (
        match.VisitanteNombre.toLocaleLowerCase() ===
        decodeURI(params.toLowerCase())
      ) {
        golesFavor += match.VisitanteResultado;
        golesRecibidos += match.LocalResultado;
      }
    });


    const titles = teamID.titles;
    const finalsLength = finales?.length || 0;
    const get_porcent = (100 / (titles + (finalsLength - titles))) * titles;
    const por =  !isNaN(get_porcent) ? Math.round(get_porcent) + "%" : "0%"

    return { 
        teamID, 
        finales,
        titles,
        finalsLength,
        por,
        golesFavor,
        golesRecibidos
    }

  } else {
    return
    //not found
  }
};


export const find_user_slug = async (params : string) => {
 
 
  const dbMap: Record<string, any> = {
    franco: stats_franco,
    gaston: stats_gaston,
    marcos: stats_marcos,
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

  return {playerStats,
    golesFavorFinals,
    sumarGolesVisitanteFinals,
    golesFavorClasics,
    sumarGolesVisitanteClasics
  }


}