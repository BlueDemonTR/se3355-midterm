import { Api, capitalize } from 'lib'


async function getPokedex(obj, loadingButton) {
  const data = await Api.get(`/pokedex/${obj.name}`, {}, loadingButton)
  if(!data) return {}

  const { id, name, is_main_series, descriptions, names, pokemon_entries, region, version_groups } = data

  const mapped = {
    id,
    name: names.find(x => x.language.name === 'en')?.name || capitalize(name),
    description: descriptions.find(x => x.language.name === 'en')?.description || capitalize(name),
    pokemon: pokemon_entries.map(x => ({
      entry_number: x.entry_number,
      name: capitalize(x.pokemon_species.name),
      id: parseInt(x.pokemon_species.url.match(/pokemon-species\/\d+\//)[0].match(/[0-9]+/))
    }))
  }

  return mapped
}

export default getPokedex