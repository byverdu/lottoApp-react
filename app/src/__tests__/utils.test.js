import { utils } from '../utils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
chai.use( sinonChai );

function getLottos() {
  const data = {
    'lottos': [
    'primitiva',
    'euromillions',
    'bonoloto'
    ]
  };

  return data;
}

describe( 'Utils methods', () => {
  it( 'is defined', () => {
    expect( utils ).not.eq( undefined );
  });
  describe( 'serviceApi method', () => {
    let serviceApi;
    beforeEach(() => {
      serviceApi = sinon.spy( utils, 'serviceApi' );
    });
    afterEach(() => {
      serviceApi.restore();
    });

    it( 'is defined', () => {      
      expect( utils ).to.have.property( 'serviceApi' )
        .and.is.a( 'Function' );
    });
    it( 'retrieves all possible raffles id\'s for lottos end point', ( done ) => {
      const result = {
        status: 200,
        data: getLottos()
      }
      utils.serviceApi( 'lottos' )
        .then(( resp ) => {
          expect( serviceApi ).to.have.been.calledWith( 'lottos' );
          expect( resp.status ).to.eq( result.status );
          expect( resp.data ).to.eql( result.data );
          done();
        });
    });
    it( 'retrieves the data for euromillions', ( done ) => {
      const result = {
        status: 200,
        lottoID: 'euromillions'
      }
      utils.serviceApi( 'euromillions' )
        .then(( resp ) => {
          expect( serviceApi ).to.have.been.calledWith( 'euromillions' );
          expect( resp.status ).to.eq( result.status );
          expect( resp.data ).to.have.property( result.lottoID );
          expect( resp.data.euromillions.lottoID ).to.eq( result.lottoID );
          done();
        });
    });
  });
  describe( 'getRandomNumbers method', () => {
    let getRandomNumbers;
    beforeEach(() => {
      getRandomNumbers = sinon.spy(
        utils,
        'getRandomNumbers'
      );
    });
    afterEach(() => {
      getRandomNumbers.restore();
    });
    it( 'is defined', () => {      
      expect( utils ).to.have.property( 'getRandomNumbers' )
        .and.is.a( 'Function' );
    });
    it( 'accepts one lottoId parameter', () => {
      utils.getRandomNumbers( 'euromillions' );
      expect( getRandomNumbers ).to.have.been.calledWith( 'euromillions' );
    });
    it( 'returns an Array, with same length than ball in raffle', () => {
      const euro = utils.getRandomNumbers( 'euromillions' );
      expect( getRandomNumbers ).to.have.returned( euro );
      expect( euro ).to.have.length( 5 );    
    });
    it( 'returns an Array, with random numbers', () => {
      for ( let i = 1; i <= 49; i++ ) {
        const bono = utils.getRandomNumbers( 'bonoloto' );
        expect( bono.indexOf( 50 )).to.eq( -1 );
        expect( bono[ 0 ] < bono[ 1 ] < bono[ 2 ]).to.eq( true );
      }
    });
  });
  describe( 'sortBy method', () => {
    let sortBy;
    beforeEach(() => {
      sortBy = sinon.spy(
        utils,
        'sortBy'
      );
    });
    afterEach(() => {
      sortBy.restore();
    });
    it( 'is defined', () => {      
      expect( utils ).to.have.property( 'sortBy' )
        .and.is.a( 'Function' );
    });
    it( 'accepts one string parameter', () => {
      utils.sortBy( 'count', []);
      expect( sortBy ).to.have.been.calledWithExactly( 'count', []);
    });
    it( 'sorts by count or index', () => {
      const data = [
        {
          count: 4,
          index: 3
        },
        {
          count: 5,
          index: 1
        }
      ]
      utils.sortBy( 'count', data );
      expect( data[ 0 ].count ).eq( 5 );
      utils.sortBy( 'index', data );
      expect( data[ 0 ].index ).eq( 1 );
    });
  });
  describe( 'checkRepeated method', () => {
    let checkRepeated;
    const lastResult = ['08', '11', '23', '34', '45'];
    const simpleSaved = [['08', '13', '33', '34', '48']];
    const doubleSaved = [
      ['08', '13', '33', '34', '48'],
      ['11', '23', '33', '34', '48']
    ];
    beforeEach(() => {
      checkRepeated = sinon.spy(
        utils,
        'checkRepeated'
      );
    });
    afterEach(() => {
      checkRepeated.restore();
    });
    it( 'is defined', () => {      
      expect( utils ).to.have.property( 'checkRepeated' )
        .and.is.a( 'Function' );
    });
    it( 'accepts two arrays as parameters', () => {
      utils.checkRepeated( lastResult, simpleSaved );
      expect( checkRepeated ).to.have.been.calledWithExactly( lastResult, simpleSaved );
    });
    it( 'checks for repeated values', () => {
      utils.checkRepeated( lastResult, simpleSaved );
      expect( checkRepeated ).to.have.returned([[0, 3]]);
    });
    it( 'checks for repeated values', () => {
      utils.checkRepeated( lastResult, doubleSaved );
      expect( checkRepeated ).to.have.returned([[0, 3], [0,1,3]]);
    });
  });
  describe( 'splitString method', () => {
    it( 'is defined', () => {      
      expect( utils ).to.have.property( 'splitString' )
        .and.is.a( 'Function' );
    });
    it( 'splits a string for a specified delimiter', () => {   const data = '04, 17,23,27,30';
      expect( utils.splitString( data, ',' )).to.eql([ '04' ,'17', '23', '27', '30' ]);
    });
  });
  describe( 'buildLinkUrl method', () => {
    it( 'is defined', () => {      
      expect( utils ).to.have.property( 'buildLinkUrl' )
        .and.is.a( 'Function' );
    });
    it( 'returns a string for a url', () => {
      expect( utils.buildLinkUrl( 'primitiva', 'results' )).to.eql( '/lottos/primitiva/results' );
    });
  });    
});
