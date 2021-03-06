'use strict';

const e = React.createElement;

class Dashboard extends React.Component {
    _isMounted = false;

  constructor(props) {
    super(props);

    this.state = { 
        loading: true,
        links: [
            {id: 1, nombre: 'Whatsapp', url: 'www.google.com'},
            {id: 2, nombre: 'tienda', url: 'www.tienda.com'},
        ]
    };
  }


  componentDidMount(){
    this._isMounted = true;
    $(function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
    });
  }

ordenar = () => {

  var newOrder = $('#sortable').sortable('toArray');

  var links = [];
    // this.setState({
    //     links: newOrder.map(orden => {
    //        var newLink = this.state.links.filter(link => link.id == parseInt(orden, 10))
    //        return newLink[0];
    //     })
    // })
    newOrder.map(orden => {
      this.state.links.forEach(element => {
        // console.log(orden)
        if(parseInt(orden)===element.id){
          console.log(element)
          links.push(element)
        }
      });
      // console.log(this.state.links)
   })

    this.setState({links})
  
    // var newOrder = $('#sortable').sortable('toArray');
    // console.log('nuevoOrden')
    // console.log(newOrder);
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

  onAddItem = () => {
    var nombre = document.getElementById('nuevo-nombre');
    var link = document.getElementById('nuevo-link');
    var nuevo = {
        'nombre': nombre.value,
        'url': link.value
    }
    let links = [...this.state.links];
    links.push( nuevo );
    this.setState({ links });
  };
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
 

  render() {
    console.log('links')
    console.log(this.state.links)
    console.log('=============')

        return (
            <React.Fragment>
           <div className="col-xl-8 mt--7">
            <div className="card shadow">
                <div className="card-body border-0">
                    <h1>Agregar</h1>
                   
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-alternative" id="nuevo-nombre" placeholder="Nombre" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-alternative" id="nuevo-link" placeholder="Link" />
                                    </div>
                                    <button className="btn btn-primary" onClick={() => this.onAddItem()}> Agregar </button>
                                </div>
                            </div>
                        </div>
                       

                <h1>listado</h1>
                
                    <div id="sortable" className="sortable" >
                            {this.state.links.map((link,key) => 
                            <div id={link.id}   className="card sorteable-item">
                                <p>{link.nombre} </p>
                            </div>
                            )}
                      </div>
                      
                      <button onClick={() => this.ordenar()}  >ordenar</button>

                     
                      
                              
              
                </div>
            </div>
          </div>
          <div className="col-xl-4 mt--9">
                <div className="">
                  <div className="">
                        <div id='phone'>
                                <img className="img-cel" src="http://www.graphicsfuel.com/wp-content/uploads/2013/03/iphone5-vertical.png" />
                                <div id='screen'>
                                    <div className="text-center">
                                        <h1>links</h1>
                                        {this.state.links.map( dato => <p><a className="btn btn-primary btn-block" href={dato.url}> {dato.nombre} </a></p> )}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
                   
                <style jsx="true">{`
                
                `}</style>
            </React.Fragment>
          );
    
    
  }
}

const domContainer = document.querySelector('#div-dashboard');
ReactDOM.render(e(Dashboard), domContainer);


