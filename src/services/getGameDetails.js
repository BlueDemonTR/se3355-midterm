import { Api, capitalize } from 'lib'
import getPokedex from './getPokedexDetails'

async function getGameDetails(_id, loadingButton) {
  const data = await Api.get(`/version-group/${_id}`, {}, loadingButton)
  if(!data) return {}
  
  const { id, generation, move_learn_methods, name, pokedexes, regions, versions } = data

  const mapped = {
    id,
    name: capitalize(name),
    move_learn_methods: move_learn_methods.map(x => capitalize(x.name)),
    generation: generation.name.replace('generation-', '').toUpperCase(),
    pokedexes: await Promise.all(pokedexes.map(getPokedex)),
    regions: regions.map(x => ({
      name: capitalize(x.name),
      url: x.url.match(/\/region\/\d+\//)[0]
    })),
    versions: versions.map(x => capitalize(x.name)),
  }
  
  return mapped
}

export default getGameDetails