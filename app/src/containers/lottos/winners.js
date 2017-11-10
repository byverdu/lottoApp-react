import React, { Component } from 'react';
import { utils } from '../../utils/';

class Winners extends Component {
  constructor( props ) {
    super( props )
    this.state = {
      data: {}
    }
    this.buildExtraInfo = this.buildExtraInfo.bind( this )
    this.buildTableHeaders = this.buildTableHeaders.bind( this );
    this.buildTableData = this.buildTableData.bind( this );
  }

  get lottoName() {
    return this.props.match.params.name;
  }

  get extraInfo() {
    return this.state.data.extraInfo;
  }

  get allWinners() {
    return this.state.data.allWinners;
  }

  get allWinnersKeys() {
    return Object.keys( this.state.data.allWinners[ 0 ]);
  }

  componentDidMount() {
    utils.serviceApi( `${this.lottoName}Winner` )
      .then( resp =>
        this.setState({
          data: resp.data[ `${this.lottoName}Winner` ]
        })
      );
  }

  buildTableHeaders() {
    return this.allWinnersKeys.map(( item, key ) => {
      return(
        <th key={key}>
          {item}
        </th>
      );
    });
  }

  buildInnerData( data ) {
    return this.allWinnersKeys.map(( item, key ) => {
      return(
        <td key={key}>
          {data[ item ]}
        </td>
      );
    });
  }

  buildTableData() {
    return this.allWinners.map(( data, keyData ) => {
      return(
        <tr key={keyData}>
          {this.buildInnerData( data )}
        </tr>
      );
    });
  }

  buildExtraInfo() {
    return this.extraInfo.map(( info, key ) => {
      if ( key % 2 !== 1 ) {
        return(
          <h1 key={key}>
            {info}
          </h1>
        );
      } else {
        return(
          <h3 key={key}>
            {info}
          </h3>
        );
      }
    });
  }

  render() {
    if ( this.props.isLoading || !this.state.data.extraInfo ) {
      return (
        <div>
        Loading  Page ....
        </div>
      )
    }
    return(
      <div>
        <table>
          <thead>
            <tr>
              {this.buildTableHeaders()}
            </tr>
          </thead>
          <tbody>
            {this.buildTableData()}
          </tbody>
        </table>
        {this.buildExtraInfo()}
      </div>
    );
  }
}

export default Winners;