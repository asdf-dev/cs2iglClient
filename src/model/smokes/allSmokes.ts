import { ExecuteSmoke } from "./ExecuteSmoke";

export class AllSmokes {
    static smokes: ExecuteSmoke[] = [
        //generated with pictureToJson script
        { map: "", team: "", jumpthrow: false, description: "Unassigned", imageUrl: "" }, //DO NOT REMOVE ME

        //Inferno
        { map: "Inferno", team: "T", jumpthrow: true, description: "a pit", imageUrl: "maps/Inferno/T_true_a-pit_1.jpg" },
        { map: "Inferno", team: "CT", jumpthrow: false, description: "a balc", imageUrl: "maps/Inferno/CT_false_a-balc_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: true, description: "a lib", imageUrl: "maps/Inferno/T_true_a-lib_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "left top mid", imageUrl: "maps/Inferno/T_flase_left-top-mid_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: false, description: "right top mid", imageUrl: "maps/Inferno/T_flase_right-top-mid_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: true, description: "A mini pit", imageUrl: "maps/Inferno/t_true_A-mini-pit_1.jpg" },
        { map: "Inferno", team: "T", jumpthrow: true, description: "arch", imageUrl: "maps/Inferno/T_true_arch_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B ct", imageUrl: "maps/Inferno/t_false_B-ct_1.jpg" },
        { map: "Inferno", team: "t", jumpthrow: false, description: "B coffin", imageUrl: "maps/Inferno/t_false_B-coffin_1.jpg" },

        //Anubis
        { map: "Anubis", team: "T", jumpthrow: true, description: "a heaven", imageUrl: "maps/Anubis/T_true_a-heaven_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "a con", imageUrl: "maps/Anubis/T_true_a-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "a stair", imageUrl: "maps/Anubis/T_false_a-stair_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "mid sniper nest", imageUrl: "maps/Anubis/T_true_mid-sniper-nest_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "b con", imageUrl: "maps/Anubis/T_false_b-con_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b plat", imageUrl: "maps/Anubis/T_true_b-plat_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Anubis/T_false_b-default_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b ct", imageUrl: "maps/Anubis/T_true_b-ct_1.jpg" },
        { map: "Anubis", team: "T", jumpthrow: true, description: "b water", imageUrl: "maps/Anubis/T_true_b-water_1.jpg" },

        //Mirage
        { map: "Mirage", team: "T", jumpthrow: false, description: "a stairs", imageUrl: "maps/Mirage/T_false_a-stairs_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "a ct spawn", imageUrl: "maps/Mirage/T_true_a-ct-spawn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "a jungle", imageUrl: "maps/Mirage/T_false_a-jungle_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b window", imageUrl: "maps/Mirage/T_true_b-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Mirage/T_false_b-default_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b left arch", imageUrl: "maps/Mirage/T_true_b-left-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "b door", imageUrl: "maps/Mirage/T_true_b-door_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "b right arch", imageUrl: "maps/Mirage/T_false_b-right-arch_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid window", imageUrl: "maps/Mirage/T_true_mid-window_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid conn", imageUrl: "maps/Mirage/T_true_mid-conn_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: true, description: "mid kort", imageUrl: "maps/Mirage/T_true_mid-kort_1.jpg" },
        { map: "Mirage", team: "T", jumpthrow: false, description: "mid cat", imageUrl: "maps/Mirage/T_false_mid-cat_1.jpg" },

        //Vertigo
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site venstre", imageUrl: "maps/Vertigo/T_false_a-site-venstre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site kort", imageUrl: "maps/Vertigo/T_false_a-site-kort_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "a site højre", imageUrl: "maps/Vertigo/T_false_a-site-højre_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "mid heaven", imageUrl: "maps/Vertigo/T_false_mid-heaven_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "b default", imageUrl: "maps/Vertigo/T_false_b-default_1.jpg" },
        { map: "Vertigo", team: "T", jumpthrow: false, description: "B kryds", imageUrl: "maps/Vertigo/T_false_B-kryds_1.jpg" },

        //Ancient
        { map: "Ancient", team: "T", jumpthrow: true, description: "a temple", imageUrl: "maps/Ancient/T_true_a-temple_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "a ct", imageUrl: "maps/Ancient/T_true_a-ct_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid donut", imageUrl: "maps/Ancient/T_true_mid-donut_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "mid ct", imageUrl: "maps/Ancient/T_true_mid-ct_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b cave", imageUrl: "maps/Ancient/T_true_b-cave_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b right", imageUrl: "maps/Ancient/T_true_b-right_1.jpg" },
        { map: "Ancient", team: "T", jumpthrow: true, description: "b left", imageUrl: "maps/Ancient/T_true_b-left_1.jpg" },

        //Nuke
        { map: "Nuke", team: "T", jumpthrow: false, description: "a heaven", imageUrl: "maps/Nuke/T_false_a-heaven_1.jpg" },
        { map: "Nuke", team: "T", jumpthrow: true, description: "yard sec", imageUrl: "maps/Nuke/T_true_yard-sec_1.jpg" },
        { map: "Nuke", team: "T", jumpthrow: true, description: "yard first", imageUrl: "maps/Nuke/T_true_yard-first_1.jpg" },
        { map: "Nuke", team: "T", jumpthrow: true, description: "garge", imageUrl: "maps/Nuke/T_true_garge_1.jpg" }
      ]
}