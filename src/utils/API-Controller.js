import axios from 'axios';

// This AUTH URL is the link that need to be attatched to the login button, to grant us access
// Will return a code in the url
const SCOPES = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

const redirectURI = 'http://localhost:3000/';
const token = localStorage.getItem('access_token');

const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=c07d7b3656cb4b6b839055dfc766c08e&response_type=code&redirect_uri=${redirectURI}&scope=${SCOPES.join(
  '%20'
)}`;

// This will get necessary AccessToken
export const fetchToken = async (code) => {
  const body = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURI(
    redirectURI
  )}&client_id=${clientId}&client_secret=${clientSecret}`;

  try {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: body,
    });

    const data = await result.json();
    console.log(data);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('expires_in', data.expires_in);
    // window.history.pushState({}, null, '/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

/// This is the API fetcher for the rest
const BASE_URL = 'https://api.spotify.com/v1/';
const options = {
  headers: { Authorization: 'Bearer ' + token },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}${url}`, options);
  return data;
};

//getUserProfile = 'https://api.spotify.com/v1/me'
//getLikedArtist = `https://api.spotify.com/v1/me/top/artists?limit=${limit}`
//getRecently Played = 'https://api.spotify.com/v1/me/player/recently-played'

//getLikedTracks = `https://api.spotify.com/v1/me/tracks?limit=${limit}`
//getLikedAlbums = `https://api.spotify.com/v1/me/albums?limit=${limit}`

//getDevices = 'https://api.spotify.com/v1/me/player/devices'
//getUserPlaylists = `https://api.spotify.com/v1/me/playlists?limit=${limit}`
//getNewReleases =  `https://api.spotify.com/v1/browse/new-releases?country=us'
//getRecommendedTracks = `https://api.spotify.com/v1/recommendations?seed_genres=${genre}`
