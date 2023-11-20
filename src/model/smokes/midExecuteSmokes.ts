import { ExecuteSmoke } from "./ExecuteSmoke";


export class midExecuteSmokes {
    static smokes: ExecuteSmoke[] = [
        //Mirage
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid conn", imageUrl: "maps/Mirage/T_true_mid-conn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid kort", imageUrl: "maps/Mirage/T_true_mid-kort_1.jpg" },

        //Inferno
        { map: "Inferno", team: "T", jumpthrow: false, description: "left top mid", imageUrl: "maps/Inferno/T_flase_left-top-mid_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "right top mid", imageUrl: "maps/Inferno/T_flase_right-top-mid_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: true, description: "mid sniper nest", imageUrl: "maps/Anubis/T_true_mid-sniper-nest_1.jpg" },

        //Ancient 
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid donut", imageUrl: "maps/Ancient/T_true_mid-donut_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid ct", imageUrl: "maps/Ancient/T_true_mid-ct_1.jpg" },
        
        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "mid heaven", imageUrl: "maps/Vertigo/T_false_mid-heaven_1.jpg" },
      ]
}