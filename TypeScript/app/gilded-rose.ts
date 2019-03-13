import {Item} from './models/item';
import { UpdatableItem } from './models/UpdatableItem';

export class GildedRose {
    items: Array<UpdatableItem>;
    constructor(items = [] as Array<UpdatableItem>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const currentItemName = item.name;
            const currentItemQuality = item.quality;
            let degredationFactor = 1;

            if (currentItemName !== 'Sulfuras, Hand of Ragnaros') {
                item.sellIn--;
            }

            switch(currentItemName) {
                case 'Sulfuras, Hand of Ragnaros':
                    item.updateItem();
                    break;
                case 'Aged Brie':
                    if(currentItemQuality<50){
                        item.quality ++;
                    }
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if(currentItemQuality<50){
                        if (item.sellIn <= 0) {
                            item.quality = 0;
                        } else if (item.sellIn < 3) {
                            item.quality += 3;
                        } else if (item.sellIn < 10) {
                            item.quality += 2;
                        } else {
                            item.quality ++;
                        }
                        if (item.quality > 50) {
                            item.quality = 50;
                        }
                    }
                    break;
                case 'Conjured Item':
                    degredationFactor = 2;
                    if (item.sellIn < 0) {
                        degredationFactor = 4;
                    }

                    item.quality = item.quality - degredationFactor < 0 ? 0 : item.quality - degredationFactor;
                    break;
                default:
                    degredationFactor = 1;
                    if (item.sellIn < 0) {
                        degredationFactor = 2;
                    }
                    item.quality -= degredationFactor;
            }
            degredationFactor = 1;
            item.quality = item.quality < 0 ? 0 : item.quality;
        }
        return this.items;
    }
}

//     updateQualityForItem(item) {
//         if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
//             if (item.quality > 0) {
//                 if (item.name != 'Sulfuras, Hand of Ragnaros') {
//                     item.quality = item.quality - 1
//                 }
//             }
//         } else {
//             if (item.quality < 50) {
//                 item.quality = item.quality + 1
//                 if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
//                     if (item.sellIn < 11) {
//                         if (item.quality < 50) {
//                             item.quality = item.quality + 1
//                         }
//                     }
//                     if (item.sellIn < 6) {
//                         if (item.quality < 50) {
//                             item.quality = item.quality + 1
//                         }
//                     }
//                 }
//             }
//         }
//         if (item.name != 'Sulfuras, Hand of Ragnaros') {
//             item.sellIn = item.sellIn - 1;
//         }
//         if (item.sellIn < 0) {
//             if (item.name != 'Aged Brie') {
//                 if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
//                     if (item.quality > 0) {
//                         if (item.name != 'Sulfuras, Hand of Ragnaros') {
//                             item.quality = item.quality - 1
//                         }
//                     }
//                 } else {
//                     item.quality = item.quality - item.quality
//                 }
//             } else {
//                 if (item.quality < 50) {
//                     item.quality = item.quality + 1
//                 }
//             }
//         }
//     }
// }
