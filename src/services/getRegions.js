import { Api, capitalize } from 'lib'

const PAGE_SIZE = 20

async function getRegions(offset, loadingButton = 'navigator') {
  const data = {
    limit: PAGE_SIZE,
    offset: offset ?? 0
  }
  
  const res = await Api.get('/location/', data, loadingButton)
  if(!res) return null
  
  const mapped = res.results.map(x => ({
    name: capitalize(x.name),
    id: parseInt(x.url.match(/location\/\d+\//)[0].match(/[0-9]+/))
  }))

  return { data: mapped, endReached: !res.next }
}

export default getRegions