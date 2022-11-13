/*
 * Listaus minkälaisia arvosteluja eri genremäärityksiin kuuluvat
 * elokuvat ovat keränneet.
 */
export const STARS_BASED_ON_GENRE = `
  query Query($genre: String!) {
    starsBasedOnGenre(genre: $genre) {
      name
      total
      stars
    }
  }
`;

export const STARS_BASED_ON_GENRE_LARAVEL = `
  query Query($genre: String!) {
    starsBasedOnGenre(genre: $genre) {
      name
      total
      stars
    }
  }
`;

/*
 * Yksittäisen kriitikon arvostelujen tarkastelun lähtötiedot
 */
export const SINGLE_CRITIC = `
  query Query($criticId: String!) {

    criticDetails(criticID: $criticId) {
      criticID
      nimi

    }
    allReviews(criticID: $criticId) {
      stars
      googleID
      link
      publisher
      movie {
        nimi
      }
    }

    criticDetails(criticID: $criticId) {
      reviewerWithShardItems {
        criticID
        count
        name
      }
    }

    criticDetails(criticID: $criticId) {
      defCompSet {
        googleID
        count
        starsAverage
      }
    }
  }
`;


/*
 * Yksittäisen kriitikon arvostelujen tarkastelun lähtötiedot
 */
export const SINGLE_CRITIC_LARAVEL = `
  query Query($criticId: String!) {

    critic(criticID: $criticId){
      criticID
      nimi
      
      reviewerWithSharedItems {
        criticID
        count
        name
      }
      
      defCompSet {
        googleID
        count
        starsAverage
      }
  
    }

    allReviews(criticID: $criticId){
      googleID
      stars
      link
      publisher
      movie {
        nimi
      }
    }    

  }
`;


/*
 * Minkälaisia arvosteluja vertailuun valittu kriitikko on antanut
 * aktiivisen kriitikon arvostelemille elokuville
 */
export const COLLEQUE_REVIEWS = `
  query Query($criticId: String!, $collequeId: String!) {
    collequeReviews(criticID: $criticId, collequeID: $collequeId) {
      criticID
      googleID
      stars
    }
  }
`;

/*
 * Minkälaisia arvosteluja vertailuun valittu kriitikko on antanut
 * aktiivisen kriitikon arvostelemille elokuville
 */
export const COLLEQUE_REVIEWS_LARAVEL = `
  query Query($criticId: String!, $collequeId: String!) {
    collequeReviews(criticID: $criticId, collequeID: $collequeId) {
      criticID
      googleID
      stars
    }
  }
`;

/*
 * Kriitikot listaavalla sivulle esitettävät yhteenvetotiedot
 */

export const ALL_CRITICS = `
  query {
    allCritics {
      nimi
      criticID
      starsAverage
      numbOfReviews
    }
  }
`;

/*
 * Kriitikot listaavalla sivulle esitettävät yhteenvetotiedot
 */

export const ALL_CRITICS_LARAVEL = `
  {
    critics {
      nimi
      criticID
      starsAverage
      numbOfReviews  
    }
  }
`;


export const ALL_GENRES = `
  query {
    allGenres {
      genre
      numberOfMovies
      numberOfReviews
      starsAverage
    }
  }
`;

export const ALL_GENRES_LARAVEL = `
  query {
    distinctGenres {
      genre
      numberOfMovies
      numberOfReviews
      starsAverage
    }
  }
`;

export const ALL_MOVIES = `
  query {
    allMovies {
      googleID
      nimi
      wiki
      kavi
      img
      ensiIlta
      reviews {
        stars
      }
      genres {
        genre
      }
    }
    allGenres {
      genre
    }
  }
`;

export const ALL_MOVIES_LARAVEL = `
  {
    movies {
      googleID
      nimi
      wiki
      kavi
      img
      ensiIlta
      reviews {
        stars
      }
      genres {
        genre
      }
    }
    distinctGenres {
      genre
    }
  }
`;

/*
 *
 */
export const MOVIE_DETAILS = `
  query movieDetails($googleId: Int!) {
    movieDetails(googleID: $googleId) {
      googleID
      nimi
      wiki
      kavi
      img
      ensiIlta
      genres{
        genre
      }
      reviews {
        criticID,
        stars,
        link,
        publisher,
        name
      }
      director {
        nimi
        kaviID
      },
      distributor {
        nimi
        kaviID
      },
      actors {
        nimi
        kaviID
      },
      writer {
        nimi
        kaviID
      },
    }
  }
`;

/*
 *
 */
export const MOVIE_DETAILS_LARAVEL = `
query movie($googleId: Int!) {
  movie(googleID: $googleId) {
    googleID
    nimi
    wiki
    kavi
    img
    ensiIlta
    genres {
      genre
    }
    reviews {
      criticID
      stars
      link
      publisher
      name
    }
    director {
      kaviID
      nimi
    }
    distributor {
      kaviID
      nimi
    }
    actors {
      kaviID
      nimi
    }
    writer {
      kaviID
      nimi
    }
  }
}
`;