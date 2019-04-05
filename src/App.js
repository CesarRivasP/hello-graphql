import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const ExchangeRates = () => (
  <Query query={QUERY}>
    {
      ({loading, error, data }) => {
        if (error) return '💩 Oops!... ERRR';
        if (loading) return 'Patience young grasshopper...';

        return data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>{currency}: {rate}</p>
          </div>
        ))
      }
    }
  </Query>
);

const App = () => <ExchangeRates />

export default App;
