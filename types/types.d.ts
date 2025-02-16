export interface Team { 
    nombre: string
    escudo: any
    rank: string
}

export interface Match {
    Player1: string;
    Player2: string;
    isLegit?: string;
    LocalEscudo: string;
    LocalNombre: string;
    LocalSlug?: string;
    LocalResultado: number;
    LocalPenalty?: number;
    VisitanteEscudo: string;
    VisitanteNombre: string;
    VisitanteSlug?: string;
    VisitanteResultado: number;
    VisitantePenalty?: number;
    Result?: string;
    Penalty: boolean;
    Raiz?: string;
  }
  
export interface Info {
  photo_profile: string;
  background_profile: string;
  rank_profile: string;
  shield_profile: string;
  background_blur_profile: string;
  photo_blur_profile: string;
  name_profile: string; 
  surname_profile: string;
  team_profile: string; 
  team_id: string;
  trophies: number;
}


  export interface MatchStats {
    win: number;
    loss: number;
    draw?: number;
    porcent: string;
  }
  
  export interface Person { 
    info : Info;
    finals: { 
      matchs: Match[];
      stats: MatchStats;
    }
    clasics: { 
      matchs: Match[];
      stats: MatchStats;
    }
  }
  
  export interface Externals {
    Games: Match[];
    best_match: Match[];
    torneos: Match[];
  }

export interface AppState {
    gaston: Array<Team> | [];
    marcos: Array<Team> | [];
    franco: Array<Team> | [];
    francoBombo: Array<Team> | [];
    gastonBombo: Array<Team> | [];
    marcosBombo: Array<Team> | [];
  };
  
export interface Poster {
  image: string;
  alt: string;
  title: string;
  description: string;
}
export interface Rank {
  logo: string;
  cover: string;
  name: string;
  rank: number;
  titles: number;
}
export interface Data {
  poster: Array<poster>;
  new: Array<poster>;
  ranking: Array<Rank>;
}