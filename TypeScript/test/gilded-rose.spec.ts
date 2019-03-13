import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { 
    Item,
    LegendaryItem,
    AgedBrie,
    BackstagePass,
    ConjuredItem,
    StandardItem
 } from '../app/models';

describe('Gilded Rose', function () {

    describe.only('Normal Item', function() {
        it('At the end of each day our system lowers both sellIn and quality by 1', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 25;
            const expectedSellIn = 2;
            const expectedQuality = 24;
            const expectedName = 'Normal Item';
            const gildedRose = new GildedRose([ new StandardItem(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(item.name).to.equal(expectedName); 
            expect(item.sellIn).to.equal(expectedSellIn); 
            expect(item.quality).to.equal(expectedQuality); 
        });
        it('Once sell by date is passed, quality degrades twice as fast', () => {
            // given
            const initialSellIn = 0;
            const initialQuality = 25;
            const expectedSellIn = -1;
            const expectedQuality = 23;
            const expectedName = 'Normal Item';
            const gildedRose = new GildedRose([ new StandardItem(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(item.name).to.equal(expectedName);
            expect(item.sellIn).to.equal(expectedSellIn);
            expect(item.quality).to.equal(expectedQuality);
        });
        it('The Quality of an item is never negative', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 0;
            const expectedSellIn = 2;
            const expectedQuality = 0;
            const expectedName = 'Normal Item';
            const gildedRose = new GildedRose([ new StandardItem(expectedName, initialSellIn, initialQuality) ]);
            
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
            expect(item.name).to.equal(expectedName);
            expect(item.sellIn).to.equal(expectedSellIn);
            expect(item.quality > initialQuality).to.equal(true);
        });

        it('the quality never grows past 50', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 50;
            const expectedSellIn = 2;
            const expectedQuality = 50;
            const expectedName = 'Aged Brie';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality);
        });
    });

    describe('Sulfuras', function() {
        it('being a legendary item, never has to be sold or decreases in quality', () => {
        // given
        const expectedSellIn = 100;
        const expectedQuality = 80;
        const expectedName = 'Sulfuras, Hand of Ragnaros';
        const gildedRose = new GildedRose([ new LegendaryItem(expectedName, expectedSellIn, expectedQuality) ]);
        
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

        it('increases in quality by twice as much as its sellIn value is less than 10', () => {
            // given
            const initialSellIn = 9;
            const initialQuality = 25;
            const expectedSellIn = 8;
            const expectedQuality = 27;
            const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality);
        });

        it('increases in quality by thrice as much as its sellIn value is less than 3', () => {
            // given
            const initialSellIn = 2;
            const initialQuality = 25;
            const expectedSellIn = 1;
            const expectedQuality = 28;
            const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality);
        });

        it('Quality drops to 0 after the concert', () => {
            // given
            const initialSellIn = 0;
            const initialQuality = 25;
            const expectedSellIn = -1;
            const expectedQuality = 0;
            const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality);
        });


        it('the quality never grows past 50', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 50;
            const expectedSellIn = 2;
            const expectedQuality = 50;
            const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality);
        });
    });

    describe('Conjured', function() {
        it('At the end of each day our system lowers sellIn by 1 and quality by 2', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 25;
            const expectedSellIn = 2;
            const expectedQuality = 23;
            const expectedName = 'Conjured Item';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality);
        });
        it('Once sell by date is passed, quality degrades twice as fast', () => {
            // given
            const initialSellIn = 0;
            const initialQuality = 25;
            const expectedSellIn = -1;
            const expectedQuality = 21;
            const expectedName = 'Conjured Item';
            const gildedRose = new GildedRose([ new Item(expectedName, initialSellIn, initialQuality) ]);
            
            // when
            const items = gildedRose.updateQuality();
            const item = items[0];
            
            // then
            expect(expectedName).to.equal(item.name);
            expect(expectedSellIn).to.equal(item.sellIn);
            expect(expectedQuality).to.equal(item.quality)
        });
        it('The Quality of an item is never negative', () => {
            // given
            const initialSellIn = 3;
            const initialQuality = 0;
            const expectedSellIn = 2;
            const expectedQuality = 0;
            const expectedName = 'Conjured Item';
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

});
