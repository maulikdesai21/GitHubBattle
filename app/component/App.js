/**
 * Created by desaim on 4/16/2017.
 */
import  React  from 'react';
import  {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Popular from './Popular.js';
import  Nav from './Nav.js';
import  Home from './Home.js';
import  Battle from './Battle.js';
import  Results from './Results.js';


class App  extends React.Component{
    render(){
        return(
        <Router>
            <div className="container">
                <Nav/>
                <Switch>
                    <Route  exact path="/" component={Home}/>
                    <Route path="/popular" component={Popular}/>
                    <Route exact path="/Battle" component={Battle}/>
                    <Route exact path="/Battle/Results" component={Results}/>
                    <Route render={ () => <h1>Not Found</h1>} />
                </Switch>
            </div>
        </Router>
        )
    }
}

export default App;