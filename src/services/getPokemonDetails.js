import { Api, capitalize } from 'lib'
import getPokedex from './getPokedexDetails'

async function getAppearances(items) {
  const set = new Set()

  for (const item of items) {
    const data = await Api.get(item.version.url)
    if(!data) continue

    const { version_group } = data

    set.add(`${version_group.name}Ğ${parseInt(version_group.url.match(/version-group\/\d+\//)[0].match(/[0-9]+/))}`)
  }

  return [...set.values()].map((x) => {
    const [name, id] = x.split('Ğ')

    return {
      name: capitalize(name),
      url: `/game/${id}`
    }
  })
}

async function getSpeciesDetails(url) {
  const data = { description: '', names: '', evolvesFrom: null, evolvesInto: [] }
  
  const species = await Api.get(url)
  if(!species) return data

  data.description = species.flavor_text_entries.reverse().find(x => x.language.name === 'en')?.flavor_text.replaceAll('\n', ' ')

  data.names = species.names.filter(x => x.language.name !== 'en').map(x => `${x.name}(${x.language.name})`)

  if(species.evolves_from_species) {
    const group = await Api.get(species.evolves_from_species.url)

    if(group) {

      const pokemon = await Api.get(group.varieties[0].pokemon.url)
    
      if(pokemon) data.evolvesFrom = {
        name: capitalize(pokemon.name),
        sprite: pokemon.sprites.front_default,
        id: pokemon.id
      }
    }

  }

  if(species.evolution_chain) {
    const chain = await Api.get(species.evolution_chain.url)
    if(chain) {
      let self = naryTreeTraversal(chain.chain, species.name)

      for (const item of (self?.evolves_to ?? [])) {
        const group = await Api.get(item.species.url)
        if(!group) continue

        const pokemon = await Api.get(group.varieties.find(x => x.is_default).pokemon.url)

        data.evolvesInto.push({
          name: capitalize(pokemon.name),
          sprite: pokemon.sprites.front_default,
          id: pokemon.id
        })
      }

    } 
  }

  return data
}

function naryTreeTraversal(root, name) {
  if(root.species.name === name) return root

  for (const item of root.evolves_to) {
    const leave = naryTreeTraversal(item, name)
    
    if(leave) return leave
  }

  return false
}

async function getTypes(url) {
  const type = await Api.get(url)
  if(!type) return { }

  return {
    name: type.names.find((x) => x.language.name === 'en')?.name ?? capitalize(type.name),
    // Latest Sprite Possible
    sprite: type.sprites['generation-ix']['scarlet-violet'].name_icon
  }
}

function getSprite(sprites) {

  return {
    front: sprites.front_default,
    back: sprites.back_default,
    shiny: {
      front: sprites.front_shiny,
      back: sprites.back_shiny
    }
  }
}

async function getPokemonDetails(_id, loadingButton) {
  const data = await Api.get(`/pokemon/${_id}`, {}, loadingButton)
  if(!data) return {}
  
  const { id, abilities, cries, game_indices, height, held_items, moves, name, sprites, stats, species, types } = data

  const { evolvesFrom, evolvesInto, names, description } = await getSpeciesDetails(species.url)

  const mapped = {
    id,
    name: capitalize(name),
    otherNames: names,
    description,
    abilities: abilities.map(x => capitalize(x.ability.name)),
    cries: cries?.latest ?? cries?.legacy,
    playable: await getAppearances(game_indices),
    height,
    moves: moves.map(x => capitalize(x.move.name)),
    sprite: getSprite(sprites),
    evolvesFrom,
    evolvesInto,
    types: await Promise.all(types.map(({ type }) => getTypes(type.url))),
    stats: stats.map(x => ({
      name: capitalize(x.stat.name),
      base_stat: x.base_stat
    }))
  }

  return mapped
}

export default getPokemonDetails