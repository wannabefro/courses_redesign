import React, { Component } from 'react';
import './App.css';

const courses = [
{
  uuid: '123',
  name: "Begin Programming: Build Your First Mobile Game",
  introduction: "Learn basic Java programming by developing a simple mobile game that you can run on your computer, Android phone, or tablet. ",
  image_url: "https://ugc.futurelearn.com/uploads/images/c9/9c/regular_c99cbca8-6bf5-44f2-9bb9-17c21efc8e72.jpg",
},
{
  uuid: '124',
  name: "Corpus Linguistics: Method, Analysis, Interpretation",
  introduction: "Offers a practical introduction to the methodology of corpus linguistics for researchers in social sciences and humanities",
  image_url: "https://ugc.futurelearn.com/uploads/images/33/9f/regular_339ff074-1f50-4a77-a9d8-822cf939be13.jpg",
},
{
  uuid: '125',
  name: "Improving Your Image: Dental Photography in Practice",
  introduction: "Learn how to achieve consistent and excellent results in all aspects of dental photography with this free online course.",
  image_url: "https://ugc.futurelearn.com/uploads/images/ab/4f/regular_ab4fe1b5-2203-48de-85fa-ad0b5275d473.jpg",
},
{
  uuid: '126',
  name: "Discover Dentistry",
  introduction: "An entertaining and illuminating course for everyone to explore the impact dentistry has on our lives.",
  image_url: "https://ugc.futurelearn.com/uploads/images/36/ac/regular_36acb345-60b5-4928-94e7-cd02c6cdf9b4.jpg",
},
{
  uuid: '127',
  name: "Introduction to Ecosystems",
  introduction: "Gain an understanding of the natural world, how the web of life works, with illustrations from around the world.",
  image_url: "https://ugc.futurelearn.com/uploads/images/69/28/regular_692872f7-6f2a-42d9-91e4-096f425bc2f8.jpg",
},
]

const isSearched = (searchTerm) => (item) => (
    !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase())
)

const isFavourited = () => (item) => (
    item.favourited
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses,
      searchTerm: '',
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onFavourite = this.onFavourite.bind(this);
  }

  componentDidMount() {
    this.fetchCourses();
  }

  onSearchChange(event) {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  onFavourite(uuid) {
    const favouriteCourse = courses.find(e => e.uuid === uuid);
    favouriteCourse.favourited = !favouriteCourse.favourited;
    this.setState({ courses: courses });
  }

  render() {
    const { searchTerm, courses } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
          Find your dream course
          </Search>
        </div>
        <List
          list={ courses.filter(isFavourited()) }
        >
          Favourite some courses and they'll appear here
        </List>
        <Table
          list={courses}
          pattern={searchTerm}
          onFavourite={this.onFavourite}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) => (
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
)

const Table = ({ list, pattern, onFavourite }) => (
    <div className="table">
      { list.filter(isSearched(pattern)).map(item => (
        <div className="row" key={item.uuid}>
          <figure>
            <img src={item.image_url} alt="" />
            <figcaption>{item.name}:{item.introduction}</figcaption>
          </figure>
          <Button
            onClick={() => onFavourite(item.uuid)}
          >
            {item.favourited ? 'Unfavourite' : 'Favourite'}
          </Button>
        </div>
      ))}
    </div>
)

const Button = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
)

const List = ({ list, children }) => {
  if (list.length === 0) {
    return (
        <p>{children}</p>
    )
  }

  return (
    <div>
      <p>Your favourite courses</p>
      <ul>
        {list.map(item => (
          <li key={item.uuid}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App;
