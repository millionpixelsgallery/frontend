export function prepareLink(link: string) {
  if (/https?|\/\//.test(link)) return link
  return '//' + link
}
