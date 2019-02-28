import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    describe('Normal Item', function() {
        it('At the end of each day our system lowers both sellIn and quality by 1', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 25;
            const expectedSellIn = 2;
            const expectedQuality = 24;
            const expectedName = 'Normal Item';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality)
        });
        it('Once sell by date is passed, quality degrades twice as fast', () => {
            // given
            const initialSellIn = 0;
            const initialQuality = 25;
            const expectedSellIn = -1;
            const expectedQuality = 23;
            const expectedName = 'Normal Item';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality)
        });
    });

    describe('Aged Brie', function() {
        it('Increases in quality the older it gets', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 25;
            const expectedSellIn = 2;
            const expectedName = 'Aged Brie';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(true).to.equal(item.quality > initialQuality);
        });
    });

    describe('Sulfuras', function() {
        it('being a legendary item, never has to be sold or decreases in quality', () => {
        // given
        const expectedSellIn = 100;
        const expectedQuality = 80;
        const expectedName = 'Sulfuras, Hand of Ragnaros';
        const gildedRose = new GildedRose([ new Item(expectedName, expectedSellIn, expectedQuality) ]);
        
        // when
        const items = gildedRose.updateQuality();
        const item = items[0];
        
        // then
        expect(item.name).to.equal(expectedName);
        expect(item.sellIn).to.equal(expectedSellIn);
        expect(item.quality).to.equal(expectedQuality);            
        });
    });

    describe('Backstage Passes', function() {
        it('increases in quality as its sellIn value approaches', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 25;
            const expectedSellIn = 2;
            const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(true).to.equal(item.quality > initialQuality);
        });
    });

    describe('Conjured', function() {
        // it('inital quality should decrease, and expected quality should increase', () => {
        //     // given
        //     const initialSellIn = 3;
        //     const initialQuality = 25;
        //     const expectedSellIn = 2;
        //     const expectedQuality = 24;
        //     const expectedName = 'Normal Item';
        //     const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
        //     // when
        //     const items = gildedRose.updateQuality();
        //     const item = items[0];
            
        //     // then
        //     expect(expectedName).to.equal(item.name);
        //     expect(expectedSellIn).to.equal(item.sellIn);
        //     expect(expectedQuality).to.equal(item.quality)
        // });
    });

});
