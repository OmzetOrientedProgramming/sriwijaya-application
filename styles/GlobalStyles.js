import { Global, css } from '@emotion/react'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'

const customStyles = css({
  body: {
    WebkitTapHighlightColor: theme`colors.blue.500`,
    ...tw`antialiased`,
    // fontFamily: '"Open Sans"',
  },
})

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
)

export default GlobalStyles