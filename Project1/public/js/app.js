class App extends React.Component {
  state = {
    name: "",
    image: "",
    movie: "",
    price: "",
    props: []
  }
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    event.target.reset()

    axios.post('/moviepropstore', this.state).then(response => this.setState({ props: response.data, name: "", image: "", movie: "", price: ""})

  )
}
  deleteProp = (event) => {
    axios.delete('/moviepropstore/' + event.target.value).then(response => {
      this.setState({
        props: response.data
      })
    })
  }
  updateProp = (event) => {
    event.preventDefault()
    event.target.reset()
    const id = event.target.id
    axios.put('/moviepropstore/' + id, this.state).then(response => {
      this.setState({
        props: response.data,
        name: "",
        image: "",
        movie: "",
        price: "",
      })
    })
  }

  componentDidMount = () => {

    axios.get("/moviepropstore").then(response => {

      this.setState({
        props: response.data
      })
    })
  }

  render = () => {
    return (
      <div>
      <h2>Own a piece from your favorite movie</h2>
      {/* create form  */}
      <details className="view create">
      <summary>Add new Prop</summary>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
        type='text'
        id='name'
        onChange={this.handleChange} />
        <br />
        <label htmlFor="image">Image</label>
        <input
        type='text'
        id='image'
        onChange={this.handleChange} />
        <br />
        <label htmlFor="movie">Movie</label>
        <input
        type='text'
        id='movie'
        onChange={this.handleChange} />
        <br />
        <label htmlFor="price">Price</label>
        <input
        type='text'
        id='price'
        onChange={this.handleChange} />
        <br />
        <input className="myButton" type="submit" value="Create Prop" />
      </form>
      </details>
      {/* display content  */}
    <ul>
      {this.state.props.map((prop) => {
        return (
          <li key={prop._id}>
          <span>
          <h2 className="propsName">{prop.name}</h2>
          <details className='view'>
          <summary><img className="propImg" src={prop.image} alt={prop.name} /></summary>

          <br/>
          <h3>Moive: {prop.movie}</h3>
          <h3>Price: {prop.price}</h3>
          </details>
          <button className="myButton" value={prop._id} onClick={this.deleteProp}>Buy Now</button>
          {/* edit button  */}
          <details>
              <summary>Edit Here</summary>
              <form id={prop._id}
                    onSubmit={this.updateProp}>
                    <label htmlFor="name">Name</label>
                    <br/>
                    <input
                    type="text"
                    id="name"
                    onChange={this.handleChange} />
                    <br/>
                    <label htmlFor="image">Image</label>
                    <br/>
                    <input
                    type="text"
                    id="image"
                    onChange={this.handleChange} />
                    <br/>
                    <label htmlFor="movie">Movie</label>
                    <br/>
                    <input
                    type="text"
                    id="movie"
                    onChange={this.handleChange} />
                    <br/>
                    <label htmlFor="price">Price</label>
                    <br/>
                    <input
                    type="text"
                    id="price"
                    onChange={this.handleChange} />

                    <br/>
                    <input
                    className="myButton"
                    type="submit"
                    value="Update Prop" />
                    </form>
              </details>

              </span>
            </li>
        )
      })
      }
      </ul>
    </div>
    )
  }
}


ReactDOM.render(<App></App>, document.querySelector('main'))
