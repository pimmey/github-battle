import axios from 'axios';
const githubApiUrl = 'https://api.github.com';
/*
const id = 'YOUR_CLIENT_ID';
const secret = 'YOUR_SECRET_ID';
const params = `?client_id=${id}&client_secret=${secret}`;
*/

const getProfile = username => {
  return axios.get(`${githubApiUrl}/users/${username}`)
    .then(user => user.data);
};

const getRepos = username => {
  return axios.get(`${githubApiUrl}/users/${username}/repos?per_page=100`)
    .then(repos => repos.data)
};

const getStarCount = repos => repos.reduce((count, repo) => count + repo.stargazers_count, 0);

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return followers * 3 + totalStars;
};

const handleError = error => {
  console.warn(error); // eslint-disable-line
  return null;
};

const getUserData = player => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(data => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  });
};

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

export default {
  fetchPopularRepos: language => {
    const encodedURI = window.encodeURI(`${githubApiUrl}/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);
    return axios.get(encodedURI)
      .then(response => response.data.items);
  },
  battle: players => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  }
};
