import { Api, capitalize } from 'lib'

const PAGE_SIZE = 20

async function getPokemon(offset, loadingButton = 'navigator') {
  const data = {
    limit: PAGE_SIZE,
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
  const data = await Api.get(`/pokemon/${id}`, {}, loadingButton)
  if(!data) return {}

  return { sprite: data.sprites?.front_default }
}

export default getPokemon