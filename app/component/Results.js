/**
 * Created by desaim on 4/22/2017.
 */
import React from 'react';
import queryString from 'query-string';
import PropType from 'prop-types';
import {battle} from '../utils/api.js';
import {Link} from 'react-router-dom';
import Loading  from './Loading';
import PlayerPreview from './PlayerPreview';

function Profile ({info}) {

    return (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropType.object.isRequired,
}

function Player({label,score,profile}) {
    return(
        <div>
            <h1 className="header" >{label}</h1>
            <h3 style={{textAlign:'center'}} >Score:{score}</h3>
            <Profile info={profile}/>
        </div>
    )
}
Player.propTypes = {
    label: PropType.string.isRequired,
    score: PropType.number.isRequired,
    profile: PropType.object.isRequired
}
class Results extends React.Component{

    state = {
      winner:null,
      loser:null,
      error:null,
      loading:true
    }
     async componentDidMount(){
        const {playerOneName,playerTwoName} = queryString.parse(this.props.location.search);

        const players = await battle([
          playerOneName,
          playerTwoName
        ]);
       if(players===null){
         return this.setState( () =>( {
           error:'Check if both the user exist on GitHub',
           loading:false,

         }))
       }
       this.setState(function () {
         return{
           error:null,
           winner:players[0],
           loser:players[1],
           loading:false
         }
       })
    }
    render(){
      const { error, winner, loser, loading } = this.state;

        if(loading===true){
            return(
                <Loading />
            )
        }
        if(error){
            return(
                <div>
                    <p>{error}</p>
                    <Link to="/battle" >Reset</Link>
                </div>
            )
        }
        return(
            <div className="row">
                <Player
                    label="Winner"
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label="Loser"
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}
export default Results;