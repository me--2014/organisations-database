import {expect} from 'chai';
import loki from 'lokijs';

import Organisations from '../../../backend/stores/organisations.js';

const lokidb = new loki('testdb.js');

describe('organisations store', () => {
    let orgs;
    describe('new', () => {
        it('makes a new store', () => {
            orgs = new Organisations(lokidb);
            expect(orgs).to.exist;
            expect(orgs.all()).to.eql([]);
        });
    });
    let added;
    describe('add', () => {
        it('adds an organisation to the store', () => {
            added = orgs.add({ name: 'Beetroot' });
            expect(added.name).to.equal('Beetroot');
            expect(added.id).to.exist;
            expect(orgs.all().length).to.equal(1);
            const o0 = orgs.all()[0];
            expect(o0.name).to.equal('Beetroot');
            expect(o0.id).to.exist;
        });
        it('adds another organisation to the store', () => {
            orgs.add({ name: 'Roll' });
            expect(orgs.all().length).to.equal(2);
            const o1 = orgs.all()[1];
            expect(o1.name).to.equal('Roll');
            expect(o1.id).to.exist;
        });
    });
    describe('byID', () => {
        it('finds the correct organisation', () => {
            const byID = orgs.byID(added.id);
            expect(byID).to.exist;
            expect(byID.id).to.equal(added.id);
            expect(byID.name).to.equal(added.name);
        });
    });
    describe('update', () => {
        it('updates the stored organisation', () => {
            added.description = 'new description';
            orgs.update(added);
            const byID = orgs.byID(added.id);
            expect(byID.name).to.equal(added.name);
            expect(byID.description).to.equal(added.description);
        });
    });
    describe('deleteByID', () => {
        it('deletes the organisation by id', () => {
            orgs.deleteByID(added.id);
            const byID = orgs.byID(added.id);
            expect(byID).to.be.null;
            expect(orgs.all().length).to.equal(1);
        });
    });
});
