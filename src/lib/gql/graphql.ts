// Minimal manual shim to unblock dev without Codegen output.

export type CharactersPageQueryVariables = {
  page?: number | null;
  name?: string | null;
  status?: string | null;
  species?: string | null;
  type?: string | null;
  gender?: string | null;
};

export type Character = {
  id: string;
  name?: string | null;
  image?: string | null;
  status?: string | null;
  species?: string | null;
  type?: string | null;
  gender?: string | null;
  origin?: { id?: string | null; name?: string | null } | null;
  location?: { id?: string | null; name?: string | null } | null;
  episode?: ({ id: string; name?: string | null; air_date?: string | null; episode?: string | null } | null)[] | null;
};

export type CharactersInfo = {
  count?: number | null;
  pages?: number | null;
  next?: number | null;
  prev?: number | null;
};

export type Characters = {
  info?: CharactersInfo | null;
  results?: (Character | null)[] | null;
};

export type CharactersPageQuery = {
  characters?: Characters | null;
};

export const CharactersPageDocument = /* GraphQL */ `
  query CharactersPage($page: Int, $name: String, $status: String, $species: String, $type: String, $gender: String) {
    characters(page: $page, filter: { name: $name, status: $status, species: $species, type: $type, gender: $gender }) {
      info { count pages next prev }
      results { ...CharacterCard }
    }
  }
  fragment CharacterCard on Character {
    id
    name
    image
    status
    species
    origin { name }
  }
`;

// Locations types and document
export type LocationsPageQueryVariables = {
  page?: number | null;
  name?: string | null;
  type?: string | null;
  dimension?: string | null;
};

export type Location = {
  id: string;
  name?: string | null;
  type?: string | null;
  dimension?: string | null;
  residents?: ({ id: string; name?: string | null; image?: string | null } | null)[] | null;
};

export type LocationsInfo = {
  count?: number | null;
  pages?: number | null;
  next?: number | null;
  prev?: number | null;
};

export type Locations = {
  info?: LocationsInfo | null;
  results?: (Location | null)[] | null;
};

export type LocationsPageQuery = {
  locations?: Locations | null;
};

export const LocationsPageDocument = /* GraphQL */ `
  query LocationsPage($page: Int, $name: String, $type: String, $dimension: String) {
    locations(page: $page, filter: { name: $name, type: $type, dimension: $dimension }) {
      info { count pages next prev }
      results { ...LocationCard }
    }
  }
  fragment LocationCard on Location {
    id
    name
    type
    dimension
    residents { id }
  }
`;

// Episodes types and document
export type EpisodesPageQueryVariables = {
  page?: number | null;
  name?: string | null;
  episode?: string | null;
};

export type Episode = {
  id: string;
  name?: string | null;
  air_date?: string | null;
  episode?: string | null;
  characters?: ({ id: string; name?: string | null; image?: string | null } | null)[] | null;
};

export type EpisodesInfo = {
  count?: number | null;
  pages?: number | null;
  next?: number | null;
  prev?: number | null;
};

export type Episodes = {
  info?: EpisodesInfo | null;
  results?: (Episode | null)[] | null;
};

export type EpisodesPageQuery = {
  episodes?: Episodes | null;
};

export const EpisodesPageDocument = /* GraphQL */ `
  query EpisodesPage($page: Int, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
      info { count pages next prev }
      results { ...EpisodeCard }
    }
  }
  fragment EpisodeCard on Episode {
    id
    name
    air_date
    episode
    characters { id }
  }
`;

// Detail queries
export type CharacterDetailsQueryVariables = { id: string };
export type CharacterDetailsQuery = { character?: Character | null };
export const CharacterDetailsDocument = /* GraphQL */ `
  query CharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      type
      gender
      origin { id name }
      location { id name }
      episode { id name episode air_date }
    }
  }
`;

export type LocationDetailsQueryVariables = { id: string };
export type LocationDetailsQuery = { location?: Location | null };
export const LocationDetailsDocument = /* GraphQL */ `
  query LocationDetails($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents { id name image }
    }
  }
`;

export type EpisodeDetailsQueryVariables = { id: string };
export type EpisodeDetailsQuery = { episode?: Episode | null };
export const EpisodeDetailsDocument = /* GraphQL */ `
  query EpisodeDetails($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters { id name image }
    }
  }
`;
