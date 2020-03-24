import React from 'react';
import logo from './logo.svg';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import NavBar from './components/nav-bar'
import './App.css';

const store = configureStore();

class App extends React.Component{

    addToList = () => {
        //pass
    }

    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <NavBar addToNavBar={this.addToList}/>
                </Provider>
            </div>
        );
    }
}

export default App;
