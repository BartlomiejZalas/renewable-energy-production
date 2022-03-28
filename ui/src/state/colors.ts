const BLUES = ['#0c6bc7', '#2579cb', '#538bc2', '#6896c2'];
const YELLOWS = ['#ffae00', '#ffc400', '#ffd500', '#FFD700'];
const GREENS = ['#147c14', '#16ad16', '#32CD32', '#32CD32'];

export const generateWindColor = (index: number) => BLUES[index % BLUES.length]
export const generateSolarColor = (index: number) => YELLOWS[index % YELLOWS.length]
export const generateBiogasColor = (index: number) => GREENS[index % GREENS.length];

