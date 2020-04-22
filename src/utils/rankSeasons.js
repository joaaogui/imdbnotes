import {getTitle} from "@/api/title";
import {getSeasons} from "@/api/season";
import store from "@/store/index"

export async function searchTitle(seriesName) {
  store.commit("setInput", seriesName)
  const title = await getTitle(seriesName)
  getSeasonsEpisodes(title.data.imdbID, Number(title.data.totalSeasons))
}

async function getSeasonsEpisodes(titleId, seasons) {
  let seasonsNotes = {}
  for (let seasonNumber of [...Array(seasons).keys()]) {
    const season = await getSeasons(titleId, seasonNumber + 1)
    seasonsNotes[seasonNumber + 1] = getSeasonNote(season.data.Episodes)
  }
  rankSeasons(seasonsNotes)
}

function getSeasonNote(episodes) {
  let seasonRating = 0
  for (let [index, episode] of episodes.entries()) {
    seasonRating += Number(episode.imdbRating)
    if (index === episodes.length - 1) {
      return seasonRating / episodes.length
    }
  }
}

function rankSeasons(seasonsNotes) {
  let entries = Object.entries(seasonsNotes)
  let sorted = entries.sort((a, b) => b[1] - a[1])
  store.commit("setRankedSeasons", sorted)
}
