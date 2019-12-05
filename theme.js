import { default as theme } from 'mdx-deck/themes'
import highlighter from 'react-syntax-highlighter/styles/prism/atom-dark';

export default {
  ...theme,
  // add a custom font
  font: 'Roboto,Helvetica Neue,Helvetica,Arial,sans-serif',
  css: {
    fontSize: '30px',
    fontWeight: 200
  },
  prism: {
    style: highlighter
  },
  // custom colors
  colors: {
    ...theme.colors,
    heading: '#3CF',
    link: '#D513A5'
  },
  h1: {
    color: '#3CF',
    fontSize: '2.5em'
  },
  h2: {
    color: '#3CF'
  },
  a: {
    textDecoration: 'none'
  }
}
