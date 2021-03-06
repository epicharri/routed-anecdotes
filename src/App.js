import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom"

const Menu = props => {
  const anecdotes = props.anecdotes
  const addNew = props.addNew
  const created = props.created
  const setCreated = props.setCreated
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link
              style={padding}
              to="/"
            >
              Anecdotes
            </Link>
            <Link
              style={padding}
              to="/createnew"
            >
              Create new
            </Link>
            <Link
              style={padding}
              to="/about"
            >
              About
            </Link>
          </div>
          <div>
            <Route
              exact
              path="/"
              render={() => (
                <AnecdoteList
                  anecdotes={anecdotes}
                  setCreated={setCreated}
                />
              )}
            />
            <Route
              exact path="/anecdotes/:id"
              render={({ match }) => {
              console.log('Routessa anecdote/:id match on ', match)
              return (
                <Anecdote
                  anecdote={anecdotes.find(
                    x =>
                      Number(x.id) ===
                      Number(
                        match.params.id
                      )
                  )}
                />)}}
              
            />
            <Route
              exact
              path="/createnew"
              render={() => (
                created ? <Redirect to='/' />
                :
                <CreateNew
                  addNew={addNew} setCreated={setCreated}
                />
              )}
            />
            <Route
              exact
              path="/about"
              render={() => <About />}
            />
          </div>
        </div>
      </Router>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  console.log('anecdote on Anecdotessa ', anecdote)
  return(
  <div>
    <h2>{anecdote.content}</h2>
    <p>by {anecdote.author}</p>
    <p>has {anecdote.votes} votes</p>
    <div>
      For more info see{" "}
      <a href={anecdote.info}>
        {anecdote.info}
      </a>
    </div>
  </div>
  )
  }

const AnecdoteList = ({
  anecdotes, setCreated
}) => {
  setCreated(false)
return (
  <div>

    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link
            to={`anecdotes/${
              anecdote.id
            }`}
          >
            {anecdote.content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing
      account of an individual person or
      an incident. Occasionally
      humorous, anecdotes differ from
      jokes because their primary
      purpose is not simply to provoke
      laughter but to reveal a truth
      more general than the brief tale
      itself, such as to characterize a
      person by delineating a specific
      quirk or trait, to communicate an
      abstract idea about a person,
      place, or thing through the
      concrete details of a short
      narrative. An anecdote is "a story
      with a point."
    </em>

    <p>
      Software engineering is full of
      excellent anecdotes, at this app
      you can find the best and add
      more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -sovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/epicharri/routed-anecdotes">
      https://github.com/epicharri/routed-anecdotes{" "}
    </a>{" "}
    for the source code.
  </div>
)

const CreateNew = props => {
  const [
    content,
    setContent
  ] = useState("")
  const [author, setAuthor] = useState(
    ""
  )
  const [info, setInfo] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    console.log('handleSubmitissa nyt!!')
    props.setCreated(true)
  }

  const Home = props => {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu toPage={props.toPage} />
        {props.vaihtoehdot()}
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={e =>
              setContent(e.target.value)
            }
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={e =>
              setAuthor(e.target.value)
            }
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={e =>
              setInfo(e.target.value)
            }
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [created, setCreated] = useState(false)

  const [
    anecdotes,
    setAnecdotes
  ] = useState([
    {
      content:
        "If it hurts, do it more often",
      author: "Jez Humble",
      info:
        "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content:
        "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info:
        "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ])

  const [page, setPage] = useState(
    "home"
  )

  const toPage = page => event => {
    event.preventDefault()
    setPage(page)
  }

  const [
    notification,
    setNotification
  ] = useState("")
  /*
  const vaihtoehdot = () => {
    if (page === 'home') {
      return(      
        <div> 
          <h1>Software anecdotes</h1>
          <Menu toPage={toPage} />
          {vaihtoehdot()}
          <Footer />
        </div>

      )
    } else if (page === "anecdotes") {
      return (
        <AnecdoteList
          anecdotes={anecdotes}
        />
      )
    } else if (page === "createNew") {
      return (
        <CreateNew addNew={addNew} />
      )
    } else if (page === "about") {
      return <About />
    }
  }
*/
  const addNew = anecdote => {
    anecdote.id = (
      Math.random() * 10000
    ).toFixed(0)
    setAnecdotes(
      anecdotes.concat(anecdote)
    )
    setNotification(`You added new anecdote ${anecdote.content}`)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = id =>
    anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(
      anecdotes.map(a =>
        a.id === id ? voted : a
      )
    )
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <p>{notification}</p>

      <Menu
        anecdotes={anecdotes}
        addNew={addNew}
        created={created}
        setCreated={setCreated}
      />
      <Footer />
    </div>
  )
}

export default App
