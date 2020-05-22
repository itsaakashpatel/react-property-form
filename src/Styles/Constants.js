import { css } from "styled-components";

// COLOR PALLET
export const COLORS = {
  // BLUE
  PRIMARY       : '#0074d9',
  // ORANGE
  SECONDARY       : '#ff4136',
};

// BREAKPOINTS
export const BREAKPOINTS_VALUE = {
  DISPLAY : 1750,
  DESKTOP : 1450, // x_large
  LAPTOP  : 1278, // large
  TABLET  : 960, // medium
  PHABLET : 600, // small
  MOBILE  : 450 // x_small
}
export const BREAKPOINTS = {
  A_DESKTOP : `${BREAKPOINTS_VALUE.DESKTOP}px`,
  A_LAPTOP  : `${BREAKPOINTS_VALUE.LAPTOP}px`,
  A_TABLET  : `${BREAKPOINTS_VALUE.TABLET}px`,
  A_PHABLET : `${BREAKPOINTS_VALUE.PHABLET}px`,
  A_MOBILE  : `${BREAKPOINTS_VALUE.MOBILE}px`,

  DISPLAY : `${BREAKPOINTS_VALUE.DISPLAY - 1}px`,
  DESKTOP : `${BREAKPOINTS_VALUE.DESKTOP - 1}px`, // x_large
  LAPTOP  : `${BREAKPOINTS_VALUE.LAPTOP - 1}px`, // large
  TABLET  : `${BREAKPOINTS_VALUE.TABLET - 1}px`, // medium
  PHABLET : `${BREAKPOINTS_VALUE.PHABLET - 1}px`, // small
  MOBILE  : `${BREAKPOINTS_VALUE.MOBILE - 1}px` // x_small
};

export const responsive = Object.keys(BREAKPOINTS).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${BREAKPOINTS[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
