import { Api, capitalize } from 'lib'
import getPokedex from './getPokedexDetails'

async function getRegionDetails(_id, loadingButton) {
  const data = await Api.get(`/region/${_id}`, {}, loadingButton)
  if(!data) return {}

  const { id, locations, main_generation, name, names, pokedexes, version_groups } = data

  const mapped = {
    id,
    name: names.find(x => x.language.name === 'en')?.name ?? capitalize(name),
    otherNames: names.filter(x => x.language.name !== 'en').map(x => `${x.name}(${x.language.name})`),
    generation: main_generation?.name.replace('generation-', '').toUpperCase(),
    locations: locations.map(x => capitalize(x.name)),
    playable: version_groups.map(x => ({
      name: capitalize(x.name),
      url: x.url.match(/\/version-group\/\d+\//)[0].replace('version-group', 'game')
    })),
    pokedexes: await Promise.all(pokedexes.map(getPokedex))


  }

  return mapped
}

export default getRegionDetails