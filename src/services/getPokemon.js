import { Api, capitalize } from 'lib'

async function getPokemon(offset, loadingButton) {
  const data = {
    limit: global.PAGE_SIZE,
    offset: offset ?? 0
  }
  
  const res = await Api.get('/pokemon/', data, loadingButton)
  if(!res) return null
  
  const mapped = res.results.map(x => ({
    name: capitalize(x.name),
    id: parseInt(x.url.match(/pokemon\/\d+\//)[0].match(/[0-9]+/))
  }))

  const detailed = await Promise.all(mapped.map(async x => ({
    ...(await getDetails(x.id, loadingButton)),
    ...x
  })))

  return { data: detailed, endReached: !res.next }
}

async function getDetails(id, loadingButton) {
  const res = { sprite: '', generation: 0 }
  
  const data = await Api.get(`/pokemon/${id}`, {}, loadingButton)
  if(!data) return res

  res.sprite = data.sprites?.front_default

  const species = await Api.get(data.species.url)
  if(!data) return res

  res.generation = parseInt(species.generation.url.match(/generation\/\d+\//)[0].match(/[0-9]+/))

  return res
}

export default getPokemon