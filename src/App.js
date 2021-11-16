import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sqares: Array(9).fill(null),
      count: 0,
      button: "none",
      x: 0,
      o: 0,
      player1: '',
      player2: '',
      pickPlayersPlaice: "flex",
      fieldHied: "none",
      measage: 'Выбери cвою команду',
    }
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    this.end = false;
  }

  pickTeam = (evt) => {
    let data = evt.target.attributes.data.value;
    if (data === "x") {
      this.setState({player1: data})
      this.setState({player2: "o"})
    } else if (data === "o") {
      this.setState({player2: "x"})
      this.setState({player1: data})
    }
    this.setState({pickPlayersPlaice: "none"})
    this.setState({fieldHied: "flex"})
    this.changeMesagge();
  }

  click = (evt) => {
    let data = evt.target.attributes.data.value;
    let currentSqvare = this.state.sqares;

    if (currentSqvare[data] === null) {
      currentSqvare[data] = (this.state.count % 2 === 0) ? this.state.player1 : this.state.player2;
      this.setState({count: this.state.count + 1})
      this.setState({sqares: currentSqvare})
    } else {
      alert('Ход другой команды')
    }
    
    this.isWinner();
    this.isDrow();
    this.countOfVictory();
  }

  isWinner = () => {
    let s = (this.state.count % 2 === 0) ? this.state.player1 : this.state.player2;
    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];
      if (this.state.sqares[line[0]] === s
        && this.state.sqares[line[1]] === s
        && this.state.sqares[line[2]] === s)  {
        this.end = true;
        alert(s + ' - Победили!!!')
        this.setState({button: "block"})
        this.setState({measage:'Игра закончилась!!!'})
      }
    }
  }

  isDrow = () => {
    if (this.state.sqares.includes(null) === false && this.end === false) {
      alert('Ничья, победила дружба!!!')
      this.setState({button: "block"})
      this.setState({measage:'Игра закончилась!!!'})
    } 

  }
  

  clearField = () => {
    this.setState({count: 0});
    this.setState({sqares: Array(9).fill(null)});
    this.setState({button: "none"});
    this.end = false;
    this.setState({pickPlayersPlaice: "flex"});
    this.setState({fieldHied: "none"});
    this.setState({measage:'Выбери cвою команду'})
  }

  changeMesagge = () => {
    return this.setState({measage:'Игра началась!!!'})
  }

  countOfVictory = () => {
    let s = (this.state.count % 2 === 0) ? this.state.player1 : this.state.player2;
    if (this.isWinner && this.end === true ) {
      this.setState({[s]: this.state[s]+1})
  }
  }


  render() {
    return (
      <div className="container">
        <p> {this.state.measage} </p>
        <div className="pick-fihter" style={{display: this.state.pickPlayersPlaice}}>
          <button className="button-fihter" onClick={this.pickTeam} data="x"  style={{display: "block"}} type="button">X</button>
          <button className="button-fihter" onClick={this.pickTeam} data="o"  style={{display: "block"}} type="button">O</button>
        </div>
        <ul className="big-sqvad" style={{display: this.state.fieldHied}}>
          <li className="small-sqvad" onClick={this.click} data="0">{this.state.sqares[0]}</li>
          <li className="small-sqvad" onClick={this.click} data="1">{this.state.sqares[1]}</li>
          <li className="small-sqvad" onClick={this.click} data="2">{this.state.sqares[2]}</li>
          <li className="small-sqvad" onClick={this.click} data="3">{this.state.sqares[3]}</li>
          <li className="small-sqvad" onClick={this.click} data="4">{this.state.sqares[4]}</li>
          <li className="small-sqvad" onClick={this.click} data="5">{this.state.sqares[5]}</li>
          <li className="small-sqvad" onClick={this.click} data="6">{this.state.sqares[6]}</li>
          <li className="small-sqvad" onClick={this.click} data="7">{this.state.sqares[7]}</li>
          <li className="small-sqvad" onClick={this.click} data="8">{this.state.sqares[8]}</li>
        </ul>
        <button onClick={this.clearField}  style={{display: this.state.button}} type="button">Начать заново</button>
        <div className="container">
          <p>Глобальный счет:</p>
          <div>
           {`Колличество побед ноликов: `}{this.state.o}
          </div>
          <div>
          {`Колличество побед крестиков: `}{this.state.x}
          </div>
        </div>
      </div>
    );
  }
}


export default App;
