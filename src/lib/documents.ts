"use client"; // only for the gql tag typing — Codegen will extract documents; components can still be server components
import { gql } from './gql';

export const CharacterCardFragment = gql(/* GraphQL */ `
  fragment CharacterCard on Character {
    id
    name
    image
    status
    species
    origin { name }
  }
`);

export const CharactersPageQuery = gql(/* GraphQL */ `
  query CharactersPage(
    $page: Int,
    $name: String,
    $status: String,
    $species: String,
    $type: String,
    $gender: String
  ) {
    characters(page: $page, filter: { name: $name, status: $status, species: $species, type: $type, gender: $gender }) {
      info { count pages next prev }
      results { ...CharacterCard }
    }
  }
  ${CharacterCardFragment}
`);

export const LocationCardFragment = gql(/* GraphQL */ `
  fragment LocationCard on Location {
    id
    name
    type
    dimension
    residents { id }
  }
`);

export const LocationsPageQuery = gql(/* GraphQL */ `
  query LocationsPage($page: Int, $name: String, $type: String, $dimension: String) {
    locations(page: $page, filter: { name: $name, type: $type, dimension: $dimension }) {
      info { count pages next prev }
      results { ...LocationCard }
    }
  }
  ${LocationCardFragment}
`);

export const EpisodeCardFragment = gql(/* GraphQL */ `
  fragment EpisodeCard on Episode {
    id
    name
    air_date
    episode
    characters { id }
  }
`);

export const EpisodesPageQuery = gql(/* GraphQL */ `
  query EpisodesPage($page: Int, $name: String, $episode: String) {
    episodes(page: $page, filter: { name: $name, episode: $episode }) {
      info { count pages next prev }
      results { ...EpisodeCard }
    }
  }
  ${EpisodeCardFragment}
`);

// Details
export const CharacterDetailsQuery = gql(/* GraphQL */ `
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
`);

export const LocationDetailsQuery = gql(/* GraphQL */ `
  query LocationDetails($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents { id name image }
    }
  }
`);

export const EpisodeDetailsQuery = gql(/* GraphQL */ `
  query EpisodeDetails($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters { id name image }
    }
  }
`);
