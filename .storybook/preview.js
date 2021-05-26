import GlobalProviders from '../src/GlobalProviders'

export const decorators = [
  (Story) => (
    <GlobalProviders>
      <Story />
      <div id={'modal-root'} />
    </GlobalProviders>
  ),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
