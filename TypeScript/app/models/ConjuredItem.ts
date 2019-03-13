import { UpdatableItem } from "./UpdatableItem";

export class ConjuredItem extends UpdatableItem {
    constructor(name, sellIn, quality) {
        super(name, sellIn, quality);
    }

    updateItem() {
        // Intentionally empty implementation
    }
}