import { utils } from '../utils';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const expect = chai.expect;
chai.use( sinonChai );

function getLottos() {
  const data = {
    "lottos": [
    "primitiva",
    "euromillions",
    "bonoloto"
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
      utils.getRandomNumbers( 'euromillions');
      expect( getRandomNumbers ).to.have.been.calledWith( 'euromillions' );
    });
    it( 'returns an Array, with same length than ball in raffle', () => {
      const euro = utils.getRandomNumbers( 'euromillions');
      expect( getRandomNumbers ).to.have.returned( euro );
      expect( euro ).to.have.length( 5 );    
    });
    it( 'returns an Array, with random numbers', () => {
      for (let i = 1; i <= 49; i++) {
        const bono = utils.getRandomNumbers( 'bonoloto');
        expect( bono.indexOf( 50 )).to.eq( -1 );
        expect( bono[0] < bono[1] < bono[2]).to.eq( true );
      }
    });
  })    
});