import 'server-only';
import { rmClient } from './graphql';
import {
  CharactersPageDocument,
  type CharactersPageQueryVariables,
  type CharactersPageQuery,
  LocationsPageDocument,
  type LocationsPageQuery,
  type LocationsPageQueryVariables,
  EpisodesPageDocument,
  type EpisodesPageQuery,
  type EpisodesPageQueryVariables,
  CharacterDetailsDocument,
  type CharacterDetailsQuery,
  type CharacterDetailsQueryVariables,
  LocationDetailsDocument,
  type LocationDetailsQuery,
  type LocationDetailsQueryVariables,
  EpisodeDetailsDocument,
  type EpisodeDetailsQuery,
  type EpisodeDetailsQueryVariables,
} from './gql/graphql';

export async function getCharacters(opts: CharactersPageQueryVariables) {
  // Cache per query params; revalidate periodically (3600s = 1h)
  try {
    const res = await rmClient.request<CharactersPageQuery, CharactersPageQueryVariables>(
      CharactersPageDocument,
      opts,
      { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' }
    );
    return res.characters;
  } catch (err) {
    // Surface a consistent error for error.tsx boundaries
    throw err;
  }
}

export async function getLocations(opts: LocationsPageQueryVariables) {
  try {
    const res = await rmClient.request<LocationsPageQuery, LocationsPageQueryVariables>(
      LocationsPageDocument,
      opts,
      { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' }
    );
    return res.locations;
  } catch (err) {
    throw err;
  }
}

export async function getEpisodes(opts: EpisodesPageQueryVariables) {
  try {
    const res = await rmClient.request<EpisodesPageQuery, EpisodesPageQueryVariables>(
      EpisodesPageDocument,
      opts,
      { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' }
    );
    return res.episodes;
  } catch (err) {
    throw err;
  }
}

export async function getCharacter(id: string) {
  const res = await rmClient.request<CharacterDetailsQuery, CharacterDetailsQueryVariables>(
    CharacterDetailsDocument,
    { id },
    { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' }
  );
  return res.character;
}

export async function getLocation(id: string) {
  const res = await rmClient.request<LocationDetailsQuery, LocationDetailsQueryVariables>(
    LocationDetailsDocument,
    { id },
    { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' }
  );
  return res.location;
}

export async function getEpisode(id: string) {
  const res = await rmClient.request<EpisodeDetailsQuery, EpisodeDetailsQueryVariables>(
    EpisodeDetailsDocument,
    { id },
    { 'cache-control': 's-maxage=3600, stale-while-revalidate=86400' }
  );
  return res.episode;
}
