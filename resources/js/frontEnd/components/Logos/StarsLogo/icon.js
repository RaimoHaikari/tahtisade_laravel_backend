import styled from 'styled-components';

/*
 * Katso:
 *
 * - How to use SVG in React? The styled components way.
 *   https://www.pinkdroids.com/blog/svg-react-styled-components/
 * 
 * We are using the Icon component as the base, so we don’t have to write those pesky SVG attrs with each new flick of the wand.
 */
export default styled.svg.attrs({ 
  version: '1.1', 
  xmlns: 'http://www.w3.org/2000/svg', 
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
})``;