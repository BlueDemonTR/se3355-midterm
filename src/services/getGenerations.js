import { Api, capitalize } from 'lib'

async function getGenerations() {
  
  const res = await Api.get('/generation/', {})
  if(!res) return null
  
  const mapped = res.results.map(x => ({
    name: `Gen ${x?.name.replace('generation-', '').toUpperCase()}`,
    id: parseInt(x.url.match(/generation\/\d+\//)[0].match(/[0-9]+/))
  }))

  return { data: mapped, endReached: !res.next }
}

export default getGenerations