import type {JuiceDetail} from "../../juice/interface/JuiceDetail.ts";
import type {BittersDetail} from "../../bitters/interface/BittersDetail.ts";
import type {CarbonatedDetail} from "../../carbonated/interface/CarbonatedDetail.ts";
import type {DairyCreamDetail} from "../../dairy_cream/interface/DairyCreamDetail.ts";
import type {GarnishesDetail} from "../../garnishes/interface/GarnishesDetail.ts";
import type {SyrupDetail} from "../../syrup/interface/SyrupDetail.ts";
import type {OtherIngredientsDetail} from "../../other_ingredients/interface/OtherIngredientsDetail.ts";

export type UnifiedIngredient =
    | ({ type: 'juice' } & JuiceDetail)
    | ({ type: 'bitters' } & BittersDetail)
    | ({ type: 'carbonated' } & CarbonatedDetail)
    | ({ type: 'dairyCream' } & DairyCreamDetail)
    | ({ type: 'garnishes' } & GarnishesDetail)
    | ({ type: 'syrup' } & SyrupDetail)
    | ({ type: 'other' } & OtherIngredientsDetail);
