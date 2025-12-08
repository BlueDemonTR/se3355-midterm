import { Api, capitalize } from 'lib'

async function getRegions(offset, loadingButton = 'navigator') {
  const data = {
    limit: global.PAGE_SIZE,
    offset: offset ?? 0
  }
  
  const res = await Api.get('/region/', data, loadingButton)
  if(!res) return null
  
  const mapped = res.results.map(x => ({
    name: capitalize(x.name),
    id: parseInt(x.url.match(/region\/\d+\//)[0].match(/[0-9]+/))
  }))

  const detailed = await Promise.all(mapped.map(async x => ({
    ...(await getDetails(x.id, loadingButton)),
    ...x
  })))

  return { data: detailed, endReached: !res.next }
}

async function getDetails(id, loadingButton) {
  const data = await Api.get(`/region/${id}`, {}, loadingButton)
  if(!data) return {}
  
  return { title: data.main_generation?.name.replace('generation-', '').toUpperCase() }
}

export default getRegions