import { ExecuteSmoke } from "./ExecuteSmoke"

export class aExecuteSmokes {
    static smokes: ExecuteSmoke[] = [
        //Mirage
        { map: "Mirage", team: "T", jumpthrow: false, description: "a stairs", imageUrl: "maps/Mirage/T_false_a-stairs_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "a ct spawn", imageUrl: "maps/Mirage/T_true_a-ct-spawn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "a jungle", imageUrl: "maps/Mirage/T_false_a-jungle_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },

        //Inferno
        { map: "Inferno", team: "T", jumpthrow: true, description: "a pit", imageUrl: "maps/Inferno/T_true_a-pit_1.jpg" },
        { map: "Inferno", team: "CT", jumpthrow: false, description: "a balc", imageUrl: "maps/Inferno/CT_false_a-balc_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: true, description: "a lib", imageUrl: "maps/Inferno/T_true_a-lib_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "left top mid", imageUrl: "maps/Inferno/T_flase_left-top-mid_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: true, description: "a heaven", imageUrl: "maps/Anubis/T_true_a-heaven_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "a con", imageUrl: "maps/Anubis/T_true_a-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "a stair", imageUrl: "maps/Anubis/T_false_a-stair_1.jpg" },
        

        //Ancient
        { map: "Ancient", team: "T", jumpthrow: true, description: "a temple", imageUrl: "maps/Ancient/T_true_a-temple_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "a ct", imageUrl: "maps/Ancient/T_true_a-ct_1.jpg" },

        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site venstre", imageUrl: "maps/Vertigo/T_false_a-site-venstre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site kort", imageUrl: "maps/Vertigo/T_false_a-site-kort_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site højre", imageUrl: "maps/Vertigo/T_false_a-site-højre_1.jpg" },
      ]
}