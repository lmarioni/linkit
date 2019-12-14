'use strict';

const e = React.createElement;

class Lista extends React.Component {
    _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {links:[
      {id: 1,nombre: 'elemento1'},
      {id: 2,nombre: 'elemento2'},
      {id: 3,nombre: 'elemento3'}
  ]}
;
  }

  componentDidMount(){
    this._isMounted = true;
    $(function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
    });
  }

  ordenar () {
    var newOrder = $('#sortable').sortable('toArray').toString();
    console.log(newOrder);
 }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  myChangeHandler = (event) => {
    this.setState({
      links: this.state.links.map(link => {
      if(link.id != event.target.id){
        return link;
      }else{
        let newLink = {
          ...link,
          nombre: event.target.value
        }
        return newLink;
      }
    })})
  }
 

  render() {
        return (
            <React.Fragment>
                        <div id="sortable" className="sortable" >
                            {this.state.links.map((link,key) => 
                            <div id={link.id}  onMouseUp={() => this.ordenar()}   className="card sorteable-item">
                                <div className="sorteable-body">
                                  <div className="container">
                                  <div className="row">
                                        <div className="col-md-1 col-xs-1 sorteable-zone text-center">
                                        <i className="fas fa-grip-vertical"></i>
                                        </div>
                                        <div className="col-md-11 col-xs-11" style={{padding:15}}>
                                            <input type="text" name="" id={link.id} value={link.nombre} onChange={this.myChangeHandler} />
                                            <label class="custom-toggle">
              <input type="checkbox" checked="" />
              <span class="custom-toggle-slider rounded-circle"></span>
            </label>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                            )}
                      </div>
            </React.Fragment>
          );
  }
}

const domContainer = document.querySelector('#div-lista');
ReactDOM.render(e(Lista), domContainer);
