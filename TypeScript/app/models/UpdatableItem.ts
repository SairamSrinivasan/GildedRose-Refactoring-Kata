import { Item } from "./Item";

export abstract class UpdatableItem extends Item {
    updateItem() {
        this.sellIn--;
    }
}