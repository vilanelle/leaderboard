class Board extends React.Component {

    constructor(){
      super();
      this.state = {
        userDataRecent : [],
        userDataAllTime : [],
        showByRecent : true
      }
      this._showRecent = this._showRecent.bind(this);
      this._showAllTime = this._showAllTime.bind(this);
    }
    componentWillMount(){
      this._getData();
    }
    render() {
        const userList = this._addUserInfo();

        return (
          <div id = 'main-wrapper' >
            <BoardTitle />
            <BoardHeader showRecent={this._showRecent} showAllTime={this._showAllTime}/>
            <div className='users' >{userList}
            </div>
          </div>
        );
      }

    _getData() {
        const fccUrlRecent = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
        const fccUrlAllTime = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
        this._callAjax(fccUrlRecent,"userDataRecent");
        this._callAjax(fccUrlAllTime,"userDataAllTime");
    }
    _callAjax(url, usrData){
        jQuery.ajax({
          method: 'GET',
          url: url,
          success: (data) => {
                var customState = {};
                customState[usrData]=data;
                this.setState(customState);
          }
        });
      }

       _addUserInfo(){
        let userDataSrc;
        if(this.state.showByRecent){
          userDataSrc = this.state.userDataRecent;
        } else {
          userDataSrc = this.state.userDataAllTime;
        }
        let id = 0;
        return userDataSrc.map((user) => {
          id++;
          return (<BoardRow
                   id={id}
                   avatar={user.img}
                   userName={user.username}
                   allTimePts={user.alltime}
                   recentPts={user.recent}
                   key={id}
                       />);
        });
      }

    _showRecent(){
      if(!this.state.showByRecent){
        this.setState({
          showByRecent : true
      })
      }

    }

    _showAllTime(){
      if(this.state.showByRecent){
        this.setState({
          showByRecent : false
        })
      }
    }
}

    class BoardTitle extends React.Component {
      render() {
        return ( <div id = 'board-title' >
          <h1> FCC LEADERBOARD </h1>
          </div>
        );
      }
    }

    class BoardHeader extends React.Component {
      render() {
        return (
          <div id = 'header-wrapper' >
          <div className = 'count' > <i className="fa fa-trophy" aria-hidden="true"></i> </div>
          <div className = 'user-name' >FCC CODER </div>
          <div className = 'points' onClick={this.props.showRecent}><span>Recent points <i className="fa fa-caret-down" aria-hidden="true"></i></span></div>
          <div className= 'all-points' onClick={this.props.showAllTime}><span>Total points <i className="fa fa-caret-down" aria-hidden="true"></i></span></div>
        </div>
        );
      }

  }

  class BoardRow extends React.Component {

    render() {
      return (
        <div className = 'board-row' >
        <div className = 'count' >{this.props.id}</div>
        <div className = 'user-name' ><img className='avatar' src={this.props.avatar} alt='User avatar'/>&nbsp;{this.props.userName}</div>
        <div className = 'points' >{this.props.recentPts}</div>
        <div className = 'all-points' >{this.props.allTimePts}</div>
      </div>
      );
    }
  }
    ReactDOM.render(
      <Board /> ,
        document.getElementById('main')
    )
