import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
import './index.scss';

const client = new ApolloClient({
   uri: "http://localhost:5000/graphql",
   cache: new InMemoryCache()
})
const container = document.getElementById('root')!;
const root = createRoot(container);

const app =
   <ApolloProvider client={client}>
      <Provider store={store}>
         <App />
      </Provider>
   </ApolloProvider>

root.render(app);
