use('Videoclub')

db.movies.insertMany([
  {
    title: "Inception",
    description: "Un ladrón especializado en infiltrarse en sueños debe realizar la misión imposible.",
    category: ["Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    rating: "8.8",
    posterURL: "https://image.tmdb.org/t/p/inception.jpg",
    trailerURL: "https://youtube.com/inception",
    year: "2010"
  },
  {
    title: "The Dark Knight",
    description: "Batman enfrenta su mayor desafío cuando el Joker siembra el caos en Gotham.",
    category: ["Action", "Drama"],
    director: "Christopher Nolan",
    rating: "9.0",
    posterURL: "https://image.tmdb.org/t/p/darkknight.jpg",
    trailerURL: "https://youtube.com/darkknight",
    year: "2008"
  },
  {
    title: "Interstellar",
    description: "Un viaje interestelar para salvar a la humanidad de la extinción.",
    category: ["Sci-Fi", "Adventure"],
    director: "Christopher Nolan",
    rating: "8.6",
    posterURL: "https://image.tmdb.org/t/p/interstellar.jpg",
    trailerURL: "https://youtube.com/interstellar",
    year: "2014"
  },
  {
    title: "The Matrix",
    description: "Neo descubre que el mundo es una simulación y lucha por liberar a la humanidad.",
    category: ["Sci-Fi", "Action"],
    director: "Lana Wachowski & Lilly Wachowski",
    rating: "8.7",
    posterURL: "https://image.tmdb.org/t/p/matrix.jpg",
    trailerURL: "https://youtube.com/matrix",
    year: "1999"
  },
  {
    title: "Pulp Fiction",
    description: "Historias entrelazadas de crimen, violencia e ironía en Los Ángeles.",
    category: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    rating: "8.9",
    posterURL: "https://image.tmdb.org/t/p/pulpfiction.jpg",
    trailerURL: "https://youtube.com/pulpfiction",
    year: "1994"
  },
  {
    title: "The Shawshank Redemption",
    description: "Dos presos forjan una amistad mientras planean un futuro mejor.",
    category: ["Drama"],
    director: "Frank Darabont",
    rating: "9.3",
    posterURL: "https://image.tmdb.org/t/p/shawshank.jpg",
    trailerURL: "https://youtube.com/shawshank",
    year: "1994"
  },
  {
    title: "Fight Club",
    description: "Un hombre encuentra una nueva forma de vida tras conocer a Tyler Durden.",
    category: ["Drama", "Thriller"],
    director: "David Fincher",
    rating: "8.8",
    posterURL: "https://image.tmdb.org/t/p/fightclub.jpg",
    trailerURL: "https://youtube.com/fightclub",
    year: "1999"
  },
  {
    title: "Forrest Gump",
    description: "La vida extraordinaria de un hombre con un gran corazón.",
    category: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    rating: "8.8",
    posterURL: "https://image.tmdb.org/t/p/forrestgump.jpg",
    trailerURL: "https://youtube.com/forrestgump",
    year: "1994"
  },
  {
    title: "Gladiator",
    description: "Un general romano traicionado se convierte en gladiador para buscar justicia.",
    category: ["Action", "Drama"],
    director: "Ridley Scott",
    rating: "8.5",
    posterURL: "https://image.tmdb.org/t/p/gladiator.jpg",
    trailerURL: "https://youtube.com/gladiator",
    year: "2000"
  },
  {
    title: "The Godfather",
    description: "La historia del ascenso y caída de la familia criminal Corleone.",
    category: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    rating: "9.2",
    posterURL: "https://image.tmdb.org/t/p/godfather.jpg",
    trailerURL: "https://youtube.com/godfather",
    year: "1972"
  },
  {
    title: "The Godfather Part II",
    description: "La expansión del imperio Corleone y los orígenes de Vito.",
    category: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    rating: "9.0",
    posterURL: "https://image.tmdb.org/t/p/godfather2.jpg",
    trailerURL: "https://youtube.com/godfather2",
    year: "1974"
  },
  {
    title: "The Avengers",
    description: "Los héroes más poderosos de la Tierra se unen para enfrentar una amenaza global.",
    category: ["Action", "Adventure"],
    director: "Joss Whedon",
    rating: "8.0",
    posterURL: "https://image.tmdb.org/t/p/avengers.jpg",
    trailerURL: "https://youtube.com/avengers",
    year: "2012"
  },
  {
    title: "Avatar",
    description: "Un soldado humano se une a los Na'vi en un planeta alienígena.",
    category: ["Sci-Fi", "Adventure"],
    director: "James Cameron",
    rating: "7.9",
    posterURL: "https://image.tmdb.org/t/p/avatar.jpg",
    trailerURL: "https://youtube.com/avatar",
    year: "2009"
  },
  {
    title: "Titanic",
    description: "Una historia de amor a bordo del famoso transatlántico.",
    category: ["Drama", "Romance"],
    director: "James Cameron",
    rating: "7.8",
    posterURL: "https://image.tmdb.org/t/p/titanic.jpg",
    trailerURL: "https://youtube.com/titanic",
    year: "1997"
  },
  {
    title: "Jurassic Park",
    description: "Un parque temático lleno de dinosaurios clonados se vuelve incontrolable.",
    category: ["Sci-Fi", "Adventure"],
    director: "Steven Spielberg",
    rating: "8.1",
    posterURL: "https://image.tmdb.org/t/p/jurassicpark.jpg",
    trailerURL: "https://youtube.com/jurassicpark",
    year: "1993"
  },
  {
    title: "The Lion King",
    description: "Simba debe reclamar su lugar como rey tras la trágica muerte de su padre.",
    category: ["Animation", "Drama"],
    director: "Roger Allers & Rob Minkoff",
    rating: "8.5",
    posterURL: "https://image.tmdb.org/t/p/lionking.jpg",
    trailerURL: "https://youtube.com/lionking",
    year: "1994"
  },
  {
    title: "Whiplash",
    description: "Un joven batería lucha por convertirse en el mejor bajo un profesor abusivo.",
    category: ["Drama", "Music"],
    director: "Damien Chazelle",
    rating: "8.5",
    posterURL: "https://image.tmdb.org/t/p/whiplash.jpg",
    trailerURL: "https://youtube.com/whiplash",
    year: "2014"
  },
  {
    title: "The Social Network",
    description: "La historia del nacimiento de Facebook y los conflictos que lo rodearon.",
    category: ["Drama", "Biography"],
    director: "David Fincher",
    rating: "7.7",
    posterURL: "https://image.tmdb.org/t/p/socialnetwork.jpg",
    trailerURL: "https://youtube.com/socialnetwork",
    year: "2010"
  },
  {
    title: "La La Land",
    description: "Un pianista de jazz y una actriz buscan cumplir sus sueños en Los Ángeles.",
    category: ["Drama", "Musical"],
    director: "Damien Chazelle",
    rating: "8.0",
    posterURL: "https://image.tmdb.org/t/p/lalaland.jpg",
    trailerURL: "https://youtube.com/lalaland",
    year: "2016"
  },
  {
    title: "Mad Max: Fury Road",
    description: "En un futuro desolado, Max y Furiosa luchan por sobrevivir.",
    category: ["Action", "Adventure"],
    director: "George Miller",
    rating: "8.1",
    posterURL: "https://image.tmdb.org/t/p/madmax.jpg",
    trailerURL: "https://youtube.com/madmax",
    year: "2015"
  }
]);
